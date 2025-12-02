import { Metadata } from "next";
import { ArticleLayout } from "../_components/ArticleLayout";

export const metadata: Metadata = {
    title: "How to Avoid Double Taxation: A Guide to Tax Treaties | NomadTaxPlanner",
    description:
        "Don't pay tax twice on the same income. Learn how Double Taxation Treaties, Foreign Tax Credits, and exemptions work for digital nomads.",
};

export default function DoubleTaxationPage() {
    return (
        <ArticleLayout
            title="How to Avoid Double Taxation: A Guide to Tax Treaties"
            description="Paying taxes is painful. Paying them twice is a tragedy. Learn how to protect your income using international treaties."
            lastUpdated="December 2024"
            readTime="8 min read"
        >
            <h2>What is Double Taxation?</h2>
            <p>
                Double taxation occurs when two different countries claim the right to tax the same income. This typically happens to digital nomads in two scenarios:
            </p>
            <ul>
                <li>
                    <strong>Residency-Residency Conflict:</strong> You are considered a tax resident of two countries simultaneously (e.g., you live in Spain but haven&apos;t officially left the UK).
                </li>
                <li>
                    <strong>Residency-Source Conflict:</strong> You are a resident of Country A, but you earn income from Country B, and both want to tax that income.
                </li>
            </ul>

            <h2>The Solution: Double Taxation Treaties (DTA)</h2>
            <p>
                Most countries have signed bilateral agreements called Double Taxation Agreements (DTAs) to prevent this. These treaties override national laws and determine which country has the primary taxing right.
            </p>

            <h3>Key Mechanisms to Relieve Double Tax</h3>

            <h4>1. Exemption Method</h4>
            <p>
                The country of residence agrees to <strong>exempt</strong> (ignore) income that has already been taxed in the source country.
            </p>
            <p>
                <em>Example:</em> You live in Germany but earn rental income from France. The treaty might say France has the right to tax property income. Germany will then exempt that income from your German tax bill (though it might still use it to calculate your tax bracket).
            </p>

            <h4>2. Credit Method (Foreign Tax Credit)</h4>
            <p>
                Your country of residence taxes your worldwide income but gives you a <strong>credit</strong> for taxes paid abroad.
            </p>
            <p>
                <em>Example:</em> You are a US citizen living in Portugal.
                <br />
                - You earn $100,000.
                <br />
                - You pay $20,000 tax to Portugal.
                <br />
                - The US calculates your tax as $22,000.
                <br />
                - You use the $20,000 Portuguese tax as a credit.
                <br />
                - You only owe the US the difference: $2,000.
            </p>
            <p>
                If the foreign tax is higher than the home tax, you usually pay nothing to your home country (but you don&apos;t get a refund for the excess).
            </p>

            <h4>3. Deduction Method</h4>
            <p>
                This is the least favorable. You simply deduct the foreign tax paid from your taxable income, treating it like an expense. This rarely eliminates double taxation completely.
            </p>

            <h2>For US Citizens: FEIE vs. FTC</h2>
            <p>
                Americans have a unique tool called the <strong>Foreign Earned Income Exclusion (FEIE)</strong>. This allows you to exclude the first ~$126,500 (2024) of active earned income from US tax completely, provided you meet residency tests.
            </p>
            <p>
                <strong>Which is better?</strong>
            </p>
            <ul>
                <li>
                    <strong>Use FEIE if:</strong> You live in a low-tax or zero-tax country (e.g., Dubai). You wipe out your US tax bill and pay 0% locally.
                </li>
                <li>
                    <strong>Use FTC (Foreign Tax Credit) if:</strong> You live in a high-tax country (e.g., UK, Germany). Since their rates are higher than the US, the credits will likely reduce your US tax to zero, and you can carry forward excess credits.
                </li>
            </ul>

            <h2>Action Steps</h2>
            <p>
                1. Check if your home country has a treaty with your destination country.
                <br />
                2. Obtain a <strong>Certificate of Tax Residency</strong> from your new home country to prove to your old country that you are paying taxes elsewhere.
                <br />
                3. Never assume &quot;automatic&quot; relief. You usually have to file forms to claim treaty benefits.
            </p>
        </ArticleLayout>
    );
}
