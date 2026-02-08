import { getScaleValue, SCALE11, SCALE110, SCALE118, SCALE124 } from "@/application/helpers/utils";
import type { ScaleSelectOptionsProps } from "./ScaleSelectOptions.types";


const ScaleSelectOptions = ({ id, className, onScaleChange, value }: ScaleSelectOptionsProps) => {
  return <>
    <select className={ className ? className : '' } id={ id } value={ value }
      onChange={ onScaleChange }>
      <option value={ SCALE11 }>{ getScaleValue(SCALE11) }</option>
      <option value={ SCALE110 }>{ getScaleValue(SCALE110) }</option>
      <option value={ SCALE118 }>{ getScaleValue(SCALE118) }</option>
      <option value={ SCALE124 }>{ getScaleValue(SCALE124) }</option>
    </select>
  </>

}

export default ScaleSelectOptions;