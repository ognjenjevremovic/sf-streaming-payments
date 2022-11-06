/// <reference types="vite/client" />
interface ImportMetaEnv {
  //  'devnet' || 'testnet' (default: 'devnet')
  readonly VITE_SOLANA_NETWORK: string;
}
