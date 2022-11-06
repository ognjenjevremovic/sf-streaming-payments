import type { FC, MouseEvent } from "react";

import './Loader.scss';


const LoaderView: FC<{ show: boolean }> = () => {
  function handleClick(evt: MouseEvent<HTMLDivElement>) {
    evt.preventDefault()
    evt.stopPropagation()
  }

  return (
    <div
      className="loader-backdrop"
      onClick={(evt) => handleClick(evt)}>
      <div className="loader animate-spin" />
    </div>
  )
}


export default LoaderView;