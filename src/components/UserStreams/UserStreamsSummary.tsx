import { FC } from "react";

import { STREAM_DIRECTION, STREAM_STATUS } from "../../constants/streamType";
import type { StreamflowStream } from "../../context/StreamContextProvider";


const UserStreamsSummaryView: FC<{ streams: StreamflowStream[] }> = ({ streams }) => {
  return (
    <>
      {/* <!-- Incoming --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold">Incoming</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByDirectionCount(streams, STREAM_DIRECTION.INCOMING)}
        </div>
      </div>

      {/* <!-- Completed --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold text-green">Completed</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByStatusCount(streams, STREAM_STATUS.COMPLETED)}
        </div>
      </div>

      {/* <!-- Scheduled --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold">Scheduled</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByStatusCount(streams, STREAM_STATUS.SCHEDULED)}
        </div>
      </div>

      {/* <!-- Outgoing --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold">Outgoing</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByDirectionCount(streams, STREAM_DIRECTION.OUTGOING)}
        </div>
      </div>

      {/* <!-- Streaming --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold text-blue">Streaming</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByStatusCount(streams, STREAM_STATUS.STREAMING)}
        </div>
      </div>

      {/* <!-- Canceled --> */}
      <div className="bg-gray-dark p-8 rounded-lg">
        <div className="text-xs text-gray-light">
          <span className="uppercase font-semibold text-red">Canceled</span> Streams
        </div>
        <div className="mt-1 text-[1.5rem] font-bold text-white">
          {getStreamsByStatusCount(streams, STREAM_STATUS.CANCELED)}
        </div>
      </div>
    </>
  )
}

function getStreamsByStatusCount(streams: StreamflowStream[], status: STREAM_STATUS) {
  return streams.filter(({ status: streamStatus }) => streamStatus === status).length;
}

function getStreamsByDirectionCount(streams: StreamflowStream[], direction: STREAM_DIRECTION) {
  return streams.filter(({ direction: streamDirection }) => streamDirection === direction).length;
}


export default UserStreamsSummaryView;