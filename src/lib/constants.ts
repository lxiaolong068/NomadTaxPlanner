// Site metadata
export const SITE_NAME = "NomadTaxPlanner";
export const SITE_DESCRIPTION =
  "Free tax planning tools for digital nomads. Understand your tax obligations across borders with interactive calculators and country guides.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nomadtaxplanner.com";

// Combined site config for easy import
export const SITE_CONFIG = {
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
} as const;

// Tax thresholds
export const TAX_THRESHOLDS = {
  DEFAULT_RESIDENCY_DAYS: 183,
  FEIE_PHYSICAL_PRESENCE_DAYS: 330,
  FEIE_MAX_EXCLUSION_2024: 126500,
  FEIE_MAX_EXCLUSION_2025: 130000,
  WARNING_THRESHOLD_PERCENTAGE: 80,
} as const;

// Country-specific thresholds (days for tax residency)
export const COUNTRY_THRESHOLDS: Record<string, number> = {
  US: 183, // Substantial Presence Test is more complex
  GB: 183, // SRT has additional factors
  DE: 183,
  PT: 183,
  TH: 180,
  ES: 183,
  NL: 183,
  FR: 183,
  IT: 183,
  JP: 183,
};

// Navigation links
export const NAV_LINKS = [
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Country Guides" },
  { href: "/learn", label: "Learn" },
  { href: "/about", label: "About" },
] as const;

// Tool links
export const TOOL_LINKS = [
  {
    href: "/tools/tax-residency-checker",
    title: "Tax Residency Checker",
    description:
      "Determine where you might be a tax resident based on your travel history and circumstances.",
    icon: "Globe",
  },
  {
    href: "/tools/day-tracker",
    title: "Day Tracker",
    description:
      "Track your days in each country and get alerts when approaching residency thresholds.",
    icon: "Calendar",
  },
  {
    href: "/tools/feie-calculator",
    title: "FEIE Calculator",
    description:
      "Check if you qualify for the Foreign Earned Income Exclusion as a US citizen.",
    icon: "Calculator",
  },
] as const;

// Supported countries for guides
export const SUPPORTED_COUNTRIES = [
  { code: "US", name: "United States", slug: "united-states", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", slug: "united-kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", slug: "germany", flag: "🇩🇪" },
  { code: "PT", name: "Portugal", slug: "portugal", flag: "🇵🇹" },
  { code: "TH", name: "Thailand", slug: "thailand", flag: "🇹🇭" },
] as const;

// All countries for selection
export const ALL_COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "PT", name: "Portugal" },
  { code: "TH", name: "Thailand" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "ID", name: "Indonesia" },
  { code: "VN", name: "Vietnam" },
  { code: "CO", name: "Colombia" },
  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CR", name: "Costa Rica" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "SG", name: "Singapore" },
  { code: "HK", name: "Hong Kong" },
  { code: "MY", name: "Malaysia" },
  { code: "PH", name: "Philippines" },
  { code: "KR", name: "South Korea" },
  { code: "TW", name: "Taiwan" },
  { code: "GR", name: "Greece" },
  { code: "HR", name: "Croatia" },
  { code: "CZ", name: "Czech Republic" },
  { code: "PL", name: "Poland" },
  { code: "HU", name: "Hungary" },
  { code: "RO", name: "Romania" },
  { code: "BG", name: "Bulgaria" },
  { code: "EE", name: "Estonia" },
  { code: "LV", name: "Latvia" },
  { code: "LT", name: "Lithuania" },
  { code: "MT", name: "Malta" },
  { code: "CY", name: "Cyprus" },
  { code: "IE", name: "Ireland" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "IN", name: "India" },
].sort((a, b) => a.name.localeCompare(b.name));

// Risk levels
export const RISK_LEVELS = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;

// Trip purposes
export const TRIP_PURPOSES = [
  { value: "work", label: "Work / Remote Work" },
  { value: "leisure", label: "Leisure / Tourism" },
  { value: "transit", label: "Transit / Layover" },
] as const;
