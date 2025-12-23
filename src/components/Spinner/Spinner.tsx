import type { SpinnerProps } from "./Spinner.types";

const Spinner = ({ extraClass }: SpinnerProps) => {
    return  <div role="progressbar" id="spinner" className={`${ extraClass } h-6 w-6 animate-spin rounded-full border-b-2 border-current m-auto`} />
}

export default Spinner;