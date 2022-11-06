import { useEffect, useState } from "react";
import type { ChangeEvent, FC, MouseEvent } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { getBN } from '@streamflow/stream'
import type { Connection } from '@solana/web3.js';
import type { Wallet, WalletContextState } from "@solana/wallet-adapter-react";
import type { CreateParams as StreamCreateParams } from '@streamflow/stream'

import StreamContractControlsView from "./CreateStream/StreamContractControls";
import StreamRecpientControlsView from "./CreateStream/StreamRecipientControls";
import StreamContractPreviewView from "./CreateStream/StreamContractPreview";
import { periodMultipliers } from "../constants/timePeriodMultipliers";
import { useWalletAccounts } from "../hooks/useWalletAccounts";
import { useStreamFlow } from "../context/StreamContextProvider";
import type{ RecipientConfigFormControls } from "./CreateStream/StreamRecipientControls";
import type{ StreamConfigFormControls } from "./CreateStream/StreamContractControls";
import type { WalletAccountInfo } from "../hooks/useWalletAccounts";


interface CreateNewStreamFormControls {
  readonly streamConfig: StreamConfigFormControls;
  readonly recipientConfig: RecipientConfigFormControls;
}

const CreateStreamView: FC<{
  connection: Connection,
  wallet: Wallet,
}> = ({ connection, wallet }) => {
  const formControlDefaultState = getStreamFormDefaultState()
  const walletAccounts = useWalletAccounts(connection, wallet)
  const walletContext = useWallet()
  const { createNewStream } = useStreamFlow()
  const [streamFormValues, setStreamFormValues] = useState<CreateNewStreamFormControls>(formControlDefaultState)
  const [streamConfigValid, setStreamConfigValid] = useState<boolean>(false)
  const [recipientConfigValid, setRecipientConfigValid] = useState<boolean>(false)

  function handleFormControlValueChange(
    config: keyof CreateNewStreamFormControls,
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setStreamFormValues({
      ...streamFormValues,
      [config]: {
        ...streamFormValues[config],
        [event.target.name]: event.target.value
      }
    })
  }

  function createStreamingContract(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()

    if (streamConfigValid && recipientConfigValid) {
      createNewStream(
        mapStreamFormControlsToStreamParams(
          streamFormValues,
          walletContext!,
          walletAccounts!
        )
      )
    }
  }

  useEffect(() => {
    const streamConfigForControlsValid = Object.keys(streamFormValues.streamConfig)
      .every(
        (formControlName) => !!streamFormValues.streamConfig[formControlName as keyof StreamConfigFormControls]
    );
    setStreamConfigValid(streamConfigForControlsValid);
  }, [streamFormValues.streamConfig])

  useEffect(() => {
    const recipientConfigForControlsValid = Object.keys(streamFormValues.recipientConfig)
      .filter(control => !['recipientTitle', 'recipientEmail', 'token'].includes(control))
      .every(
        (formControlName) => !!streamFormValues.recipientConfig[formControlName as keyof RecipientConfigFormControls]
    );
    setRecipientConfigValid(recipientConfigForControlsValid);
  }, [streamFormValues.recipientConfig])

  return (
    <section className="lg:inline-flex flex flex-col w-full h-full">
      <div className="flex flex-col space-y-8 bg-gray-dark p-8 rounded-lg overflow-y-auto min-h-[300px]">
        <h2 className="text-lg text-gray-light tracking-wide font-semibold">Create new Stream</h2>

        {/* <!-- Create stream form --> */}
        <div className="flex flex-col items-center py-4">
          <form noValidate className="block w-full px-8 space-y-12">
            <section className="flex flex-col space-y-8">
              {/* <!-- Stream Contract form controls --> */}
              <StreamContractControlsView
                walletAccounts={walletAccounts!}
                formControls={streamFormValues.streamConfig}
                handleControlValueChange={handleFormControlValueChange.bind(this, 'streamConfig')} />

              {/* <!-- Stream Contract Recipient form controls --> */}
              <StreamRecpientControlsView
                token={getTokenAccountName(walletAccounts!, streamFormValues.streamConfig.token)}
                formControls={streamFormValues.recipientConfig}
                handleControlValueChange={handleFormControlValueChange.bind(this, 'recipientConfig')} />
            </section>
            
            {/* <!-- Overview of the stream form --> */}
            <StreamContractPreviewView
              token={getTokenAccountName(walletAccounts!, streamFormValues.streamConfig.token)}
              formControls={streamFormValues.streamConfig}
              renderEmptyState={!streamConfigValid} />
            
            {/* <!-- Submit form button --> */}
            <button type="submit"
              className="flex border-transparent rounded-md shadow-sm text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue disabled:opacity-50 bg-blue py-2 px-4 font-bold my-5 text-sm"
              disabled={!streamConfigValid || !recipientConfigValid}
              onClick={createStreamingContract}>Create Streaming Contract</button>
          </form>
        </div>
      </div>
    </section>
  )
}

function getStreamFormDefaultState(): CreateNewStreamFormControls {
  return {
    streamConfig: {
      ...['token', 'releaseAmount', 'releaseFrequency', 'releaseInterval', 'releaseDate', 'releaseTime']
        .reduce((state, key) => ({ ...state, [key]: '' }), {} as StreamConfigFormControls)
    },
    recipientConfig: {
      ...['token', 'recipientAmount', 'recipientTitle', 'recipientWalletAddress', 'recipientEmail']
      .reduce((state, key) => ({ ...state, [key]: '' }), {} as RecipientConfigFormControls)
    }
  }
}

function getTokenAccountName(walletAccounts: WalletAccountInfo[], token: string) {
  return walletAccounts?.filter(
    ({ address }) => address === token
  )
  .reduce(
    (_, { tokenName, tokenSymbol }) =>
      `${tokenName} (${tokenSymbol})`
    , ''
  )
}

function mapStreamFormControlsToStreamParams(
  streamFormValues: CreateNewStreamFormControls,
  wallet: WalletContextState,
  walletAccounts: WalletAccountInfo[]
): StreamCreateParams {
  const { streamConfig, recipientConfig } = streamFormValues
  const walletAccountUsed = walletAccounts.find(({ address }) => address === streamConfig.token)

  const period = periodMultipliers[streamConfig.releaseInterval] * +streamConfig.releaseFrequency
  const start = Math.round(new Date(`${streamConfig.releaseDate} ${streamConfig.releaseTime}`).getTime() / 1000)
  const cliff = start + period
  const cliffAmount = getBN(
    +recipientConfig.recipientAmount / 2,
    +walletAccountUsed?.decimals!
  )
  const depositedAmount = getBN(+recipientConfig.recipientAmount, +walletAccountUsed?.decimals!)
  const amountPerPeriod = getBN(+streamConfig.releaseAmount, +walletAccountUsed?.decimals!)

  const dataPassed: StreamCreateParams = {
    //  @ts-ignore
    sender: wallet,   //  Different wallet model types
    recipient: recipientConfig.recipientWalletAddress,
    mint: streamConfig.token,
    start,
    depositedAmount,
    period,
    cliff,
    cliffAmount: cliffAmount,
    amountPerPeriod,
    name: recipientConfig.recipientTitle || '',
    canTopup: false,
    cancelableBySender: true,
    cancelableByRecipient: false,
    transferableBySender: true,
    transferableByRecipient: false,
  }

  return dataPassed;
}

export default CreateStreamView;