import type { RootState } from "../../store/store";

const NEXT_PAGE_ARROW = "＞";
const PREVIOUS_PAGE_ARROW = "＜";

type StepProcessProps = {
  steps: Array<React.JSX.Element>,
  stepDescriptions: Array<string>,
  stepTitles: Array<string>,
  stepsSelectors: Array<(state: RootState, ...params: unknown[]) => unknown>
}

export { type StepProcessProps, NEXT_PAGE_ARROW, PREVIOUS_PAGE_ARROW };