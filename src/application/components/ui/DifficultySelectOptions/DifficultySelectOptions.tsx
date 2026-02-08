import { useDifficultyValues } from "@/application/helpers/utils";
import type { DifficultySelectOptionsProps } from "./DifficultySelectOptions.types";

const DifficultySelectOptions = ({ id, className, onDifficultyChange, value }: DifficultySelectOptionsProps) => {
  const [ easy, moderate, difficult ] = useDifficultyValues();

  return <>
    <select  id={ id } className={ className ? className : ''} value={ value }
      onChange={ onDifficultyChange }>
      <option value="1">{ easy }</option>
      <option value="2">{ moderate }</option>
      <option value="3">{ difficult}</option>
    </select>
  </>

}

export default DifficultySelectOptions;