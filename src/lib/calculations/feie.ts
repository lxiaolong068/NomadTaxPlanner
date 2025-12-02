import { FEIEInput, FEIEResult } from "@/types";
import { TAX_THRESHOLDS } from "@/lib/constants";
import { differenceInDays, format } from "date-fns";

// FEIE maximum exclusion amounts by year
const FEIE_MAX_EXCLUSIONS: Record<number, number> = {
  2024: 126500,
  2025: 130000, // Estimated, update when official
  2023: 120000,
  2022: 112000,
  2021: 108700,
  2020: 107600,
};

const PHYSICAL_PRESENCE_REQUIRED_DAYS =
  TAX_THRESHOLDS.FEIE_PHYSICAL_PRESENCE_DAYS; // 330 days

/**
 * Calculate FEIE eligibility and exclusion amount
 */
export function calculateFEIE(input: FEIEInput): FEIEResult {
  const {
    testPeriodStart,
    testPeriodEnd,
    daysOutsideUS,
    daysInUS,
    foreignEarnedIncome,
    taxYear,
  } = input;

  const startDate = new Date(testPeriodStart);
  const endDate = new Date(testPeriodEnd);

  // Calculate total days in test period
  const totalTestDays = differenceInDays(endDate, startDate) + 1;

  // For physical presence test, need 330 days in a 365-day period
  const qualifyingDays = daysOutsideUS;
  const requiredDays = PHYSICAL_PRESENCE_REQUIRED_DAYS;
  const daysShort = Math.max(0, requiredDays - qualifyingDays);

  // Check if qualifies for physical presence test
  const qualifies = qualifyingDays >= requiredDays && totalTestDays >= 365;

  // Get max exclusion for the tax year
  const maxExclusion =
    FEIE_MAX_EXCLUSIONS[taxYear] || FEIE_MAX_EXCLUSIONS[2024];

  // Calculate pro-rated exclusion if test period doesn't cover full year
  // Pro-ration = (qualifying days in tax year / 365) * max exclusion
  const daysInTaxYear = calculateDaysInTaxYear(startDate, endDate, taxYear);
  const proRatedExclusion = Math.round((daysInTaxYear / 365) * maxExclusion);

  // Excludable amount is the lesser of:
  // 1. Foreign earned income
  // 2. Pro-rated maximum exclusion
  const excludableAmount = qualifies
    ? Math.min(foreignEarnedIncome, proRatedExclusion)
    : 0;

  // Taxable amount after exclusion
  const taxableAmount = Math.max(0, foreignEarnedIncome - excludableAmount);

  // Generate explanation
  let explanation = "";
  if (qualifies) {
    explanation = `You qualify for the FEIE Physical Presence Test with ${qualifyingDays} days outside the US (${requiredDays} required). `;
    if (proRatedExclusion < maxExclusion) {
      explanation += `Your exclusion is pro-rated to $${proRatedExclusion.toLocaleString()} based on ${daysInTaxYear} qualifying days in ${taxYear}. `;
    }
    explanation += `You can exclude up to $${excludableAmount.toLocaleString()} of your foreign earned income.`;
  } else {
    explanation = `You do not currently qualify for the FEIE Physical Presence Test. `;
    if (daysShort > 0) {
      explanation += `You need ${daysShort} more days outside the US to meet the 330-day requirement. `;
    }
    if (totalTestDays < 365) {
      explanation += `Your test period must be at least 365 consecutive days. `;
    }
  }

  // Generate warnings
  const warnings: string[] = [];
  if (qualifies && foreignEarnedIncome > maxExclusion) {
    warnings.push(
      `Your income ($${foreignEarnedIncome.toLocaleString()}) exceeds the maximum exclusion. $${(foreignEarnedIncome - maxExclusion).toLocaleString()} will remain taxable.`,
    );
  }
  if (daysInUS > 35 && qualifies) {
    warnings.push(
      `You spent ${daysInUS} days in the US during your test period. Ensure these were for allowed purposes.`,
    );
  }
  if (!qualifies && daysShort <= 30) {
    warnings.push(
      `You're close to qualifying! Only ${daysShort} more days needed outside the US.`,
    );
  }

  // Generate recommendations
  const recommendations: string[] = [];
  if (qualifies) {
    recommendations.push(
      "File Form 2555 with your tax return to claim the exclusion.",
    );
    recommendations.push(
      "Keep records of your foreign residence and travel dates.",
    );
    if (excludableAmount < foreignEarnedIncome) {
      recommendations.push(
        "Consider the Foreign Tax Credit for income above the exclusion limit.",
      );
    }
  } else {
    recommendations.push(
      "Consider extending your time abroad to meet the 330-day requirement.",
    );
    recommendations.push(
      "Alternatively, establish a bona fide residence in a foreign country.",
    );
    recommendations.push(
      "Consult a tax professional about the Bona Fide Residence Test.",
    );
  }

  return {
    qualifies,
    testType: "physical-presence",
    qualifyingDays,
    requiredDays,
    daysShort,
    maxExclusion,
    proRatedExclusion,
    excludableAmount,
    taxableAmount,
    explanation,
    warnings,
    recommendations,
  };
}

/**
 * Calculate days that fall within a specific tax year
 */
function calculateDaysInTaxYear(
  startDate: Date,
  endDate: Date,
  taxYear: number,
): number {
  const yearStart = new Date(taxYear, 0, 1);
  const yearEnd = new Date(taxYear, 11, 31);

  // Find overlap between test period and tax year
  const overlapStart = startDate > yearStart ? startDate : yearStart;
  const overlapEnd = endDate < yearEnd ? endDate : yearEnd;

  if (overlapStart > overlapEnd) {
    return 0;
  }

  return differenceInDays(overlapEnd, overlapStart) + 1;
}

/**
 * Find optimal 365-day period for FEIE qualification
 */
export function findOptimalTestPeriod(
  trips: Array<{ startDate: string; endDate: string; inUS: boolean }>,
  taxYear: number,
): {
  optimalStart: string;
  optimalEnd: string;
  daysOutsideUS: number;
  qualifies: boolean;
} | null {
  // This is a simplified version - a full implementation would use sliding window
  // to find the best 365-day period

  const yearStart = new Date(taxYear, 0, 1);
  const yearEnd = new Date(taxYear, 11, 31);

  // Default to calendar year
  const bestStart = yearStart;
  const bestEnd = yearEnd;
  let bestDaysOutside = 0;

  // Calculate days outside US for the calendar year
  let daysOutside = 365;
  trips.forEach((trip) => {
    if (trip.inUS) {
      const tripStart = new Date(trip.startDate);
      const tripEnd = new Date(trip.endDate);

      // Count US days that overlap with tax year
      const overlapStart = tripStart > yearStart ? tripStart : yearStart;
      const overlapEnd = tripEnd < yearEnd ? tripEnd : yearEnd;

      if (overlapStart <= overlapEnd) {
        daysOutside -= differenceInDays(overlapEnd, overlapStart) + 1;
      }
    }
  });

  bestDaysOutside = Math.max(0, daysOutside);

  return {
    optimalStart: format(bestStart, "yyyy-MM-dd"),
    optimalEnd: format(bestEnd, "yyyy-MM-dd"),
    daysOutsideUS: bestDaysOutside,
    qualifies: bestDaysOutside >= PHYSICAL_PRESENCE_REQUIRED_DAYS,
  };
}

/**
 * Get FEIE max exclusion for a given year
 */
export function getFEIEMaxExclusion(year: number): number {
  return FEIE_MAX_EXCLUSIONS[year] || FEIE_MAX_EXCLUSIONS[2024];
}
