import type { FC } from "react";

import FormInputFieldView, {
  defaultLabelClass as inputFieldLabelClass,
  inputDisabledClass as inputFieldDisabledClass,
} from "../Form/InputField";
import FormSelectControlView, {
  defaultLabelClass as selectControlLabelClass,
  defaultInputClass as selectControlInputClass
} from "../Form/SelectControl";
import { trimAddress } from "../../utils/trimAddress";
import { periodMultipliers } from "../../constants/timePeriodMultipliers";
import type { ControlValueChangeCB } from "../../types/formControl";
import type { WalletAccountInfo } from "../../hooks/useWalletAccounts";


export interface StreamConfigFormControls {
  readonly token: string;
  readonly releaseAmount: string;
  readonly releaseFrequency: string;
  readonly releaseInterval: keyof typeof periodMultipliers;
  readonly releaseDate: string;
  readonly releaseTime: string;
}

interface StreamContractControlsViewProps {
  readonly formControls: StreamConfigFormControls;
  readonly handleControlValueChange: ControlValueChangeCB;
  readonly walletAccounts: WalletAccountInfo[]
}

const StreamContractControlsView: FC<StreamContractControlsViewProps> = ({
  formControls,
  handleControlValueChange,
  walletAccounts
}) => {
  const tokens = walletAccounts?.map(({ uiAmount, tokenName, tokenSymbol, address }) => ({
    label: `${uiAmount} (${tokenSymbol}) - ${tokenName} [${trimAddress(address)}]`,
    address
  }))
  const timeIntervals = Object.keys(periodMultipliers);

  return (
    <>
      <FormSelectControlView
        labelText="Token"
        name={'token'}
        value={formControls.token || 'select'}
        onChange={handleControlValueChange}>

        <option disabled value="select">Select token</option>    
        {tokens?.map(({ label, address }) => (
          <option className="flex flex-row justify-around"
            value={address}
            key={address}>

            {label}
          </option>
        ))}
      </FormSelectControlView>

      {/* <!-- Stream amount / frequency --> */}
      <fieldset className="flex flex-row items-center justify-around space-x-4">
        {/* <!-- Amount to release --> */}
        <FormInputFieldView
          type="text"
          labelClass={`${inputFieldLabelClass} flex-grow`}
          labelText="Release amount"
          placeholder="0.00"
          name='releaseAmount'
          value={formControls.releaseAmount}
          onChange={handleControlValueChange} />

        {/* <!-- Release frequency --> */}
        <section className="flex flex-row space-x-2">
          <FormInputFieldView
            type="text"
            labelClass={`${inputFieldLabelClass} flex-1`}
            labelText="Release freq."
            name="releaseFrequency"
            value={formControls.releaseFrequency}
            onChange={handleControlValueChange} />

          {/* <!-- Release interval --> */}
          <FormSelectControlView
            value={formControls.releaseInterval || 'select'}
            inputClass={`${selectControlInputClass} capitalize`}
            labelClass={`${selectControlLabelClass} flex-1`}
            labelText="Interval"
            name="releaseInterval"
            onChange={handleControlValueChange}>

            <option disabled value="select">Select interval</option>    
            {timeIntervals.map((val) => (
              <option value={val} key={val} className="capitalize">{val}</option>
            ))}
          </FormSelectControlView>
        </section>
      </fieldset>

      {/* <!-- Release group --> */}
      <fieldset className="flex flex-row items-center justify-around space-x-4">
        {/* <!-- Release date --> */}
        <FormInputFieldView
          type="date"
          value={formControls.releaseDate}
          labelClass={`${inputFieldLabelClass} flex-grow`}
          labelText="Release date"
          name="releaseDate"
          onChange={handleControlValueChange} />
      
        {/* <!-- Release time --> */}
        <FormInputFieldView
          type="time"
          value={formControls.releaseTime}
          labelClass={`${inputFieldLabelClass} flex-grow`}
          labelText="Release time"
          name="releaseTime"
          onChange={handleControlValueChange} />
      </fieldset>
    </>
  )
}


export default StreamContractControlsView;