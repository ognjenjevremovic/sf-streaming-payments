import type { ChangeEvent, FC, ReactNode } from "react";

import './SelectControl.scss';


interface FormSelectControlProps {
  readonly children: ReactNode;
  readonly name: string;
  readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  readonly value?: string;
  readonly labelClass?: string;
  readonly inputClass?: string;
  readonly labelText?: string;
}

export const defaultLabelClass = 'form-control_select--label' as const;
export const defaultInputClass = 'form-control_select' as const;

const FormSelectControlView: FC<FormSelectControlProps> = ({
  children,
  name,
  onChange,
  value = '',
  labelText = '',
  labelClass = defaultLabelClass,
  inputClass = defaultInputClass
}) => {
  return (
    <label className={labelClass}>
      <span className="block">
        {labelText}
      </span>
      <select className={inputClass} onChange={onChange} value={value} name={name}>
        {children}
      </select>
    </label>
  );
}


export default FormSelectControlView;