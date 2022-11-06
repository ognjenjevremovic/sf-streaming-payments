import { useConnection, useWallet, Wallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, VersionedTransactionResponse, PublicKey, GetProgramAccountsFilter, ParsedAccountData, RpcResponseAndContext, AccountInfo } from '@solana/web3.js';
import React, { FC, useEffect, useState, CSSProperties, ReactNode } from 'react';
import { StreamClient, getBN, BN, Cluster } from "@streamflow/stream";
import { ToastContainer, toast } from 'react-toastify';

import { ContextProvider } from './context/AppContextProvider'
import ConnectWalletView from './components/ConnectWallet';
import LoaderView from './components/UI/Loader';
import { useLoading } from './context/LoadingContextProvider';
import DashboardView from './components/Dashboard';
import { useAutoConnect } from './context/AutoConnectWalletContextProvider';

import '@solana/wallet-adapter-react-ui/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const App: FC = () => {
    return (
        <ContextProvider>
          <Content />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            pauseOnHover
            theme="light" />
        </ContextProvider>
    );
};
export default App;


const Content: FC = () => {
  const { connection } = useConnection()
  const { wallet } = useWallet()
  const [connected, setConnected] = useState(wallet?.adapter.connected)
  const { isLoading, setIsLoading } = useLoading()
  const { autoConnect } = useAutoConnect()

  useEffect(() => {
    if (wallet?.adapter.readyState === 'Installed') {
      toast('Successfully connected to a wallet')

      if (autoConnect) {
        toast('Logging in. . .')
      }
    }
  }, [wallet?.adapter.readyState])

  useEffect(() => {
    setIsLoading(!!wallet?.adapter.connecting)
  }, [wallet?.adapter.connecting])
  
  useEffect(() => {
    if (!wallet?.adapter.connected && connected) {
      toast('Successfully disconnected from a wallet')
      setConnected(false)
      return
    }

    if (!connected && wallet?.adapter.connected) {
      toast('Welcome back!')
      setConnected(true)
      return;
    }
  }, [wallet?.adapter.connected])

  function handleDisconnect() {
    wallet?.adapter.disconnect()
  }

  return (
    <div className="min-h-[500px] flex flex-col px-4 py-6 space-y-4">
      {isLoading && <LoaderView show={isLoading} />}
      {
        !wallet?.adapter.connected || !wallet?.adapter.publicKey
        ? <ConnectWalletView wallet={wallet!} />
        : <DashboardView wallet={wallet} connection={connection} handleDisconnect={handleDisconnect} />
      }
    </div>
  )
};

