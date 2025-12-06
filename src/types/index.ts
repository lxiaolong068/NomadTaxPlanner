// Trip Record for Day Tracker
export interface TripRecord {
  id: string;
  countryCode: string;
  countryName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  days: number;
  purpose: "work" | "leisure" | "transit";
  notes?: string;
}

// Country Summary for Day Tracker
export interface CountrySummary {
  countryCode: string;
  countryName: string;
  totalDays: number;
  trips: TripRecord[];
  firstVisit: string;
  lastVisit: string;
}

// Country Tax Rule
export interface CountryTaxRule {
  countryCode: string;
  countryName: string;
  residencyThreshold: number;
  testType:
    | "physical-presence"
    | "substantial-presence"
    | "statutory-residence"
    | "facts-circumstances";
  description: string;
  specialRules: string[];
}

// Tax Residency Checker Types
export type RiskLevel = "low" | "medium" | "high" | "resident";

export interface ResidencyResult {
  countryCode: string;
  countryName: string;
  year: number;
  daysSpent: number;
  threshold: number;
  isResident: boolean;
  daysRemaining: number;
  percentageOfThreshold: number;
  riskLevel: RiskLevel;
  warnings: string[];
  recommendations: string[];
  taxRule: CountryTaxRule;
}

// FEIE Calculator Types
export interface FEIEInput {
  testPeriodStart: string;
  testPeriodEnd: string;
  daysOutsideUS: number;
  daysInUS: number;
  foreignEarnedIncome: number;
  taxYear: number;
}

export interface FEIEResult {
  qualifies: boolean;
  testType: "physical-presence" | "bona-fide-residence";
  qualifyingDays: number;
  requiredDays: number;
  daysShort: number;
  maxExclusion: number;
  proRatedExclusion: number;
  excludableAmount: number;
  taxableAmount: number;
  explanation: string;
  warnings: string[];
  recommendations: string[];
}

// Country Guide Types
export interface CountryGuide {
  code: string;
  name: string;
  slug: string;
  flag: string;
  region: string;
  residencyThreshold: number;
  currency: string;
  language: string;
  specialPrograms?: string[];
  lastUpdated: string;
  image?: string;
}

export interface CountryTaxInfo {
  overview: string;
  residencyRules: string[];
  taxRates: {
    type: string;
    rate: string;
    description: string;
  }[];
  specialPrograms: {
    name: string;
    description: string;
    eligibility: string[];
    benefits: string[];
  }[];
  filingRequirements: string[];
  doubleTaxationTreaties: string[];
  remoteWorkRules?: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

// Form state
export interface FormState {
  isLoading: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// Generic selection option
export interface SelectOption {
  value: string;
  label: string;
}

// Country data for selectors
export interface CountryOption {
  code: string;
  name: string;
  flag: string;
}
