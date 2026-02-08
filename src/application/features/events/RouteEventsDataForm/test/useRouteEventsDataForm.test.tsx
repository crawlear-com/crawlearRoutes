import { act, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useRouteEventsDataForm from "../hooks/useRouteEventsDataForm";
import { renderHookWithProviders } from "@/test/test-utils";
import { LatLngBounds } from "leaflet";
import toast from "react-hot-toast";

import * as validations from "../helpers/eventValidations";
import * as actionUtils from "../helpers/utils";

vi.mock("react-hot-toast", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-hot-toast")>();

  return {
    ...actual,
    default: {
      ...actual.default,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock("../helpers/eventValidations", () => ({
  eventFormValidates: vi.fn(),
}));

vi.mock("../helpers/utils", () => ({
  getActionFromActionRpcType: vi.fn(),
  getHourString: vi.fn(),
  createActionPayload: vi.fn().mockResolvedValue({
      id: "id",
      name: "name",
      description: "description",
      location: { lat: 0, lon: 99},
      date: new Date(),
      scale: 1,
      rid: "rid",
      owner: "owner"
    })
}));

const { mockRepoMethods } = vi.hoisted(() => {
  return {
    mockRepoMethods: {
      getRoutesByOwner: vi.fn(),
      getMyRoutesFull: vi.fn()
    }
  };
});

vi.mock(
  "@/infrastructure/Repository/RouteRepository/SupabaseRouteRepository", () => {
    return {
      default: class {
        getRoutesByOwner = mockRepoMethods.getRoutesByOwner;
        getMyRoutesFull = mockRepoMethods.getMyRoutesFull;
      },
    }
  }
);

const { mockRepoEventMethods } = vi.hoisted(() => {
  return {
    mockRepoEventMethods: {
      createEventRoute: vi.fn(),
      modifyEventRoute: vi.fn()
    }
  };
});

vi.mock(
  "@/infrastructure/Repository/RouteEventRepository/SupabaseRouteEventRepository", () => {
    return {
      default: class {
        createEventRoute = mockRepoEventMethods.createEventRoute;
        modifyEventRoute = mockRepoEventMethods.modifyEventRoute;
      },
    }
  }
);

vi.mock("react-i18next", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-i18next")>();
  const tMock = (key: string) => key;

  return {
    ...actual, // 👈 keep initReactI18next + everything else
    useTranslation: () => ({
      t: tMock,
      i18n: { changeLanguage: () => Promise.resolve() },
    }),
  };
});


const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => mockNavigate };
});

const baseState = {
  user: {
    session: { user: { id: "user-123" } },
    isLoading: false,
  },
};

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});


describe("useRouteEventsDataForm", () => {
  it("loads routes and builds route options on mount", async () => {
    mockRepoMethods.getMyRoutesFull.mockResolvedValue([{ id: "r1", name: "Route 1" }]);

    const { result } = renderHookWithProviders(
      () => useRouteEventsDataForm("2026-01-10"),
      { preloadedState: baseState }
    );

    await waitFor(() => {
      expect(result.current[6].length).toBeGreaterThan(1); // routeOptions
    });

    expect(mockRepoMethods.getMyRoutesFull).toHaveBeenCalledWith("user-123");
  });

  it("shows toast when routes fail to load", async () => {
    mockRepoMethods.getMyRoutesFull.mockResolvedValue({
      data: null,
      error: { message: "fail" },
    });

    renderHookWithProviders(() => useRouteEventsDataForm("2026-01-10"), {
      preloadedState: baseState,
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("updates point when map is clicked", () => {
    const { result } = renderHookWithProviders(
      () => useRouteEventsDataForm("2026-01-10"),
      { preloadedState: baseState }
    );

    const bounds = {
      getCenter: () => ({ lat: 10, lng: 20 }),
    } as LatLngBounds;

    act(() => result.current[14](bounds));

    expect(result.current[7]).toEqual({ lat: 10, lon: 20 });
  });

  it("updates hour, route and scale", () => {
    const { result } = renderHookWithProviders(
      () => useRouteEventsDataForm("2026-01-10"),
      { preloadedState: baseState }
    );

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current[11]({ target: { value: "10:30h" } } as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current[12]({ target: { value: "r1" } } as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.current[13]({ target: { value: "2" } } as any);
    });

    expect(result.current[2]).toBe("r1");
    expect(result.current[4]).toBe(2);
    expect(result.current[5]).toBe("10:30h");
  });

  it("submits successfully and navigates back", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (validations.eventFormValidates as any).mockReturnValue(true);

    const mockAction = vi.fn().mockResolvedValue({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (actionUtils.getActionFromActionRpcType as any).mockReturnValue(mockAction);

    const { result } = renderHookWithProviders(
      () => useRouteEventsDataForm("2026-01-10"),
      { preloadedState: baseState }
    );

    await act(async () => {
      await result.current[8](new FormData());
    });

    expect(mockAction).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("shows error toast if submit fails", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (validations.eventFormValidates as any).mockReturnValue(true);

    const mockAction = vi.fn().mockRejectedValue({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (actionUtils.getActionFromActionRpcType as any).mockReturnValue(mockAction);

    const { result } = renderHookWithProviders(
      () => useRouteEventsDataForm("2026-01-10"),
      { preloadedState: baseState }
    );

    await act(async () => {
      await result.current[8](new FormData());
    });

    expect(toast.error).toHaveBeenCalled();
  });
});
