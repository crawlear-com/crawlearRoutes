import { act, waitFor } from "@testing-library/react";
import { describe, it, beforeEach, expect, vi } from "vitest";
import useEventsCalendar from "../hooks/useEventsCalendar";
import { renderHookWithProviders } from "@/test/test-utils";
import toast from "react-hot-toast";
import SupabaseRouteEventRepository from "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository";

const { mockRepoMethods } = vi.hoisted(() => {
  return {
    mockRepoMethods: {
      getEventRoutesByMonth: vi.fn(),
      getEventRouteEventsByMonth: vi.fn(),
      setEventStartDate: vi.fn(),
    }
  };
});

vi.mock(
  "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository",
  () => {
    return {
      default: class {
        getEventRoutesByMonth = mockRepoMethods.getEventRoutesByMonth;
        getEventRouteEventsByMonth = mockRepoMethods.getEventRouteEventsByMonth;
        setEventStartDate = mockRepoMethods.setEventStartDate;
      },
    };
  }
);

const repository = new SupabaseRouteEventRepository();

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

const mockDateRangeArg = {
  start: new Date("2026-01-01"),
  end: new Date("2026-01-31"),
  view: { calendar: { getDate: () => new Date("2026-01-15") } },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const baseState = {
  user: {
    session: {
      user: {
        id: "user-123",   // <-- this is what your selector needs
      },
    },
    isLoading: false,
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  mockRepoMethods.getEventRoutesByMonth.mockResolvedValue([
    { id: "r1", name: "Route 1" },
  ]);
  mockRepoMethods.getEventRouteEventsByMonth.mockResolvedValue([
    { id: "e1", name: "Event 1" },
  ]);
  mockRepoMethods.setEventStartDate.mockResolvedValue(null);
});

describe("useEventsCalendar", () => {
  it("initializes with default state", () => {
    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [isLoading, currentDate, eventRoutes, eventRouteEvents] =
      result.current;

    expect(isLoading).toBe(false);
    expect(eventRoutes).toEqual([]);
    expect(eventRouteEvents).toEqual([]);
    expect(currentDate).toBeTruthy();
  });

  it("fetches routes and events when date range changes", async () => {
    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , , onDateRangeChange] = result.current;

    act(() => {
      onDateRangeChange(mockDateRangeArg);
    });

    await waitFor(() => {
      expect(repository.getEventRoutesByMonth).toHaveBeenCalledWith(
        "user-123",
        expect.any(String),
        expect.any(String)
      );
      expect(repository.getEventRouteEventsByMonth).toHaveBeenCalled();
    });
  });

  it("navigates to event page when clicking TYPE_EVENT", () => {
    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , onEventClick] = result.current;

    onEventClick({
      event: {
        id: "e1",
        extendedProps: { type: "event" },
      },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(mockNavigate).toHaveBeenCalledWith("/showevent/e1");
  });

  it("navigates to route page when clicking TYPE_ROUTE", () => {
    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , onEventClick] = result.current;

    onEventClick({
      event: {
        id: "r1",
        extendedProps: { type: "route" },
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(mockNavigate).toHaveBeenCalledWith("/showroute/r1");
  });

  it("reverts drop if event type is not TYPE_EVENT", () => {
    const revert = vi.fn();

    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , , , , onEventDrop] = result.current;

    onEventDrop({
      event: { extendedProps: { type: "route" } },
      revert
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    expect(revert).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalled();
  });

  it("modifies event start date on valid drop", async () => {
    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , , , , onEventDrop] = result.current;

    await act(async () => {
      onEventDrop({
        event: {
          id: "e1",
          start: new Date(),
          extendedProps: { type: "event" },
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
    });

    expect(repository.setEventStartDate).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
  });

  it("shows error toast if route fetch fails", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (repository.getEventRoutesByMonth as any).mockRejectedValue(new Error("DB down"));;

    const { result } = renderHookWithProviders(() => useEventsCalendar(), {
      preloadedState: baseState,
    });

    const [, , , , , onDateRangeChange] = result.current;

    act(() => onDateRangeChange(mockDateRangeArg));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
