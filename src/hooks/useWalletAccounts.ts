import { useState, useEffect } from 'react';

import {
  TOKEN_PROGRAM_ID,
  NATIVE_MINT,
  AccountLayout,
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';
import type { Connection } from '@solana/web3.js';
import type { Wallet } from '@solana/wallet-adapter-react';

import { toast } from 'react-toastify';

import { useLoading } from '../context/LoadingContextProvider';
import { useStreamFlow } from '../context/StreamContextProvider';

export interface WalletAccountInfo {
  readonly amount: string;
  readonly address: string;
  readonly uiAmount: number;
  readonly decimals: number;
  readonly tokenName: string;
  readonly tokenSymbol: string;
}

export function useWalletAccounts(connection: Connection, wallet: Wallet) {
  const { setIsLoading } = useLoading();
  const { userStreams } = useStreamFlow();
  const [accounts, setAccounts] = useState<
    Array<{
      accountPublicKey: PublicKey;
      tokenMint: PublicKey;
      amount: bigint;
    }>
  >();
  const [walletAccounts, setWalletAccounts] = useState<WalletAccountInfo[]>();

  useEffect(() => {
    connection
      .getTokenAccountsByOwner(wallet.adapter.publicKey!, {
        programId: TOKEN_PROGRAM_ID,
      })
      .then((account) => {
        const accountsInfo = account.value.map((accVal) => {
          const accountInfo = AccountLayout.decode(accVal.account.data);

          return {
            accountPublicKey: accVal.pubkey,
            tokenMint: accountInfo.mint,
            amount: accountInfo.amount,
          };
        });
        setAccounts(accountsInfo);
      });
  }, [connection, userStreams]);

  useEffect(() => {
    if (!accounts?.length) {
      return;
    }

    async function getAccountsData() {
      try {
        const parsedWalletAccounts = await Promise.all(
          accounts!.map(async (account) => {
            const {
              value: { amount, decimals, uiAmount },
            } = await connection.getTokenAccountBalance(
              account.accountPublicKey
            );

            if (account.tokenMint.toBase58() === NATIVE_MINT.toBase58()) {
              return {
                amount: amount,
                uiAmount: uiAmount || +amount * decimals,
                decimals,
                tokenSymbol: 'wSOL',
                tokenName: 'Wrapped SOL',
                address: NATIVE_MINT.toBase58(),
              } as WalletAccountInfo;
            }

            const metaplex = new Metaplex(connection);
            const { symbol: tokenSymbol, name: tokenName } = await metaplex
              .nfts()
              .findByMint({ mintAddress: account.tokenMint });

            return {
              amount,
              uiAmount: uiAmount || +amount * decimals,
              decimals,
              tokenSymbol,
              tokenName,
              address: account.tokenMint.toBase58(),
            };
          })
        );

        setWalletAccounts(filterWalltsWithTokensOnly(parsedWalletAccounts));
      } catch (err) {
        toast('Error getting wallet accounts', {
          type: 'error',
        });
        setIsLoading(false);
      }
    }

    getAccountsData();
  }, [accounts]);

  return walletAccounts;
}

function filterWalltsWithTokensOnly(walletAccounts: WalletAccountInfo[]) {
  return walletAccounts.filter(({ amount }) => !!+amount);
}
