import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ToggleTheme from "../ToggleTheme";
import { setTheme } from "../store/slice/themeSlice";

const dispatchMock = vi.fn();

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-redux");
  return {
    ...actual,
    useDispatch: () => dispatchMock,
  };
});

describe("ToggleTheme", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.documentElement.className = "";
    cleanup();
  });

  it("renders with light theme by default", () => {
    render(<ToggleTheme />);

    expect(screen.getByTestId("light")).toBeInTheDocument();
  });

  it("toggles to dark theme on click", () => {
    render(<ToggleTheme />);

    const toggle = screen.getByTestId("light");
    fireEvent.click(toggle);

    expect(screen.getByTestId("dark")).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenCalledWith(setTheme("dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles back to light theme on second click", () => {
    render(<ToggleTheme />);

    const toggle = screen.getByTestId("light");

    fireEvent.click(toggle);
    fireEvent.click(screen.getByTestId("dark"));

    expect(screen.getByTestId("light")).toBeInTheDocument();
    expect(dispatchMock).toHaveBeenLastCalledWith(setTheme("light"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("applies custom className", () => {
    render(<ToggleTheme className="custom-class" />);

    const toggle = screen.getByTestId("light");
    expect(toggle).toHaveClass("custom-class");
  });
});