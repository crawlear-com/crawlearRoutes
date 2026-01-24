import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useSearchInput from "../hooks/useSearchInput";

describe("useSearchInput", () => {
  const onQueryChangeMock = vi.fn();
  const onSearchMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls onQueryChange immediately on input change", () => {
    const { result } = renderHook(() =>
      useSearchInput(onQueryChangeMock, onSearchMock)
    );

    const [onChange] = result.current;

    act(() => {
      onChange({
        target: { value: "test" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(onQueryChangeMock).toHaveBeenCalledWith("test");
    expect(onSearchMock).not.toHaveBeenCalled();
  });

  it("calls onSearch after bouncing timeout", () => {
    const { result } = renderHook(() =>
      useSearchInput(onQueryChangeMock, onSearchMock)
    );

    const [onChange] = result.current;

    act(() => {
      onChange({
        target: { value: "hello" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(onSearchMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it("debounces search when input changes multiple times", () => {
    const { result } = renderHook(() =>
      useSearchInput(onQueryChangeMock, onSearchMock)
    );

    const [onChange] = result.current;

    act(() => {
      onChange({ target: { value: "a" } } as React.ChangeEvent<HTMLInputElement>);
      vi.advanceTimersByTime(50);
      onChange({ target: { value: "ab" } } as React.ChangeEvent<HTMLInputElement>);
      vi.advanceTimersByTime(50);
      onChange({ target: { value: "abc" } } as React.ChangeEvent<HTMLInputElement>);
      vi.advanceTimersByTime(50);
    });

    expect(onSearchMock).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1005);
    });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });
});
