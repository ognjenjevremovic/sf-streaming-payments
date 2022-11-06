import { FC } from "react";
import type { ChangeEvent, CSSProperties } from "react";

import './Toggle.scss';


interface SliderViewProps {
  readonly disabled: boolean;
  readonly checked: boolean;
  readonly onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  readonly style?: CSSProperties;
  readonly className?: string;
}

const ToggleView: FC<SliderViewProps> = ({ disabled, checked, style = {}, className, onChange }) => {
  return (
    <>
      <label className={`switch ${className}`} style={style}>
        <input
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="react-switch-checkbox"
          type="checkbox"
        />
        <span className="slider round"></span>
      </label>
    </>
  );
}


export default ToggleView;