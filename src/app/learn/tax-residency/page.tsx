import { Metadata } from "next";
import { ArticleLayout } from "../_components/ArticleLayout";

export const metadata: Metadata = {
  title:
    "Tax Residency Explained: Where Do You Actually Owe Taxes? | NomadTaxPlanner",
  description:
    "Understand the rules of tax residency, including the 183-day rule, center of vital interests, and how to avoid becoming a tax resident by accident.",
};

export default function TaxResidencyPage() {
  return (
    <ArticleLayout
      title="Tax Residency Explained: Where Do You Actually Owe Taxes?"
      description="Tax residency is the single most important concept for digital nomads. Here is how it works and how to manage it."
      lastUpdated="December 2024"
      readTime="7 min read"
      featuredImageSearch="https://oxnbbm6ljoyuzqns.public.blob.vercel-storage.com/passport-travel-world-map-globe/9l0N1zyo_sA.jpg"
      featuredImageAlt="Passport and world map representing tax residency"
    >
      <h2>What is Tax Residency?</h2>
      <p>
        Tax residency is a legal status that determines which country has the
        primary right to tax your income. Unlike immigration residency (which
        gives you the right to enter and stay), tax residency creates an
        obligation to pay.
      </p>
      <p>
        It is possible to be a tax resident of a country without being a
        permanent resident or citizen. Conversely, it is possible (though
        difficult) to be a tax resident of nowhere.
      </p>

      <h2>How is Tax Residency Determined?</h2>
      <p>
        Different countries use different tests. Here are the three most common
        methods:
      </p>

      <h3>1. The Physical Presence Test (Days Test)</h3>
      <p>This is the simplest and most common rule.</p>
      <ul>
        <li>
          <strong>The Rule:</strong> If you spend more than X days in the
          country, you are a resident.
        </li>
        <li>
          <strong>Common Threshold:</strong> 183 days is the standard (UK,
          Canada, Australia, most of EU).
        </li>
        <li>
          <strong>Exceptions:</strong> Some countries have shorter periods
          (e.g., Cyprus is 60 days under certain conditions; Switzerland can be
          90 days if you work).
        </li>
      </ul>

      <h3>2. The Center of Vital Interests</h3>
      <p>
        Even if you spend less than 183 days, you can still be deemed a resident
        if your &quot;center of life&quot; is there.
      </p>
      <p>Factors include:</p>
      <ul>
        <li>Where your spouse and children live.</li>
        <li>
          Where your permanent home is available (owned or rented long-term).
        </li>
        <li>
          Where your economic interests are (bank accounts, investments, main
          business).
        </li>
        <li>Where you belong to social clubs or have health insurance.</li>
      </ul>
      <p>
        <em>Example:</em> You spend 100 days in Spain, but your wife and kids
        live there, and you own a house there. Spain will likely consider you a
        tax resident.
      </p>

      <h3>3. The Statutory Residence Test (SRT)</h3>
      <p>
        Some countries, like the UK, have a complex points-based system. It
        combines the number of days spent with the number of &quot;ties&quot;
        you have to the country. The more ties you have (family, work,
        accommodation), the fewer days you can spend before becoming a resident.
      </p>

      <h2>Dual Tax Residency</h2>
      <p>
        It is possible to meet the residency criteria for two countries at the
        same time. For example, you are a US citizen (always a resident) but you
        live in Germany for 200 days (German resident).
      </p>
      <p>
        In this case, <strong>Double Taxation Treaties</strong> come into play.
        These treaties have &quot;tie-breaker&quot; rules to decide which
        country claims you as a resident. Usually, it goes in this order:
      </p>
      <ol>
        <li>Where do you have a permanent home available?</li>
        <li>Where is your center of vital interests?</li>
        <li>Where is your habitual abode (where do you usually live)?</li>
        <li>What is your nationality?</li>
      </ol>

      <h2>How to Check Your Status</h2>
      <p>
        Don&apos;t guess. Use our free{" "}
        <a href="/tools/tax-residency-checker">Tax Residency Checker</a> to get
        a preliminary assessment of your situation based on your travel
        patterns.
      </p>
    </ArticleLayout>
  );
}
