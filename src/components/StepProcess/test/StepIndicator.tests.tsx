import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import StepIndicator from "../StepIndicator";

describe("StepIndicator", () => {
  it("renders the correct number of steps", () => {
    const { container } = render(
      <StepIndicator currentStep={0} stepsNumber={5} />
    );

    const points = container.querySelectorAll("span");
    expect(points).toHaveLength(5);
  });

  it("highlights the current step", () => {
    const { container } = render(
      <StepIndicator currentStep={2} stepsNumber={4} />
    );

    const points = container.querySelectorAll("span");

    expect(points[2]).toHaveClass("text-primary");
  });

  it("marks non-current steps as tertiary", () => {
    const { container } = render(
      <StepIndicator currentStep={1} stepsNumber={3} />
    );

    const points = container.querySelectorAll("span");

    points.forEach((point, index) => {
      if (index === 1) {
        expect(point).toHaveClass("text-primary");
      } else {
        expect(point).toHaveClass("text-terciary");
      }
    });
  });

  it("updates highlighted step when currentStep changes", () => {
    const { container, rerender } = render(
      <StepIndicator currentStep={0} stepsNumber={3} />
    );

    let points = container.querySelectorAll("span");
    expect(points[0]).toHaveClass("text-primary");

    rerender(<StepIndicator currentStep={2} stepsNumber={3} />);

    points = container.querySelectorAll("span");
    expect(points[2]).toHaveClass("text-primary");
    expect(points[0]).toHaveClass("text-terciary");
  });
});
