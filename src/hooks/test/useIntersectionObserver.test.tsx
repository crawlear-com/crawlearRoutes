import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, renderHook, act, screen } from "@testing-library/react";
import useIntersectionObserver from "../useIntersectionObserver";
import TestComponent from "./testComponents/IntersectionObserverTestComponent";

const observeMock = vi.fn();
const unobserveMock = vi.fn();
const disconnectMock = vi.fn();

let intersectionCallback: IntersectionObserverCallback;

beforeEach(() => {
  vi.clearAllMocks();

  
  globalThis.IntersectionObserver = vi.fn()
    .mockImplementation(function (this: IntersectionObserver, callback: IntersectionObserverCallback) {
    intersectionCallback = callback;

    this.observe = observeMock;
    this.unobserve = unobserveMock;
    this.disconnect = disconnectMock;
  });
});

describe("useIntersectionObserver", () => {
  it("returns a ref object", () => {
    const { result } = renderHook(() =>
      useIntersectionObserver(vi.fn(), true)
    );

    expect(result.current).toHaveProperty("current");
  });

  it("creates an IntersectionObserver and observes element", () => {
    render(<TestComponent callback={vi.fn()} needsToCallback={true} />);

    const element = screen.getByTestId("observer");

    expect(IntersectionObserver).toHaveBeenCalledTimes(1);
    expect(observeMock).toHaveBeenCalledWith(element);
  });

  it("calls callback when element intersects and needsToCallback is true", () => {
    const callback = vi.fn();

    render(<TestComponent callback={ callback } needsToCallback={ true } />);
    const div = document.createElement("div");

    div.dataset.testid = "observer";

    act(() => {
      intersectionCallback([{   
            isIntersecting: true,
            target: div,
            time: 0,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null 
        } as IntersectionObserverEntry
      ], {} as IntersectionObserver);
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(unobserveMock).toHaveBeenCalledWith(div);
  });

  it("does NOT call callback when needsToCallback is false", () => {
    const callback = vi.fn();

    render(<TestComponent callback={ callback } needsToCallback={ false } />);
    const div = document.createElement("div");

    div.dataset.testid = "observer";
    act(() => {
      intersectionCallback([
        {   
            isIntersecting: true,
            target: div,
            time: 0,
            intersectionRatio: 1,
            boundingClientRect: {} as DOMRectReadOnly,
            intersectionRect: {} as DOMRectReadOnly,
            rootBounds: null,
        } as IntersectionObserverEntry,
      ], {} as IntersectionObserver);
    });

    expect(callback).not.toHaveBeenCalled();
    expect(unobserveMock).toHaveBeenCalledWith(div);
  });

  it("cleans up observer on unmount", () => {
    const callback = vi.fn();

    const { unmount } = render(<TestComponent callback={ callback } needsToCallback={ false } />);
    const div = document.createElement("div");

    div.dataset.testid = "observer";
    unmount();

    expect(unobserveMock).toHaveBeenCalledWith(div);
    expect(disconnectMock).toHaveBeenCalled();
  });
});
