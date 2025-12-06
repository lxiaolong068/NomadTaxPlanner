import { ALL_COUNTRIES, SUPPORTED_COUNTRIES, TAX_THRESHOLDS } from "./constants";
import type { SelectOption, RiskLevel } from "@/types";

// Map of known flags so we can label dropdown options even for extended country list
const FLAG_LOOKUP = new Map<string, string>(
  SUPPORTED_COUNTRIES.map((country) => [country.code, country.flag])
);

/**
 * Current year constant - use this instead of creating new Date() in components
 */
export const CURRENT_YEAR = new Date().getFullYear();

/**
 * Generate year options for select dropdowns
 * @param yearsBack - Number of years to include (default: 5)
 * @returns Array of SelectOption objects
 */
export function getYearOptions(yearsBack: number = 5): SelectOption[] {
  return Array.from({ length: yearsBack }, (_, i) => ({
    value: String(CURRENT_YEAR - i),
    label: String(CURRENT_YEAR - i),
  }));
}

/**
 * Generate country options for select dropdowns from SUPPORTED_COUNTRIES
 * @returns Array of SelectOption objects with flag emoji
 */
export function getCountryOptions(): SelectOption[] {
  return ALL_COUNTRIES.map((country) => {
    const flag = FLAG_LOOKUP.get(country.code);
    return {
      value: country.code,
      label: flag ? `${flag} ${country.name}` : country.name,
    };
  });
}

/**
 * Get the tax residency threshold for a specific country
 * @param countryCode - ISO country code
 * @returns Number of days for tax residency threshold
 */
export function getThresholdForCountry(countryCode: string): number {
  // Thailand uses 180 days, most others use 183
  return countryCode === "TH" ? 180 : TAX_THRESHOLDS.DEFAULT_RESIDENCY_DAYS;
}

/**
 * Calculate risk level based on days spent vs threshold
 * @param days - Days spent in country
 * @param threshold - Tax residency threshold for the country
 * @returns RiskLevel: 'low' | 'medium' | 'high' | 'resident'
 */
export function getRiskLevel(days: number, threshold: number): RiskLevel {
  const percentage = (days / threshold) * 100;
  if (days >= threshold) return "resident";
  if (percentage >= 90) return "high";
  if (percentage >= 70) return "medium";
  return "low";
}

/**
 * Get badge variant for risk level display
 * @param riskLevel - The risk level to get variant for
 * @returns Badge variant string
 */
export function getRiskBadgeVariant(
  riskLevel: RiskLevel
): "destructive" | "warning" | "secondary" | "success" {
  switch (riskLevel) {
    case "resident":
      return "destructive";
    case "high":
      return "warning";
    case "medium":
      return "secondary";
    default:
      return "success";
  }
}

/**
 * Get human-readable label for risk level
 * @param riskLevel - The risk level to get label for
 * @returns Human-readable risk label
 */
export function getRiskLabel(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case "resident":
      return "Tax Resident";
    case "high":
      return "High Risk";
    case "medium":
      return "Medium Risk";
    default:
      return "Low Risk";
  }
}

/**
 * Get progress bar color class for risk level
 * @param riskLevel - The risk level to get color for
 * @returns Tailwind CSS class for progress bar color
 */
export function getRiskProgressClass(riskLevel: RiskLevel): string {
  switch (riskLevel) {
    case "resident":
      return "[&>div]:bg-destructive";
    case "high":
      return "[&>div]:bg-warning";
    case "medium":
      return "[&>div]:bg-primary";
    default:
      return "[&>div]:bg-success";
  }
}

/**
 * Get ARIA label for risk level (accessibility)
 * @param riskLevel - The risk level
 * @param days - Days spent
 * @param threshold - Threshold days
 * @returns Descriptive ARIA label
 */
export function getRiskAriaLabel(
  riskLevel: RiskLevel,
  days: number,
  threshold: number
): string {
  const percentage = Math.round((days / threshold) * 100);
  const label = getRiskLabel(riskLevel);
  return `${label}: ${days} of ${threshold} days (${percentage}%)`;
}

/**
 * Get emoji flag for a country code if known
 */
export function getCountryFlag(code: string): string | undefined {
  return FLAG_LOOKUP.get(code);
}
