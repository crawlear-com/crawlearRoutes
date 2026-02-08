import type { RootState } from "@/application/store/store";

type StepProcessProps = {
  steps: Array<React.JSX.Element>,
  stepDescriptions: Array<string>,
  stepTitles: Array<string>,
  stepsSelectors: Array<(state: RootState, ...params: unknown[]) => unknown>
}

export { type StepProcessProps };