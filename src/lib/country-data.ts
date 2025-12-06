import { CountryGuide, CountryTaxInfo } from "@/types";

export const COUNTRY_GUIDES: Record<string, CountryGuide> = {
  us: {
    code: "US",
    name: "United States",
    slug: "united-states",
    flag: "🇺🇸",
    region: "North America",
    residencyThreshold: 183,
    currency: "USD",
    language: "English",
    specialPrograms: ["FEIE", "Foreign Tax Credit"],
    lastUpdated: "2024-12-01",
    image:
      "https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/new-york-city-usa-travel/mCa2vfvRrZc.jpg",
  },
  gb: {
    code: "GB",
    name: "United Kingdom",
    slug: "united-kingdom",
    flag: "🇬🇧",
    region: "Europe",
    residencyThreshold: 183,
    currency: "GBP",
    language: "English",
    specialPrograms: ["Non-Domiciled Status", "Overseas Workday Relief"],
    lastUpdated: "2024-12-01",
    image:
      "https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/london-england-city-travel/Is8mhAfMKAc.jpg",
  },
  de: {
    code: "DE",
    name: "Germany",
    slug: "germany",
    flag: "🇩🇪",
    region: "Europe",
    residencyThreshold: 183,
    currency: "EUR",
    language: "German",
    specialPrograms: ["Freelancer Visa"],
    lastUpdated: "2024-12-01",
    image:
      "https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/berlin-germany-city-travel/BjVCS9StICI.jpg",
  },
  pt: {
    code: "PT",
    name: "Portugal",
    slug: "portugal",
    flag: "🇵🇹",
    region: "Europe",
    residencyThreshold: 183,
    currency: "EUR",
    language: "Portuguese",
    specialPrograms: [
      "NHR (Non-Habitual Resident)",
      "D7 Visa",
      "Digital Nomad Visa",
    ],
    lastUpdated: "2024-12-01",
    image:
      "https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/lisbon-portugal-city-travel/7ft9L_LaSLw.jpg",
  },
  th: {
    code: "TH",
    name: "Thailand",
    slug: "thailand",
    flag: "🇹🇭",
    region: "Southeast Asia",
    residencyThreshold: 180,
    currency: "THB",
    language: "Thai",
    specialPrograms: ["LTR Visa", "Thailand Elite Visa"],
    lastUpdated: "2024-12-01",
    image:
      "https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/bangkok-thailand-city-travel/wGB96b2nb0c.jpg",
  },
};

export const COUNTRY_TAX_INFO: Record<string, CountryTaxInfo> = {
  us: {
    overview:
      "The United States taxes its citizens and resident aliens on worldwide income, regardless of where they live. US expats have special provisions like the Foreign Earned Income Exclusion (FEIE) and Foreign Tax Credit to reduce or eliminate double taxation.",
    residencyRules: [
      "US citizens are taxed on worldwide income regardless of residence",
      "Green card holders are treated as tax residents",
      "Substantial Presence Test: 31 days in current year AND 183 days weighted over 3 years",
      "Tax treaties may modify residency rules",
    ],
    taxRates: [
      {
        type: "Income Tax",
        rate: "10% - 37%",
        description: "Progressive federal tax brackets",
      },
      {
        type: "Self-Employment",
        rate: "15.3%",
        description: "Social Security and Medicare taxes",
      },
      {
        type: "Capital Gains",
        rate: "0% - 20%",
        description: "Long-term capital gains rates",
      },
      { type: "State Tax", rate: "0% - 13.3%", description: "Varies by state" },
    ],
    specialPrograms: [
      {
        name: "Foreign Earned Income Exclusion (FEIE)",
        description:
          "Exclude up to $126,500 (2024) of foreign earned income from US tax",
        eligibility: [
          "US citizen or resident alien",
          "Tax home in foreign country",
          "Meet Physical Presence or Bona Fide Residence test",
        ],
        benefits: [
          "Exclude foreign earned income up to annual limit",
          "Additional housing exclusion available",
          "Can significantly reduce or eliminate US tax liability",
        ],
      },
      {
        name: "Foreign Tax Credit",
        description: "Credit for taxes paid to foreign governments",
        eligibility: [
          "Paid or accrued foreign income tax",
          "Tax must be legal and actual foreign tax liability",
          "Cannot be used on FEIE-excluded income",
        ],
        benefits: [
          "Dollar-for-dollar credit against US tax",
          "Excess credits can be carried forward/back",
          "Useful for income above FEIE limit",
        ],
      },
    ],
    filingRequirements: [
      "Annual tax return (Form 1040) required for all citizens",
      "Form 2555 for FEIE claims",
      "FBAR (FinCEN 114) if foreign accounts exceed $10,000",
      "Form 8938 (FATCA) for specified foreign financial assets",
      "Filing deadline: June 15 (automatic extension for expats), October 15 with extension",
    ],
    doubleTaxationTreaties: [
      "UK",
      "Germany",
      "France",
      "Canada",
      "Japan",
      "Australia",
      "Netherlands",
      "Switzerland",
      "Spain",
      "Italy",
      "Portugal",
      "Thailand",
    ],
    remoteWorkRules: [
      "US source income taxable regardless of location",
      "Work location determines income source for services",
      "FEIE only applies to foreign-sourced earned income",
      "Digital nomads must track work locations carefully",
    ],
    faqs: [
      {
        question: "Do I need to file US taxes if I live abroad?",
        answer:
          "Yes, US citizens and green card holders must file US taxes regardless of where they live, if their income exceeds filing thresholds.",
      },
      {
        question: "Can I use both FEIE and Foreign Tax Credit?",
        answer:
          "You can use both, but not on the same income. The Foreign Tax Credit is typically used for income above the FEIE limit or for passive income.",
      },
      {
        question: "What is the Substantial Presence Test?",
        answer:
          "A formula to determine tax residency: be present 31+ days in current year AND have 183+ days when counting current year fully, prior year at 1/3, and second prior year at 1/6.",
      },
    ],
  },
  gb: {
    overview:
      "The UK uses the Statutory Residence Test (SRT) to determine tax residency. Non-residents are only taxed on UK-source income. The UK offers favorable treatment for non-domiciled individuals.",
    residencyRules: [
      "Statutory Residence Test (SRT) determines residency",
      "Automatic UK tests: 183+ days, only home in UK, full-time work in UK",
      "Automatic overseas tests: Less than 16 days (previously resident) or 46 days",
      "Sufficient ties test for borderline cases",
    ],
    taxRates: [
      {
        type: "Income Tax",
        rate: "20% - 45%",
        description: "Basic (20%), Higher (40%), Additional (45%)",
      },
      {
        type: "National Insurance",
        rate: "12% / 2%",
        description: "Employee contributions",
      },
      {
        type: "Capital Gains",
        rate: "10% - 20%",
        description: "Basic rate 10%, Higher rate 20%",
      },
      {
        type: "Dividend Tax",
        rate: "8.75% - 39.35%",
        description: "Depends on income band",
      },
    ],
    specialPrograms: [
      {
        name: "Non-Domiciled Status",
        description:
          "UK residents not domiciled in UK can use remittance basis of taxation",
        eligibility: [
          "UK resident but not UK domiciled",
          "Must claim remittance basis",
          "Annual charge applies after 7 years of residence",
        ],
        benefits: [
          "Only UK income and gains taxed",
          "Foreign income/gains only taxed when remitted to UK",
          "Useful for those with significant foreign income",
        ],
      },
      {
        name: "Overseas Workday Relief",
        description:
          "Reduce UK tax on employment income for non-domiciled individuals",
        eligibility: [
          "Non-UK domiciled",
          "Claiming remittance basis",
          "Working partly outside the UK",
        ],
        benefits: [
          "Portion of salary for overseas work not taxed if not remitted",
          "Available for first 3 years of UK residence",
        ],
      },
    ],
    filingRequirements: [
      "Self Assessment if self-employed or complex affairs",
      "Tax year: April 6 to April 5",
      "Online filing deadline: January 31 following tax year",
      "Payment on Account may be required",
    ],
    doubleTaxationTreaties: [
      "USA",
      "Germany",
      "France",
      "Spain",
      "Portugal",
      "Italy",
      "Australia",
      "Canada",
      "Singapore",
      "Hong Kong",
      "Thailand",
      "UAE",
    ],
    remoteWorkRules: [
      "Work location determines where income is taxed",
      "UK workdays create UK tax liability",
      "Non-dom status can help with foreign workdays",
      "Consider split contracts for international roles",
    ],
    faqs: [
      {
        question: "What is the Statutory Residence Test?",
        answer:
          "The SRT is a series of tests that determine UK tax residency based on days spent in the UK, connections to the UK, and work patterns.",
      },
      {
        question:
          "How many days can I spend in the UK without becoming resident?",
        answer:
          "It depends on your ties to the UK. With no ties, up to 182 days. With many ties, as few as 16-45 days could trigger residency.",
      },
    ],
  },
  de: {
    overview:
      "Germany taxes residents on worldwide income. Tax residency is established by having a residence or habitual abode in Germany. The tax system is known for its complexity and high rates.",
    residencyRules: [
      "183-day rule for tax residency",
      "Having a residence (Wohnsitz) triggers unlimited tax liability",
      "Habitual abode (gewöhnlicher Aufenthalt) also triggers residency",
      "Registration requirement (Anmeldung) within 2 weeks of moving",
    ],
    taxRates: [
      {
        type: "Income Tax",
        rate: "14% - 45%",
        description: "Progressive rates with solidarity surcharge",
      },
      {
        type: "Solidarity Surcharge",
        rate: "5.5%",
        description: "On income tax for high earners",
      },
      {
        type: "Church Tax",
        rate: "8-9%",
        description: "On income tax if member of recognized church",
      },
      {
        type: "Trade Tax",
        rate: "7% - 17%",
        description: "For business income, varies by municipality",
      },
    ],
    specialPrograms: [
      {
        name: "Freelancer Visa (Freiberufler)",
        description:
          "Visa for self-employed professionals in liberal professions",
        eligibility: [
          "Qualification in recognized liberal profession",
          "Proof of clients/contracts",
          "Sufficient health insurance",
          "Adequate financial means",
        ],
        benefits: [
          "Legal residence and work permit",
          "No employer sponsorship needed",
          "Path to permanent residence",
        ],
      },
    ],
    filingRequirements: [
      "Annual tax return (Steuererklärung) required for most",
      "Tax year is calendar year",
      "Filing deadline: July 31 (with tax advisor: end of February next year)",
      "ELSTER online system for electronic filing",
    ],
    doubleTaxationTreaties: [
      "USA",
      "UK",
      "France",
      "Spain",
      "Portugal",
      "Italy",
      "Netherlands",
      "Switzerland",
      "Austria",
      "Thailand",
      "Singapore",
      "Australia",
    ],
    remoteWorkRules: [
      "Registration creates tax and social security obligations",
      "Freelancers must register business with Finanzamt",
      "VAT registration may be required",
      "Social security depends on employment status",
    ],
    faqs: [
      {
        question: "Do I need to register (Anmeldung) as a digital nomad?",
        answer:
          "If you stay more than 3 months and have a fixed address, you must register. This registration can establish tax residency.",
      },
      {
        question: "What is the difference between Freiberufler and Gewerbe?",
        answer:
          "Freiberufler are liberal professionals (consultants, artists, etc.) with simpler tax treatment. Gewerbe is commercial business subject to trade tax.",
      },
    ],
  },
  pt: {
    overview:
      "Portugal offers the Non-Habitual Resident (NHR) regime, making it attractive for digital nomads and retirees. Standard residents are taxed on worldwide income at progressive rates.",
    residencyRules: [
      "183-day rule for tax residency",
      "Having a habitual residence triggers residency",
      "Intention to maintain and occupy a property as residence",
      "Registration with tax authority required",
    ],
    taxRates: [
      {
        type: "Income Tax",
        rate: "14.5% - 48%",
        description: "Progressive rates for residents",
      },
      {
        type: "NHR Rate",
        rate: "20%",
        description: "Flat rate for qualifying employment income",
      },
      {
        type: "Capital Gains",
        rate: "28%",
        description: "Standard rate, 50% exemption available",
      },
      {
        type: "Social Security",
        rate: "11%",
        description: "Employee contribution",
      },
    ],
    specialPrograms: [
      {
        name: "Non-Habitual Resident (NHR)",
        description:
          "10-year tax regime with favorable rates for new residents",
        eligibility: [
          "Become Portuguese tax resident",
          "Not tax resident in Portugal in prior 5 years",
          "Register with tax authority",
        ],
        benefits: [
          "20% flat tax on Portuguese-source employment income from high-value activities",
          "Potential exemption on foreign-source income",
          "Available for 10 years",
        ],
      },
      {
        name: "Digital Nomad Visa",
        description: "Visa for remote workers employed outside Portugal",
        eligibility: [
          "Employment contract with foreign company",
          "Minimum income of 4x Portuguese minimum wage",
          "Proof of accommodation",
        ],
        benefits: [
          "Legal residence in Portugal",
          "Schengen area travel",
          "Path to NHR status",
          "Family reunification possible",
        ],
      },
      {
        name: "D7 Visa (Passive Income)",
        description:
          "Visa for those with passive income (retirement, investments)",
        eligibility: [
          "Sufficient passive income (€760+/month)",
          "Clean criminal record",
          "Health insurance",
          "Accommodation proof",
        ],
        benefits: [
          "Legal residence in Portugal",
          "Can work remotely",
          "Path to citizenship after 5 years",
        ],
      },
    ],
    filingRequirements: [
      "Annual tax return (IRS) required",
      "Tax year is calendar year",
      "Filing deadline: June 30",
      "Online submission through Portal das Finanças",
    ],
    doubleTaxationTreaties: [
      "USA",
      "UK",
      "Germany",
      "France",
      "Spain",
      "Brazil",
      "Netherlands",
      "Switzerland",
      "Canada",
      "Australia",
      "Thailand",
    ],
    remoteWorkRules: [
      "Digital Nomad Visa specifically for remote workers",
      "NHR can benefit foreign-source income",
      "Social security coordination with EU countries",
      "Consider A1 certificate for EU social security",
    ],
    faqs: [
      {
        question: "Is the NHR regime still available?",
        answer:
          "The NHR regime has been modified. New applicants from 2024 may face different rules. Check current legislation for the latest requirements.",
      },
      {
        question: "Can I work remotely on the D7 visa?",
        answer:
          "Yes, the D7 visa allows remote work for foreign employers, though its primary purpose is for passive income recipients.",
      },
    ],
  },
  th: {
    overview:
      "Thailand taxes residents on Thai-source income and foreign income remitted to Thailand. With the 2024 tax changes, foreign income remitted in the same year it was earned is now taxable.",
    residencyRules: [
      "180-day rule (lower than most countries)",
      "Days counted within a calendar year",
      "Tax residency resets each year",
      "No tie-breaker rules for dual residency",
    ],
    taxRates: [
      {
        type: "Income Tax",
        rate: "0% - 35%",
        description: "Progressive rates, first 150k THB exempt",
      },
      {
        type: "Capital Gains",
        rate: "0% - 35%",
        description: "Included in income tax",
      },
      {
        type: "Withholding Tax",
        rate: "10% - 15%",
        description: "On various payment types",
      },
      {
        type: "Social Security",
        rate: "5%",
        description: "Capped at 750 THB/month",
      },
    ],
    specialPrograms: [
      {
        name: "Long-Term Resident (LTR) Visa",
        description: "10-year visa with significant tax benefits",
        eligibility: [
          "Categories: Wealthy Global Citizens, Wealthy Pensioners, Work-from-Thailand Professionals, Highly-Skilled Professionals",
          "Income/asset requirements vary by category",
          "Health insurance requirement",
        ],
        benefits: [
          "17% flat tax on Thai employment income",
          "Exemption from foreign income taxation",
          "10-year renewable visa",
          "Work permit included",
          "No 90-day reporting",
        ],
      },
      {
        name: "Thailand Elite Visa",
        description: "Premium visa program for long-term stay",
        eligibility: [
          "Pay membership fee (600,000 - 2,000,000 THB)",
          "Clean criminal record",
          "No work permit included",
        ],
        benefits: [
          "5-20 year visa depending on package",
          "VIP airport services",
          "No proof of income required",
          "Multiple entries",
        ],
      },
    ],
    filingRequirements: [
      "Annual tax return if income exceeds threshold",
      "Tax year is calendar year",
      "Filing deadline: March 31",
      "Online filing available through RD Smart Tax",
    ],
    doubleTaxationTreaties: [
      "USA",
      "UK",
      "Germany",
      "France",
      "Japan",
      "Australia",
      "Singapore",
      "Hong Kong",
      "Malaysia",
      "Vietnam",
      "China",
    ],
    remoteWorkRules: [
      "2024 changes: foreign income remitted same year now taxable",
      "LTR visa provides exemption from foreign income tax",
      "Work permit generally required for working in Thailand",
      "Digital nomads without work permit in gray area legally",
    ],
    faqs: [
      {
        question: "What are the 2024 Thailand tax changes?",
        answer:
          "From 2024, foreign income remitted to Thailand in the same year it was earned is taxable. Previously, only income remitted in a subsequent year was taxable. The LTR visa provides an exemption from this rule.",
      },
      {
        question: "Can digital nomads work legally in Thailand?",
        answer:
          "Technically, working in Thailand requires a work permit. The LTR visa includes a digital work permit. The Thailand Elite visa does not include work permission.",
      },
    ],
  },
};

export function getCountryGuide(code: string): CountryGuide | undefined {
  return COUNTRY_GUIDES[code.toLowerCase()];
}

export function getCountryTaxInfo(code: string): CountryTaxInfo | undefined {
  return COUNTRY_TAX_INFO[code.toLowerCase()];
}

export function getAllCountryGuides(): CountryGuide[] {
  return Object.values(COUNTRY_GUIDES);
}
