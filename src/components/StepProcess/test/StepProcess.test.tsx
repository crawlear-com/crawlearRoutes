import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import StepProcess from "../StepProcess";
import { stepDescriptions, steps, stepSelectors, stepTitles } from "./stepsData";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const useSelectorMock = vi.fn();

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-redux");
  return {
    ...actual,
    useSelector: (selector: unknown) => useSelectorMock(selector),
  };
});

vi.mock("../StepIndicator", () => ({
  default: ({ currentStep }: { currentStep: number }) => (
    <div data-testid="step-indicator">{currentStep}</div>
  ),
}));

describe("StepProcess", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders first step correctly", () => {
    useSelectorMock.mockReturnValue(true);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    expect(screen.getByText("main.step 1: Title 1")).toBeInTheDocument();
    expect(screen.getByText("desc1")).toBeInTheDocument();
    expect(screen.getByText("Step 1 content")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("0");
  });

  it("moves to next step when clicking next button", () => {
    useSelectorMock.mockReturnValue(true);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    fireEvent.click(screen.getByText("＞"));

    expect(screen.getByText("main.step 2: Title 2")).toBeInTheDocument();
    expect(screen.getByText("Step 2 content")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("1");
  });

  it("moves back to previous step when clicking previous button", () => {
    useSelectorMock.mockReturnValue(true);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    fireEvent.click(screen.getByText("＞"));
    fireEvent.click(screen.getByText("＜"));

    expect(screen.getByText("main.step 1: Title 1")).toBeInTheDocument();
  });

  it("disables next button when current step is not finished", () => {
    useSelectorMock.mockReturnValue(false);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    const nextButton = screen.getByText("＞");
    expect(nextButton).toBeDisabled();
  });

  it("does not render previous button on first step", () => {
    useSelectorMock.mockReturnValue(true);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    expect(screen.queryByText("＜")).toBeNull();
  });

  it("does not render next button on last step", () => {
    useSelectorMock.mockReturnValue(true);

    render(
      <StepProcess
        steps={steps}
        stepTitles={stepTitles}
        stepDescriptions={stepDescriptions}
        stepsSelectors={stepSelectors}
      />
    );

    fireEvent.click(screen.getByText("＞"));
    fireEvent.click(screen.getByText("＞"));

    expect(screen.queryByText("＞")).toBeNull();
  });
});
