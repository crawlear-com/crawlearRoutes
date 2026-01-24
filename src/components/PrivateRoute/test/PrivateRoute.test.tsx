import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";

vi.mock("../../../hooks/useSession", () => ({
  default: vi.fn(),
}));

vi.mock("../../ui/Spinner/Spinner", () => ({
  default: () => <div data-testid="spinner" />,
}));

const useSelectorMock = vi.fn();

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal() as typeof import("react-redux");
  return {
    ...actual,
    useSelector: (selector: unknown) => useSelectorMock(selector),
  };
});

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={["/private"]}>
      <Routes>
        <Route path="/login" element={<div>Login Page</div>} />
        <Route element={<PrivateRoute />}>
          <Route path="/private" element={<div>Private Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );

describe("PrivateRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("shows spinner while user is loading", () => {
    useSelectorMock
      .mockReturnValueOnce(null)   // session
      .mockReturnValueOnce(true);  // isLoading

    renderWithRouter();

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders outlet when session exists", () => {
    useSelectorMock
      .mockReturnValueOnce({ id: "user-1" })
      .mockReturnValueOnce(false);

    renderWithRouter();

    expect(screen.getByText("Private Content")).toBeInTheDocument();
  });

  it("redirects to login when session does not exist", () => {
    useSelectorMock
      .mockReturnValueOnce(null)
      .mockReturnValueOnce(false);

    renderWithRouter();

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
