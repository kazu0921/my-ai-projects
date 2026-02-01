export type Facility = {
  slug: string;
  name: string;
  city: string;
  address: string;
  type: "特養" | "有料老人ホーム" | "介護付き有料老人ホーム" | "サ高住";
  minCost: number;
  maxCost: number;
  medicalSupport: string[];
  availability: string;
  summary: string;
  mapUrl: string;
  recommendedRank: number;
  createdAt: string;
};

export type CostRange = "all" | "under200" | "200to250" | "250to300" | "over300";

export type SortOption = "recommended" | "cost_low" | "newest";

export type FacilityFilter = {
  city: string;
  type: string;
  costRange: CostRange;
  medicalTags: string[];
  sort: SortOption;
};
