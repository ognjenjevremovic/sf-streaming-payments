import type { FC, ReactNode } from 'react';

import { WalletContextProvider } from './WalletContextProvider';
import { LoadingProvider } from './LoadingContextProvider';
import { StreamContextProvider } from './StreamContextProvider';
import { AutoConnectProvider } from './AutoConnectWalletContextProvider';


export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <LoadingProvider>
                <AutoConnectProvider>
                    <WalletContextProvider>
                        <StreamContextProvider>
                            {children}
                        </StreamContextProvider>
                    </WalletContextProvider>
                </AutoConnectProvider>
        </LoadingProvider>
    );
};