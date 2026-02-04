import { describe, it, beforeEach, expect, vi } from "vitest";
import { act } from "@testing-library/react";
import { renderHookWithProviders } from "@/test/test-utils";
import useEventRoutesFromUser from "../hooks/useEventsFromUser";
import * as rpc from "@/database/eventsRpc";
import toast from "react-hot-toast";
import * as eventSlice from "@/features/events/store/slices/eventListsSlice";
import * as selectors from "@/features/events/store/selectors/eventsListsSelectors";

vi.mock("@/database/eventsRpc", () => ({
  deleteEventRoute: vi.fn(),
}));

vi.mock("react-hot-toast", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-hot-toast");
  return {
    ...actual,
    default: {
      ...actual.default,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const baseState = {
  user: { session: { user: { id: "u1" } }, isLoading: false },
};

const mockEvent = {
    id: "e1",
    name: "event mock",
    description: "event description",
    location: null,
    date: new Date("2026-01-10").toISOString(),
    scale: 1,
    rid: null,
    owner: "uuid owner"
}

beforeEach(() => {
  vi.clearAllMocks();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (rpc.deleteEventRoute as any).mockResolvedValue({});
  vi.spyOn(window, "confirm").mockReturnValue(true);
});


describe("useEventRoutesFromUser", () => {
  it("returns renderer and method configs", () => {
    const { result } = renderHookWithProviders(() => useEventRoutesFromUser(), {
      preloadedState: baseState,
    });

    const [renderCard, setMethods, selectMethods] = result.current;

    expect(typeof renderCard).toBe("function");
    expect(setMethods.setPage).toBe(eventSlice.setMyEventsPage);
    expect(selectMethods.selectItems).toBe(selectors.selectMyEvents);
  });

  it("navigates when modify icon is clicked", () => {
    const { result } = renderHookWithProviders(() => useEventRoutesFromUser(), {
      preloadedState: baseState,
    });
    const [renderCard] = result.current;
    const element = renderCard(mockEvent);
    const modifyIcon = element.props.extras.props.children[0];

    act(() => {
      modifyIcon.props.onClick({
        stopPropagation: vi.fn(),
        target: {
          dataset: { eid: "e1", date: mockEvent.date.toString() },
        },
      });
    });

    expect(mockNavigate).toHaveBeenCalled();
  });

  it("deletes event when confirmed", async () => {
    const dispatchSpy = vi.spyOn(eventSlice, "deleteMyEvent");
    const { result } = renderHookWithProviders(() => useEventRoutesFromUser(), {
      preloadedState: baseState,
    });
    const [renderCard] = result.current;
    const element = renderCard(mockEvent);
    const deleteIcon = element.props.extras.props.children[1];

    await act(async () => {
      deleteIcon.props.onClick({
        stopPropagation: vi.fn(),
        target: { dataset: { eid: "e1" } },
      });
    });

    expect(rpc.deleteEventRoute).toHaveBeenCalledWith("e1");
    expect(dispatchSpy).toHaveBeenCalledWith("e1");
    expect(toast.success).toHaveBeenCalled();
  });

  it("does nothing if delete not confirmed", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window.confirm as any).mockReturnValue(false);

    const { result } = renderHookWithProviders(() => useEventRoutesFromUser(), {
      preloadedState: baseState,
    });

    const [renderCard] = result.current;
    const element = renderCard(mockEvent);
    const deleteIcon = element.props.extras.props.children[1];

    await act(async () => {
      deleteIcon.props.onClick({
        stopPropagation: vi.fn(),
        target: { dataset: { eid: "e1" } },
      });
    });

    expect(rpc.deleteEventRoute).not.toHaveBeenCalled();
  });

  it("shows error toast if delete fails", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (rpc.deleteEventRoute as any).mockRejectedValue(new Error("fail"));
    
    const { result } = renderHookWithProviders(() => useEventRoutesFromUser(), {
      preloadedState: baseState,
    });
    const [renderCard] = result.current;
    const element = renderCard(mockEvent);
    const deleteIcon = element.props.extras.props.children[1];

    await act(async () => {
      deleteIcon.props.onClick({
        stopPropagation: vi.fn(),
        target: { dataset: { eid: "e1" } },
      });
    });

    expect(toast.error).toHaveBeenCalled();
  });
});