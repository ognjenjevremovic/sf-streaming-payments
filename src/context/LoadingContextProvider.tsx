import { createContext, FC, ReactNode, useContext, useState } from 'react';


export interface LoadingContextState {
    isLoading: boolean;
    setIsLoading(loading: boolean): void;
}

export const LoadingContext = createContext<LoadingContextState>({
    isLoading: false,
    setIsLoading: () => {}
});

export function useLoading(): LoadingContextState {
    return useContext(LoadingContext);
}

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <LoadingContext.Provider
                value={{ isLoading, setIsLoading }}>
                {children}
            </LoadingContext.Provider>
        </>
    );
};