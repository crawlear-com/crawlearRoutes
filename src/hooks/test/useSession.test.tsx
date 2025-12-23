import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { renderWithProviders } from "../../../test/test-utils";

import TestComponent from "./testComponents/UseSessionTestComponent";
import { setSession } from "../../features/users/store/slice/userSlice";
import { sessionData } from "./testComponents/sessionData";
import supabaseClient from "../../helpers/supabaseClient";

vi.mock("../../helpers/supabaseClient", () => {
  return {
    default: {
      auth: {
        getSession: vi.fn(),
        onAuthStateChange: vi.fn().mockReturnValue({
          data: {
            subscription: {
              unsubscribe: vi.fn(),
            },
          },
        }),
      }
    }
  };
});

const dispatchMock = vi.fn();

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-redux");
  return {
    ...actual,
    useDispatch: () => dispatchMock,
  };
});

const navigateMock = vi.fn();

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-router");
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("useSession (with renderWithProviders)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches session and navigates when session exists", async () => {
    (supabaseClient.auth.getSession as Mock).mockResolvedValue({
      data: { session: sessionData },
    });
    
    renderWithProviders(<MemoryRouter><TestComponent /></MemoryRouter>);
    
    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(setSession(sessionData));
      expect(navigateMock).toHaveBeenCalledWith("/");
    });
  });

  it("does nothing when session does not exist", async () => {
    renderWithProviders(<MemoryRouter><TestComponent /></MemoryRouter>);

    await waitFor(() => {
      expect(dispatchMock).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
});
