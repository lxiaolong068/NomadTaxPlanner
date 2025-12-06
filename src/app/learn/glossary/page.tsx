import { Metadata } from "next";
import { ArticleLayout } from "../_components/ArticleLayout";

export const metadata: Metadata = {
  title: "Digital Nomad Tax Glossary | NomadTaxPlanner",
  description:
    "Confused by tax acronyms? A comprehensive glossary of digital nomad tax terms: FEIE, FATCA, CRS, NHR, and more.",
};

const terms = [
  {
    term: "183-Day Rule",
    definition:
      "A common standard used by countries to determine tax residency. Generally, if you spend more than 183 days in a country within a tax year, you become a tax resident.",
  },
  {
    term: "Center of Vital Interests",
    definition:
      "A test used to determine tax residency based on personal and economic ties (family, home, bank accounts) rather than just days spent.",
  },
  {
    term: "CFC Rules (Controlled Foreign Corporation)",
    definition:
      "Anti-avoidance laws that allow a country to tax its residents on the income earned by a foreign company they control, even if that income hasn't been distributed.",
  },
  {
    term: "CRS (Common Reporting Standard)",
    definition:
      "A global standard for the automatic exchange of financial account information between tax authorities to fight tax evasion. Banks share your data with your country of residence.",
  },
  {
    term: "DTA (Double Taxation Agreement)",
    definition:
      "A treaty between two countries to prevent the same income from being taxed twice. It decides which country has the primary right to tax.",
  },
  {
    term: "Expat (Expatriate)",
    definition:
      "A person who lives outside their native country. In tax terms, often used interchangeably with migrant or non-resident.",
  },
  {
    term: "FATCA (Foreign Account Tax Compliance Act)",
    definition:
      "A US law requiring foreign financial institutions to report the assets of US citizens to the IRS. It makes it harder for Americans to open bank accounts abroad.",
  },
  {
    term: "FBAR (Foreign Bank Account Report)",
    definition:
      "A form (FinCEN Form 114) that US persons must file if the aggregate value of their foreign financial accounts exceeds $10,000 at any time during the year.",
  },
  {
    term: "FEIE (Foreign Earned Income Exclusion)",
    definition:
      "A US tax provision allowing qualifying citizens living abroad to exclude a certain amount of foreign earned income (approx. $126k in 2024) from US federal income tax.",
  },
  {
    term: "FTC (Foreign Tax Credit)",
    definition:
      "A non-refundable tax credit for income taxes paid to a foreign government. It reduces your home country tax liability dollar-for-dollar.",
  },
  {
    term: "NHR (Non-Habitual Resident)",
    definition:
      "A special Portuguese tax regime (now reformed) offering reduced tax rates for new residents for 10 years.",
  },
  {
    term: "Nomad Visa",
    definition:
      "A temporary residence permit allowing foreigners to live in a country while working remotely for a foreign employer. It may or may not create tax residency.",
  },
  {
    term: "Permanent Establishment (PE)",
    definition:
      "A fixed place of business that triggers corporate tax liability in a country. Working from a home office for a foreign company can sometimes create a PE.",
  },
  {
    term: "Tax Home",
    definition:
      "The general area of your main place of business, employment, or post of duty, regardless of where you maintain your family home. Crucial for US FEIE eligibility.",
  },
  {
    term: "Territorial Tax System",
    definition:
      "A tax system where a country only taxes income earned within its borders. Foreign-sourced income is typically tax-free for residents.",
  },
  {
    term: "Worldwide Tax System",
    definition:
      "A tax system where residents are taxed on their income from all sources, domestic and foreign.",
  },
];

export default function GlossaryPage() {
  return (
    <ArticleLayout
      title="Digital Nomad Tax Glossary"
      description="Tax law is full of confusing acronyms. Here is your cheat sheet to speaking the language of international taxation."
      lastUpdated="December 2024"
      readTime="10 min read"
      featuredImageSearch="https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/dictionary-book-definitions/G0FTNFRwb4w.jpg"
      featuredImageAlt="Dictionary book representing tax terminology"
    >
      <div className="space-y-8">
        {terms.map((item, index) => (
          <div key={index} className="border-b pb-6 last:border-0">
            <h3 className="text-xl font-bold text-primary mb-2">{item.term}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </ArticleLayout>
  );
}
