import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import RouteEventCard from "../RouteEventCard";
import { HashRouter } from "react-router-dom";

const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual: any = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("@/components/ui/Badge/ScaleBadge/ScaleBadge", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ scale }: any) => <div data-testid="scale-badge">{scale}</div>,
}));

vi.mock("@/features/maps/SimpleMap/SimpleMap", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ id }: any) => <div data-testid="simple-map">{id}</div>,
}));

vi.mock("uuid", () => ({
  v4: () => "mock-uuid",
}));

const baseEvent = {
  id: "e1",
  name: "Race Day",
  date: new Date("2026-01-10"),
  scale: "1/10",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderCard = (props: any) =>
  render(
    <HashRouter>
      <RouteEventCard {...props} />
    </HashRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("RouteEventCard", () => {
  it("renders event name and date", () => {
    renderCard({ routeEvent: baseEvent });

    expect(screen.getByText("Race Day")).toBeInTheDocument();
    expect(
      screen.getByText(new Date(baseEvent.date).toLocaleDateString())
    ).toBeInTheDocument();
  });

  it("navigates to event details when clicked", () => {
    renderCard({ routeEvent: baseEvent });

    fireEvent.click(screen.getByText("Race Day"));

    expect(mockNavigate).toHaveBeenCalledWith("/showevent/e1");
  });

  it("shows route name when assigned", () => {
    renderCard({
      routeEvent: { ...baseEvent, rid: "r1", routeName: "Track A" },
    });

    expect(screen.getByText("Track A")).toBeInTheDocument();
  });

  it("shows fallback text when no route assigned", () => {
    renderCard({ routeEvent: baseEvent });

    expect(
      screen.getByText("creation.not assigned route")
    ).toBeInTheDocument();
  });

  it("renders ScaleBadge with correct scale", () => {
    renderCard({ routeEvent: baseEvent });

    expect(screen.getByTestId("scale-badge")).toHaveTextContent("1/10");
  });

  it("renders map when location exists", () => {
    renderCard({
      routeEvent: { ...baseEvent, location: { lat: 1, lng: 2 } },
    });

    expect(screen.getByTestId("simple-map")).toBeInTheDocument();
  });

  it("does not render map when location missing", () => {
    renderCard({ routeEvent: baseEvent });

    expect(screen.queryByTestId("simple-map")).not.toBeInTheDocument();
  });

  it("renders extras content", () => {
    renderCard({
      routeEvent: baseEvent,
      extras: <div data-testid="extras">X</div>,
    });

    expect(screen.getByTestId("extras")).toBeInTheDocument();
  });
});
