import type { FC } from "react";

import FormInputFieldView, {
  defaultLabelClass as inputFieldLabelClass,
  inputDisabledClass as inputFieldDisabledClass,
} from "../Form/InputField";
import type { ControlValueChangeCB } from "../../types/formControl";


export interface RecipientConfigFormControls {
  readonly token: string;
  readonly recipientAmount: string;
  readonly recipientTitle: string;
  readonly recipientWalletAddress: string;
  readonly recipientEmail: string;
}

interface StreamRecpientControlsViewProps {
  readonly formControls: RecipientConfigFormControls;
  readonly handleControlValueChange: ControlValueChangeCB;
  readonly token: string;
}

const StreamRecpientControlsView: FC<StreamRecpientControlsViewProps> = ({
  formControls,
  handleControlValueChange,
  token
}) => {
  return (
    <section className="border-t border-b border-gray-dark py-1 col-span-full">
      <h4 className="text-white font-bold text-sm tracking-widest mb-5 uppercase">Recipient</h4>

      <div className="flex flex-col p-6 rounded-2xl col-span-full relative bg-main-dark space-y-4">
        <fieldset className="flex flex-row items-center justify-around space-x-4">
          {/* <!-- Amount --> */}
          <FormInputFieldView
            type="text"
            placeholder="0.00"
            labelClass={`${inputFieldLabelClass} flex-1`}
            labelText="Amount"
            name="recipientAmount"
            value={formControls.recipientAmount}
            onChange={handleControlValueChange} />

          {/* <!-- Token preview --> */}
          <FormInputFieldView
            type="text"
            labelClass={`${inputFieldLabelClass} flex-1`}
            inputClass={inputFieldDisabledClass}
            labelText="Token"
            placeholder="Token name"
            name="token"
            value={token}
            onChange={() => {}} />
        </fieldset>

        {/* <!-- Title --> */}
        <FormInputFieldView
          type="text"
          labelText="Title"
          placeholder="e.g. VC Seed Round"
          name="recipientTitle"
          value={formControls.recipientTitle}
          onChange={handleControlValueChange} />

        {/* <!-- Wallet Address --> */}
        <FormInputFieldView
          type="text"
          labelText="Wallet address"
          placeholder="Please double check the recipient address"
          name="recipientWalletAddress"
          value={formControls.recipientWalletAddress}
          onChange={handleControlValueChange} />


        {/* <!-- Email --> */}
        <FormInputFieldView
          type="email"
          labelText="Email"
          placeholder="Optional email to notify the recipient"
          name="recipientEmail"
          value={formControls.recipientEmail}
          onChange={handleControlValueChange} />
      </div>
    </section>
  )
}


export default StreamRecpientControlsView;