import type { CostRange, Facility, FacilityFilter, SortOption } from "@/types/facility";

const costRangeChecks: Record<CostRange, (facility: Facility) => boolean> = {
  all: () => true,
  under200: (facility) => facility.maxCost < 200000,
  "200to250": (facility) => facility.minCost <= 250000 && facility.maxCost >= 200000,
  "250to300": (facility) => facility.minCost <= 300000 && facility.maxCost >= 250000,
  over300: (facility) => facility.minCost >= 300000 || facility.maxCost > 300000
};

const sorters: Record<SortOption, (a: Facility, b: Facility) => number> = {
  recommended: (a, b) => a.recommendedRank - b.recommendedRank,
  cost_low: (a, b) => a.minCost - b.minCost,
  newest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
};

export function filterFacilities(
  facilities: Facility[],
  filter: FacilityFilter
): Facility[] {
  const costCheck = costRangeChecks[filter.costRange];

  return facilities
    .filter((facility) => (filter.city === "all" ? true : facility.city === filter.city))
    .filter((facility) => (filter.type === "all" ? true : facility.type === filter.type))
    .filter((facility) => costCheck(facility))
    .filter((facility) =>
      filter.medicalTags.length === 0
        ? true
        : filter.medicalTags.every((tag) => facility.medicalSupport.includes(tag))
    )
    .sort(sorters[filter.sort]);
}
