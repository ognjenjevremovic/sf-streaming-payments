import type { FC } from "react";

import type { StreamflowStream } from "../../context/StreamContextProvider";


const UserStreamsListItemView: FC<{ stream: StreamflowStream }> = ({ stream }) => {
  return (
    <li className="bg-main-dark px-4 py-2 rounded-lg flex flex-col space-y-4">
      <section className="flex flex-row w-full justify-between space-x-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm"># Status</span>
          <span className="px-2 py-[2px] rounded-lg font-medium flex text-sm bg-green text-green bg-opacity-10 capitalize">
            {stream.status}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm"># Type</span>
          <span className="font-medium capitalize">
            {stream.type}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm"># Stream ID</span>
          <span className="font-medium capitalize">
            {stream.streamId}
          </span>
        </div>
      </section>

      <section className="flex flex-row justify-start w-full space-x-4">
        <div className="flex flex-row space-x-2 items-center flex-1">
          <span className="text-sm">From Addr:</span>
          <span className="text-sm font-medium">
            { stream.fromAddress }
          </span>
        </div>
        <div className="flex flex-row space-x-2 items-center flex-1">
          <span className="text-sm">To Addr:</span>
          <span className="text-sm font-medium">
            {stream.toAddress}
          </span>
        </div>
      </section>
      <section className="flex flex-row w-full justify-start space-x-4">
        <div className="flex flex-row space-x-2 items-center flex-1">
          <span className="text-sm">Start date:</span>
          <span className="font-medium">
            {stream.startDate}
          </span>
        </div>
        <div className="flex flex-row space-x-2 items-center flex-1">
          <span className="text-sm">End date: </span>
          <span className="font-medium">
            {stream.endDate}
          </span>
        </div>
      </section>
    </li> 
  )
}

const UserStreamsListView: FC<{ streams: StreamflowStream[] }> = ({ streams }) => {

  if (!streams.length) {
    return (
      <div className="flex flex-col self-center justify-self-center place-self-center items-center">
        <div className="text-white font-bold tracking-wide text-lg">No Upcoming Unlocks</div>
        <div className="text-gray-light text-md mt-2">Upcoming Unlocks streams will appear here.</div>
      </div>
    )
  }

  return (
    <ul className="flex flex-col overflow-auto max-h-[600px] text-white space-y-4 scrollbar-thin">
      {streams.map((stream) => (
        <UserStreamsListItemView key={stream.streamId.slice(0,6)} stream={stream} />
      )) }
    </ul>
  )
}


export default UserStreamsListView;