import type { FC } from "react";

import { useStreamFlow } from "../context/StreamContextProvider";
import UserStreamsListView from "./UserStreams/UserStreamsList";
import UserStreamsSummaryView from "./UserStreams/UserStreamsSummary";


const UserStreamsView: FC = () => {
  const { userStreams } = useStreamFlow()

  return (
    <section className="lg:inline-flex flex flex-col w-full space-y-4">
      <div className="flex flex-col bg-gray-dark p-8 rounded-lg overflow-y-auto min-h-[300px] flex-grow space-y-12">
        <h2 className="text-lg text-gray-light tracking-wide font-semibold">All Streams</h2>

        <UserStreamsListView streams={userStreams} />
      </div>

      <div className="grid grid-rows-2 grid-cols-3 gap-4">
        <UserStreamsSummaryView streams={userStreams} />
      </div>
    </section>
  )
}


export default UserStreamsView;