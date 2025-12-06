"use client";

import { useState, useMemo, useCallback } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  MapPin,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ALL_COUNTRIES, SUPPORTED_COUNTRIES } from "@/lib/constants";
import {
  CURRENT_YEAR,
  getYearOptions,
  getCountryOptions,
  getCountryFlag,
  getRiskBadgeVariant,
  getRiskLabel,
  getRiskProgressClass,
  getRiskAriaLabel,
} from "@/lib/form-utils";
import { calculateResidencyStatus } from "@/lib/calculations/tax-residency";
import { ResidencyResult } from "@/types";

interface CountryEntry {
  id: string;
  countryCode: string;
  countryName: string;
  days: number;
  priorYearDays?: number;
  secondPriorYearDays?: number;
}

/** Maximum days in a year (accounting for leap years) */
const MAX_DAYS_IN_YEAR = 366;

export function TaxResidencyChecker() {
  const [year, setYear] = useState(CURRENT_YEAR);
  const [entries, setEntries] = useState<CountryEntry[]>([
    {
      id: "1",
      countryCode: "",
      countryName: "",
      days: 0,
      priorYearDays: 0,
      secondPriorYearDays: 0,
    },
  ]);
  const [results, setResults] = useState<ResidencyResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Memoized options - only compute once
  const countryOptions = useMemo(() => getCountryOptions(), []);
  const yearOptions = useMemo(() => getYearOptions(5), []);

  // Check if any results indicate residency
  const hasResidentResults = useMemo(
    () => results.some((r) => r.isResident),
    [results],
  );

  const addEntry = useCallback(() => {
    setEntries((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        countryCode: "",
        countryName: "",
        days: 0,
        priorYearDays: 0,
        secondPriorYearDays: 0,
      },
    ]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => {
      if (prev.length > 1) {
        return prev.filter((e) => e.id !== id);
      }
      return prev;
    });
  }, []);

  const updateEntry = useCallback(
    (id: string, field: keyof CountryEntry, value: string | number) => {
      setEntries((prev) =>
        prev.map((e) => {
          if (e.id !== id) return e;
          if (field === "countryCode") {
            const country =
              SUPPORTED_COUNTRIES.find((c) => c.code === value) ||
              ALL_COUNTRIES.find((c) => c.code === value);
            return {
              ...e,
              countryCode: value as string,
              countryName: country?.name || "",
            };
          }
          return { ...e, [field]: value };
        }),
      );
    },
    [],
  );

  const calculateResults = useCallback(() => {
    const validEntries = entries.filter((e) => e.countryCode && e.days > 0);
    if (validEntries.length === 0) return;

    const calculatedResults = validEntries.map((entry) =>
      calculateResidencyStatus(
        entry.countryCode,
        entry.countryName,
        entry.days,
        year,
        entry.priorYearDays ?? 0,
        entry.secondPriorYearDays ?? 0,
      ),
    );

    // Sort by risk level
    const riskOrder = { resident: 0, high: 1, medium: 2, low: 3 };
    calculatedResults.sort(
      (a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel],
    );

    setResults(calculatedResults);
    setShowResults(true);
  }, [entries, year]);

  const resetForm = useCallback(() => {
    setEntries([
      {
        id: "1",
        countryCode: "",
        countryName: "",
        days: 0,
        priorYearDays: 0,
        secondPriorYearDays: 0,
      },
    ]);
    setResults([]);
    setShowResults(false);
  }, []);

  const hasValidEntries = entries.some((e) => e.countryCode && e.days > 0);

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Enter Your Travel Data
          </CardTitle>
          <CardDescription className="space-y-1">
            <p>
              Add each country you&apos;ve visited and the number of days spent
              there.
            </p>
            <p className="text-muted-foreground">
              For the United States, include the previous two years of days to
              run the Substantial Presence Test accurately.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Year Selection */}
          <div className="flex items-center gap-4">
            <label htmlFor="residency-year" className="text-sm font-medium">
              Tax Year:
            </label>
            <Select
              id="residency-year"
              options={yearOptions}
              value={String(year)}
              onChange={(value) => setYear(Number(value))}
              className="w-32"
              aria-label="Select tax year for residency check"
            />
          </div>

          {/* Country Entries */}
          <div className="space-y-3" role="list" aria-label="Country entries">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className="space-y-2 rounded-lg border p-3"
                role="listitem"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-[200px] flex-1">
                    <label htmlFor={`country-${entry.id}`} className="sr-only">
                      Country {index + 1}
                    </label>
                    <Select
                      id={`country-${entry.id}`}
                      options={countryOptions}
                      value={entry.countryCode}
                      onChange={(value) =>
                        updateEntry(entry.id, "countryCode", value)
                      }
                      placeholder="Select country"
                    />
                  </div>
                  <div className="w-32">
                    <label htmlFor={`days-${entry.id}`} className="sr-only">
                      Days spent in{" "}
                      {entry.countryName || `country ${index + 1}`} (current
                      year)
                    </label>
                    <Input
                      id={`days-${entry.id}`}
                      type="number"
                      min={0}
                      max={MAX_DAYS_IN_YEAR}
                      value={entry.days || ""}
                      onChange={(e) =>
                        updateEntry(
                          entry.id,
                          "days",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      placeholder="Current year"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                    disabled={entries.length === 1}
                    aria-label={`Remove ${entry.countryName || "country"} entry`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>

                {entry.countryCode === "US" && (
                  <div className="space-y-2 rounded-md bg-muted/40 p-3">
                    <p className="text-sm text-muted-foreground">
                      US Substantial Presence Test: current year days + 1/3 of
                      prior year + 1/6 of the year before that (needs 31+ days
                      in the current year).
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`prior-${entry.id}`}
                          className="text-sm text-muted-foreground"
                        >
                          Prior year days
                        </label>
                        <Input
                          id={`prior-${entry.id}`}
                          type="number"
                          min={0}
                          max={MAX_DAYS_IN_YEAR}
                          value={entry.priorYearDays ?? ""}
                          onChange={(e) =>
                            updateEntry(
                              entry.id,
                              "priorYearDays",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          placeholder="e.g. 90"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`second-prior-${entry.id}`}
                          className="text-sm text-muted-foreground"
                        >
                          2 years ago
                        </label>
                        <Input
                          id={`second-prior-${entry.id}`}
                          type="number"
                          min={0}
                          max={MAX_DAYS_IN_YEAR}
                          value={entry.secondPriorYearDays ?? ""}
                          onChange={(e) =>
                            updateEntry(
                              entry.id,
                              "secondPriorYearDays",
                              parseInt(e.target.value) || 0,
                            )
                          }
                          placeholder="e.g. 60"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Country Button */}
          <Button variant="outline" onClick={addEntry} className="w-full">
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Another Country
          </Button>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={calculateResults}
              className="flex-1"
              disabled={!hasValidEntries}
            >
              Check Residency Status
            </Button>
            <Button variant="outline" onClick={resetForm}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && results.length > 0 && (
        <div
          className="space-y-4"
          role="region"
          aria-label="Tax residency check results"
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" aria-hidden="true" />
            Results for {year}
          </h2>

          {/* Summary Alert */}
          {hasResidentResults && (
            <Alert variant="destructive" role="alert">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Tax Residency Triggered</AlertTitle>
              <AlertDescription>
                You may be considered a tax resident in one or more countries.
                Please consult with a qualified tax professional.
              </AlertDescription>
            </Alert>
          )}

          {/* Individual Country Results */}
          {results.map((result) => {
            const ariaLabel = getRiskAriaLabel(
              result.riskLevel,
              result.daysSpent,
              result.threshold,
            );
            const flag = getCountryFlag(result.countryCode);

            return (
              <Card
                key={result.countryCode}
                className={
                  result.isResident
                    ? "border-destructive"
                    : result.riskLevel === "high"
                      ? "border-warning"
                      : ""
                }
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {flag ? (
                        <span aria-hidden="true" className="mr-1">
                          {flag}
                        </span>
                      ) : null}
                      {result.countryName}
                    </CardTitle>
                    <Badge
                      variant={getRiskBadgeVariant(result.riskLevel)}
                      aria-label={ariaLabel}
                    >
                      {getRiskLabel(result.riskLevel)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>
                        {result.daysSpent} of {result.threshold} days
                      </span>
                      <span>{result.percentageOfThreshold}%</span>
                    </div>
                    <Progress
                      value={result.percentageOfThreshold}
                      className={getRiskProgressClass(result.riskLevel)}
                      aria-label={ariaLabel}
                    />
                  </div>

                  {/* Tax Rule Info */}
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">
                      Tax Rule: {result.taxRule.testType}
                    </p>
                    <p>{result.taxRule.description}</p>
                  </div>

                  {/* Days Remaining */}
                  {!result.isResident && (
                    <div className="flex items-center gap-2 text-sm">
                      <Info
                        className="h-4 w-4 text-blue-500"
                        aria-hidden="true"
                      />
                      <span>
                        <strong>{result.daysRemaining}</strong> days remaining
                        before potential residency
                      </span>
                    </div>
                  )}

                  {/* Warnings */}
                  {result.warnings.length > 0 && (
                    <div className="space-y-1" role="alert">
                      {result.warnings.map((warning, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-yellow-600"
                        >
                          <AlertTriangle
                            className="h-4 w-4 mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations.length > 0 && (
                    <div className="space-y-1">
                      {result.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-green-600"
                        >
                          <CheckCircle
                            className="h-4 w-4 mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Special Rules */}
                  {result.taxRule.specialRules.length > 0 && (
                    <details className="text-sm">
                      <summary className="cursor-pointer font-medium text-muted-foreground hover:text-foreground">
                        View special rules for {result.countryName}
                      </summary>
                      <ul className="mt-2 space-y-1 pl-4 text-muted-foreground">
                        {result.taxRule.specialRules.map((rule, idx) => (
                          <li key={idx} className="list-disc">
                            {rule}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Disclaimer */}
          <Alert>
            <Info className="h-4 w-4" aria-hidden="true" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
              This tool provides general guidance only and should not be
              considered professional tax advice. Tax residency rules are
              complex and may involve factors beyond simple day counting. Always
              consult with a qualified tax professional for your specific
              situation.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}
