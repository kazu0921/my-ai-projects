import { describe, expect, it } from "vitest";
import facilities from "../data/facilities.json";
import type { Facility } from "../types/facility";
import { filterFacilities } from "../lib/facilitySearch";

const facilityList = facilities as Facility[];

describe("filterFacilities", () => {
  it("filters by city and type", () => {
    const results = filterFacilities(facilityList, {
      city: "横浜市西区",
      type: "有料老人ホーム",
      costRange: "all",
      medicalTags: [],
      sort: "recommended"
    });

    expect(results.length).toBe(1);
    expect(results[0]?.city).toBe("横浜市西区");
  });

  it("filters by medical tags", () => {
    const results = filterFacilities(facilityList, {
      city: "all",
      type: "all",
      costRange: "all",
      medicalTags: ["胃ろう", "看取り"],
      sort: "recommended"
    });

    expect(results.length).toBeGreaterThan(0);
    results.forEach((facility) => {
      expect(facility.medicalSupport).toEqual(
        expect.arrayContaining(["胃ろう", "看取り"])
      );
    });
  });

  it("sorts by lowest cost", () => {
    const results = filterFacilities(facilityList, {
      city: "all",
      type: "all",
      costRange: "all",
      medicalTags: [],
      sort: "cost_low"
    });

    for (let index = 1; index < results.length; index += 1) {
      expect(results[index - 1].minCost).toBeLessThanOrEqual(results[index].minCost);
    }
  });
});
