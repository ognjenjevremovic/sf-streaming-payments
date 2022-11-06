import { ChangeEvent } from 'react';

export type ControlValueChangeCB = (
  event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => void;
