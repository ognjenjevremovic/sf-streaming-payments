import type { ChangeEvent, FC } from "react";

import './InputField.scss';


interface FormInputFieldProps {
  readonly type: 'text' | 'email' | 'date' | 'time';
  readonly name: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly value?: string;
  readonly placeholder?: string;
  readonly labelClass?: string;
  readonly inputClass?: string;
  readonly labelText?: string;
}

export const defaultLabelClass = 'form-control_input--label' as const;
export const defaultInputClass = 'form-control_input' as const;
export const inputDisabledClass = 'form-control_input--disabled' as const;

const FormInputFieldView: FC<FormInputFieldProps> = ({
  type = 'text',
  name,
  onChange,
  value = '',
  placeholder = '',
  labelText = '',
  labelClass = defaultLabelClass,
  inputClass = defaultInputClass
}) => {
  return (
    <label className={labelClass}>
      <span className="block">
        {labelText}
      </span>
      <input
        name={name}
        type={type}
        className={inputClass}
        value={value}
        placeholder={placeholder}
        onChange={onChange} />
    </label>
  );
}


export default FormInputFieldView;