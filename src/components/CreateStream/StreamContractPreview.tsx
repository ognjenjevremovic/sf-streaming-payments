import type { FC } from "react";

import { StreamConfigFormControls } from "./StreamContractControls";


interface StreamContractPreviewViewProps {
  readonly formControls: StreamConfigFormControls;
  readonly token: string;
  readonly renderEmptyState: boolean;
}

const StreamContractPreviewView: FC<StreamContractPreviewViewProps> = ({
  formControls,
  token,
  renderEmptyState
}) => {
  if (renderEmptyState) {
    return (
      <section className="flex flex-col w-full col-span-full py-1 leading-6">
        <hr className="my-2 border-white" />
        <div className="flex flex-col space-y-1 text-md">
          <h4 className="text-gray-light leading-6">
            Once stream parameters are defined, they will be displayed here
          </h4>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col w-full col-span-full py-1 leading-6">
      <hr className="my-2 border-white" />
      <div className="flex flex-col space-y-1 text-md">
        <p className="text-gray-light leading-6">
          Stream starts on: <span className="text-gray-light font-bold">{formControls.releaseDate}</span> at <span className="text-gray-light font-bold">{formControls.releaseTime}</span>.
        </p>
        <p className="text-gray-light leading-6">
          <span className="text-gray-light font-bold">{formControls.releaseAmount} {token}</span> released every <span className="text-gray-light font-bold">{formControls.releaseFrequency} {formControls.releaseInterval}(s)</span>.
        </p>
      </div>
    </section>
  )
}


export default StreamContractPreviewView;