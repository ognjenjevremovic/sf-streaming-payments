import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { FC, ReactNode } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from '@solana/web3.js'
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { StreamClient, StreamType, StreamDirection } from '@streamflow/stream'
import type { Stream, CreateParams as StreamCreateParams } from '@streamflow/stream'

import { toast } from 'react-toastify'

import { useLoading } from "./LoadingContextProvider";
import { trimAddress } from "../utils/trimAddress";
import { STREAM_DIRECTION, STREAM_STATUS } from "../constants/streamType";


export interface StreamContextState {
    userStreams: StreamflowStream[];
    createNewStream(params: StreamCreateParams): Promise<void>;
}

export interface StreamflowStream {
  readonly status: STREAM_STATUS;
  readonly direction: STREAM_DIRECTION;
  readonly type: string;
  readonly streamId: string;
  readonly fromAddress: string;
  readonly toAddress: string;
  readonly startDate: string;
  readonly endDate: string;
}

export const StreamContext = createContext<StreamContextState>({
    userStreams: [],
    createNewStream: () => Promise.resolve()
});

export function useStreamFlow(): StreamContextState {
    return useContext(StreamContext);
}

export const StreamContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = (
    [
      WalletAdapterNetwork.Devnet,
      WalletAdapterNetwork.Testnet
    ].includes(import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork)
      ? import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork
      : WalletAdapterNetwork.Devnet
  );
  const { wallet } = useWallet()
  const { setIsLoading } = useLoading()
  const [userStreams, setUserStreams] = useState<StreamflowStream[]>([])
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const StreamFlowClient = useMemo(
    () => new StreamClient(
      endpoint,
      network,
      "confirmed"
    ), [network]
  );

  async function getUserStreams() {
    setIsLoading(true);

    try {
      const streams = await StreamFlowClient.get({
        wallet: (wallet as Wallet)?.adapter?.publicKey!,
        type: StreamType.All,
        direction: StreamDirection.All
      })

      setUserStreams(
        () => streams
          .sort(([, { start: startA }], [, { start: startB }]) => startB > startA ? 1 : -1)
          .map(
            streamData => mapStreamToUIModel(wallet!, streamData)
          )
      )
      setIsLoading(false)
    } catch (error) {
      toast('Error getting user streams', {
        type: 'error'
      })
      setIsLoading(false)
    }
  }
  
  async function createNewStream(createParams: StreamCreateParams) {
    try {
      setIsLoading(true)
      await StreamFlowClient.create(createParams)
      getUserStreams()
      setIsLoading(false)
    } catch (error) {
      toast('Error creating transcation', {
        type: 'error'
      })
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (wallet?.adapter.connected && wallet.adapter.publicKey) {
      getUserStreams()
    }
  }, [wallet?.adapter.connected])
  

  return (
      <StreamContext.Provider value={{ createNewStream, userStreams }}>
        {children}
      </StreamContext.Provider>
  );
};

function mapStreamToUIModel(
  wallet: Wallet,
  [streamId, stream]: [string, Stream]
): StreamflowStream {
  const currentTimestamp = Date.now() / 1000;
  const direction: STREAM_DIRECTION =(
    stream.sender === wallet.adapter.publicKey?.toBase58()
      ? STREAM_DIRECTION.OUTGOING
      : STREAM_DIRECTION.INCOMING
  );
  let status: STREAM_STATUS = STREAM_STATUS.STREAMING;

  if (!!stream.canceledAt) {
    status = STREAM_STATUS.CANCELED
  }
  if (currentTimestamp > stream.end) {
    status = STREAM_STATUS.COMPLETED
  }
  if (currentTimestamp < stream.start) {
    status = STREAM_STATUS.SCHEDULED
  }

  return ({
    status,
    direction,
    streamId: trimAddress(streamId),
    type: wallet?.adapter.publicKey?.toBase58() === stream.sender ? 'Outoging' : 'Incoming',
    fromAddress: trimAddress(stream.sender),
    toAddress: trimAddress(stream.recipient),
    startDate: new Date(stream.start * 1000).toDateString().split(' ').slice(1).join(' '),
    endDate: new Date(stream.end * 1000).toDateString().split(' ').slice(1).join(' '),
  })
}