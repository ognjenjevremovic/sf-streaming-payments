import type { CSSProperties, FC } from "react";

import { useAutoConnect } from "../../context/AutoConnectWalletContextProvider";
import ToggleView from "./Toggle";


const HeaderView: FC<{ handleDisconnect: () => void }> = ({ handleDisconnect }) => {
  const { autoConnect, setAutoConnect } = useAutoConnect();

  return (
    <header className="flex flex-row p-4 bg-gray-dark text-lg text-gray-light rounded-lg justify-between">
      <h3 className='inline-flex space-x-8'>
        <span>
          Auto connect next time 
        </span>
        <ToggleView
          className="inline-flex"
          disabled={false}
          onChange={() => setAutoConnect(!autoConnect)}
          checked={autoConnect}
          style={
              { "--width": '60px' } as CSSProperties
          } />
      </h3>
      <button
        className="text-sm text-red bg-opacity-30 bg-red px-4 py-2 rounded-2xl font-semibold tracking-wider"
        onClick={handleDisconnect}>
        Disconnect
      </button>
    </header>
  )
}


export default HeaderView;