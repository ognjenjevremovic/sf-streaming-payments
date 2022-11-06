import type { FC } from "react";

import { Wallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";


const ConnectWalletView: FC<{ wallet: Wallet }> = ({ wallet }) => {
  const headerText = !wallet?.adapter.readyState
    ? 'Please select your wallet, using the provided button bellow:'
    : 'Please connect to the application (using your selected wallet), using the provided button bellow:';
    
  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
      <section className="lg:inline-flex flex flex-col w-full">
        <div className="flex flex-col space-y-8 bg-gray-dark p-8 rounded-lg overflow-y-auto min-h-[200px]">
          <h2 className="text-lg text-gray-light tracking-wide font-semibold">
            {headerText}
          </h2>
          <WalletMultiButton className='bg-blue' />
        </div>
      </section>
    </div>
  )
}


export default ConnectWalletView;