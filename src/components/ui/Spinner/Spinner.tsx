import type { SpinnerProps } from "./Spinner.types";

const Spinner = ({ className }: SpinnerProps) => {
    return <div className="w-full min-h-25">
        <div role="progressbar" id="spinner" className={`${ className } h-6 w-6 animate-spin rounded-full border-b-2 border-current m-auto`} />
    </div>
}

export default Spinner;