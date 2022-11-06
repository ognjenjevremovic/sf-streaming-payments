import { Wallet } from "@solana/wallet-adapter-react";

import type { FC } from "react";
import type { Connection } from '@solana/web3.js';

import HeaderView from "./UI/Header";
import CreateStreamView from "./CreateStream";
import UserStreamsView from "./UserStreams";


interface DashboardViewProps {
  readonly wallet: Wallet;
  readonly connection: Connection;
  readonly handleDisconnect: () => void;
}

const DashboardView: FC<DashboardViewProps> = ({ wallet, connection, handleDisconnect }) => {
  return (
    <>
      <HeaderView handleDisconnect={handleDisconnect} />

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-x-4 lg:space-y-0">
        <CreateStreamView
          connection={connection}
          wallet={wallet} />

        <UserStreamsView />
      </div>
    </>
  )
}


export default DashboardView;