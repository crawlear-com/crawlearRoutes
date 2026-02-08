import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import YoutubeEmbed from "../YoutubeEmbed";
import { getVideoIdFromYoutubeUrl } from "../helpers/utils";

describe("YoutubeEmbed", () => {
  it("renders iframe when url is a valid youtube url", () => {
    render(
      <YoutubeEmbed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
    );

    const iframe = screen.getByTitle("YouTube video player");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    );
  });

  it("applies className to wrapper div when provided", () => {
    const { container } = render(
      <YoutubeEmbed
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        className="custom-class"
      />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
  });

  it("does not render iframe when url is invalid", () => {
    const { container } = render(
      <YoutubeEmbed url="https://example.com/not-youtube" />
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render iframe when url does not contain a valid video id", () => {
    const { container } = render(
      <YoutubeEmbed url="https://www.youtube.com/watch?v=short" />
    );

    expect(container.firstChild).toBeNull();
  });

  describe("getVideoId", () => {
    it("returns video id for valid youtube url", () => {
      expect(
        getVideoIdFromYoutubeUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
      ).toBe("dQw4w9WgXcQ");
    });

    it("returns undefined for invalid url", () => {
      expect(getVideoIdFromYoutubeUrl("https://example.com")).toBeUndefined();
    });
  });
});
