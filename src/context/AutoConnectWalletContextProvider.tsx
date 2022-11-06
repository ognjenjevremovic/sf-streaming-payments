import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';

import { useLocalStorage } from '@solana/wallet-adapter-react';


export interface AutoConnectContextState {
    autoConnect: boolean;
    setAutoConnect(autoConnect: boolean): void;
}

export const AutoConnectContext = createContext<AutoConnectContextState>({
    autoConnect: false,
    setAutoConnect: () => {}
});

export function useAutoConnect(): AutoConnectContextState {
    return useContext(AutoConnectContext);
}

export const AutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', true);

    return (
        <>
            <AutoConnectContext.Provider
                value={{ autoConnect, setAutoConnect }}>
                {children}
            </AutoConnectContext.Provider>
        </>
    );
};