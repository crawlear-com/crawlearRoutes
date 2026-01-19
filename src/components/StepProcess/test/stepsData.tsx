import { vi } from "vitest";

const steps = [
  <div key="step1">Step 1 content</div>,
  <div key="step2">Step 2 content</div>,
  <div key="step3">Step 3 content</div>,
];

const stepTitles = ["Title 1", "Title 2", "Title 3"];
const stepDescriptions = ["desc1", "desc2", "desc3"];

const stepSelectors = [
  vi.fn(),
  vi.fn(),
  vi.fn(),
];

export { steps, stepTitles, stepDescriptions, stepSelectors };