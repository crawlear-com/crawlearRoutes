import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderWithProviders } from "../../../test/test-utils";
import TestComponent from "./testComponents/UseGuardTestComponent";

const navigateMock = vi.fn();
vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    useNavigate: () => navigateMock
  }
})
import { MemoryRouter } from "react-router";


describe("useGuard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to '/' when there is no session", () => {
    renderWithProviders(<MemoryRouter><TestComponent setsSession={false} /></MemoryRouter>);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("does not redirects to '/' when there is session", () => {
    renderWithProviders(<MemoryRouter><TestComponent setsSession={true} /></MemoryRouter>);

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
