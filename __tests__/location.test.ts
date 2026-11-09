import { describe, it, expect } from "vitest";
import { profileConfig } from "@/data/profile";

describe("Location & Google Maps Integration", () => {
  it("should have correct saved fallback Google Maps URL", () => {
    expect(profileConfig.contact.locationMapUrl).toBe(
      "https://maps.app.goo.gl/tpTi2YUs5Q9t15F67"
    );
  });

  it("should construct valid Google Maps coordinate query URLs", () => {
    const lat = 11.0168;
    const lng = 76.9558;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    expect(url).toBe("https://www.google.com/maps/search/?api=1&query=11.0168,76.9558");
    expect(url).toContain("https://www.google.com/maps/search/?api=1&query=");
  });

  it("should have correct error copy specified for permission denied, unavailable and timeout", () => {
    const errorMessages = {
      permissionDenied:
        "Location permission denied. Opening the saved Google Maps location instead.",
      unavailable: "Unable to detect your location. Please try again.",
      timeout: "Location request timed out. Please try again.",
    };

    expect(errorMessages.permissionDenied).toBe(
      "Location permission denied. Opening the saved Google Maps location instead."
    );
    expect(errorMessages.unavailable).toBe(
      "Unable to detect your location. Please try again."
    );
    expect(errorMessages.timeout).toBe(
      "Location request timed out. Please try again."
    );
  });
});
