import { ResidencyResult, TripRecord, CountryTaxRule } from '@/types'
import { TAX_THRESHOLDS } from '@/lib/constants'

// Country-specific tax residency rules
export const COUNTRY_TAX_RULES: Record<string, CountryTaxRule> = {
  US: {
    countryCode: 'US',
    countryName: 'United States',
    residencyThreshold: 183,
    testType: 'substantial-presence',
    description: 'Uses Substantial Presence Test: 31 days current year + weighted average of 3 years',
    specialRules: [
      'Current year days count fully',
      '1/3 of prior year days count',
      '1/6 of second prior year days count',
      'Total must be ≥183 days',
    ],
  },
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    residencyThreshold: 183,
    testType: 'statutory-residence',
    description: 'Statutory Residence Test with automatic overseas and UK tests',
    specialRules: [
      '183+ days = automatic UK resident',
      'Complex tie-breaker rules apply',
      'Consider available accommodation',
      'Family and work ties matter',
    ],
  },
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    residencyThreshold: 183,
    testType: 'physical-presence',
    description: '183-day rule with habitual abode consideration',
    specialRules: [
      '183+ days = tax resident',
      'Habitual abode can trigger residency',
      'Registration (Anmeldung) creates obligations',
      'Double tax treaties may apply',
    ],
  },
  PT: {
    countryCode: 'PT',
    countryName: 'Portugal',
    residencyThreshold: 183,
    testType: 'physical-presence',
    description: '183-day rule with NHR regime available',
    specialRules: [
      '183+ days = tax resident',
      'NHR regime: 10-year tax benefits',
      'Habitual residence also triggers residency',
      'Remote workers may qualify for NHR',
    ],
  },
  TH: {
    countryCode: 'TH',
    countryName: 'Thailand',
    residencyThreshold: 180,
    testType: 'physical-presence',
    description: '180-day rule (note: lower than most countries)',
    specialRules: [
      '180+ days = tax resident',
      'Foreign income taxed if remitted',
      'New 2024 rules on foreign income',
      'Consider LTR visa for tax benefits',
    ],
  },
  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    residencyThreshold: 183,
    testType: 'physical-presence',
    description: '183-day rule with economic interests consideration',
    specialRules: [
      '183+ days = tax resident',
      'Main economic activities trigger residency',
      'Beckham Law for certain workers',
      'Wealth tax applies to residents',
    ],
  },
  NL: {
    countryCode: 'NL',
    countryName: 'Netherlands',
    residencyThreshold: 183,
    testType: 'facts-circumstances',
    description: 'Facts and circumstances test, no strict day count',
    specialRules: [
      'No automatic 183-day rule',
      'Permanent home location matters',
      'Economic and social ties considered',
      '30% ruling for expats',
    ],
  },
  SG: {
    countryCode: 'SG',
    countryName: 'Singapore',
    residencyThreshold: 183,
    testType: 'physical-presence',
    description: '183-day rule with territorial taxation',
    specialRules: [
      '183+ days = tax resident',
      'Foreign income generally not taxed',
      'No capital gains tax',
      'Employment income taxed regardless',
    ],
  },
}

// Default rule for countries not in our database
const DEFAULT_TAX_RULE: Omit<CountryTaxRule, 'countryCode' | 'countryName'> = {
  residencyThreshold: TAX_THRESHOLDS.DEFAULT_RESIDENCY_DAYS,
  testType: 'physical-presence',
  description: 'Standard 183-day physical presence test',
  specialRules: [
    '183+ days typically triggers tax residency',
    'Consult local tax authority for specifics',
    'Double tax treaties may apply',
  ],
}

export function getCountryTaxRule(countryCode: string, countryName: string): CountryTaxRule {
  return (
    COUNTRY_TAX_RULES[countryCode] || {
      ...DEFAULT_TAX_RULE,
      countryCode,
      countryName,
    }
  )
}

export function calculateResidencyStatus(
  countryCode: string,
  countryName: string,
  daysSpent: number,
  year: number = new Date().getFullYear(),
  priorYearDays: number = 0,
  secondPriorYearDays: number = 0
): ResidencyResult {
  const rule = getCountryTaxRule(countryCode, countryName)
  let threshold = rule.residencyThreshold

  // Default to simple day counting; override for US Substantial Presence Test
  let effectiveDays = daysSpent
  let percentageOfThreshold = Math.min(100, Math.round((effectiveDays / threshold) * 100))
  let isResident = effectiveDays >= threshold
  let daysRemaining = Math.max(0, threshold - effectiveDays)

  let riskLevel: ResidencyResult['riskLevel']
  if (isResident) {
    riskLevel = 'resident'
  } else if (percentageOfThreshold >= 90) {
    riskLevel = 'high'
  } else if (percentageOfThreshold >= 70) {
    riskLevel = 'medium'
  } else {
    riskLevel = 'low'
  }

  const warnings: string[] = []
  const recommendations: string[] = []

  if (countryCode === 'US') {
    const spt = calculateUSSubstantialPresence(daysSpent, priorYearDays, secondPriorYearDays)

    effectiveDays = spt.totalDays
    threshold = rule.residencyThreshold
    isResident = spt.meetsThreshold
    percentageOfThreshold = Math.min(100, Math.round((effectiveDays / threshold) * 100))
    daysRemaining = Math.max(0, threshold - effectiveDays)
    riskLevel = isResident
      ? 'resident'
      : percentageOfThreshold >= 90
        ? 'high'
        : percentageOfThreshold >= 70
          ? 'medium'
          : 'low'

    warnings.push(
      `Substantial Presence Test weighted total: ${effectiveDays} days (current year: ${spt.breakdown.currentYear}, prior year weighted: ${spt.breakdown.priorYear}, second prior weighted: ${spt.breakdown.secondPriorYear}).`
    )

    if (daysSpent < 31) {
      warnings.push(
        'You have fewer than 31 days in the current year, so the Substantial Presence Test is not met even if the weighted total exceeds 183.'
      )
    }

    if (!isResident && priorYearDays === 0 && secondPriorYearDays === 0) {
      recommendations.push(
        'Add prior-year day totals to improve accuracy for the US Substantial Presence Test.'
      )
    }
  }

  if (isResident) {
    warnings.push(`You have exceeded the ${threshold}-day threshold and are likely a tax resident.`)
    warnings.push('Consult a tax professional to understand your obligations.')
  } else if (riskLevel === 'high') {
    warnings.push(`Only ${daysRemaining} days remaining before potential tax residency.`)
    warnings.push('Consider limiting further time in this country.')
  } else if (riskLevel === 'medium') {
    warnings.push(`${daysRemaining} days remaining - monitor your travel carefully.`)
  }

  if (isResident) {
    recommendations.push('Review double tax treaty provisions between countries.')
    recommendations.push('Consider consulting with a tax professional.')
    recommendations.push('Gather documentation of your tax situation.')
  } else {
    recommendations.push(`Keep trips under ${daysRemaining} more days to avoid residency.`)
    if (rule.specialRules.length > 0) {
      recommendations.push(`Note: ${rule.specialRules[0]}`);
    }
  }

  return {
    countryCode,
    countryName,
    year,
    daysSpent: effectiveDays,
    threshold,
    isResident,
    daysRemaining,
    percentageOfThreshold,
    riskLevel,
    warnings,
    recommendations,
    taxRule: rule,
  }
}

export function calculateMultipleResidencies(
  trips: TripRecord[],
  year: number = new Date().getFullYear()
): ResidencyResult[] {
  // Group trips by country
  const countryDays = new Map<string, { name: string; days: number }>()

  trips
    .filter((trip) => new Date(trip.startDate).getFullYear() === year)
    .forEach((trip) => {
      const existing = countryDays.get(trip.countryCode)
      if (existing) {
        existing.days += trip.days
      } else {
        countryDays.set(trip.countryCode, {
          name: trip.countryName,
          days: trip.days,
        })
      }
    })

  // Calculate residency for each country
  const results: ResidencyResult[] = []
  countryDays.forEach((data, code) => {
    results.push(calculateResidencyStatus(code, data.name, data.days, year))
  })

  // Sort by risk level (resident first, then high, medium, low)
  const riskOrder = { resident: 0, high: 1, medium: 2, low: 3 }
  return results.sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel])
}

// US-specific Substantial Presence Test calculation
export function calculateUSSubstantialPresence(
  currentYearDays: number,
  priorYearDays: number,
  secondPriorYearDays: number
): {
  totalDays: number
  meetsThreshold: boolean
  breakdown: {
    currentYear: number
    priorYear: number
    secondPriorYear: number
  }
} {
  const weightedTotal =
    currentYearDays +
    Math.floor(priorYearDays / 3) +
    Math.floor(secondPriorYearDays / 6)

  return {
    totalDays: weightedTotal,
    meetsThreshold: currentYearDays >= 31 && weightedTotal >= 183,
    breakdown: {
      currentYear: currentYearDays,
      priorYear: Math.floor(priorYearDays / 3),
      secondPriorYear: Math.floor(secondPriorYearDays / 6),
    },
  }
}
