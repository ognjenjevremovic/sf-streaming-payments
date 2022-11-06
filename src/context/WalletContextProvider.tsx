import { useCallback, useMemo } from 'react';
import type { FC, ReactNode } from 'react';

import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import type { WalletError } from '@solana/wallet-adapter-base';

import { toast } from 'react-toastify';

import { useAutoConnect } from './AutoConnectWalletContextProvider';


export const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const network = (
        [
            WalletAdapterNetwork.Devnet,
            WalletAdapterNetwork.Testnet
        ].includes(import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork)
            ? import.meta.env.VITE_SOLANA_NETWORK as WalletAdapterNetwork
            : WalletAdapterNetwork.Devnet
    );
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
        ],
        [network]
    );
    const { autoConnect } = useAutoConnect();

    const onError = useCallback(
        (error: WalletError) => toast(
            error.message ? `${error.name}: ${error.message}` : error.name,
            { type: 'error' }
        ),
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={autoConnect} onError={onError}>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};