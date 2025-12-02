"use client";

import { useState, useMemo } from "react";
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
import { SUPPORTED_COUNTRIES } from "@/lib/constants";
import { calculateResidencyStatus } from "@/lib/calculations/tax-residency";
import { ResidencyResult } from "@/types";

interface CountryEntry {
  id: string;
  countryCode: string;
  countryName: string;
  days: number;
}

const currentYear = new Date().getFullYear();

export function TaxResidencyChecker() {
  const [year, setYear] = useState(currentYear);
  const [entries, setEntries] = useState<CountryEntry[]>([
    { id: "1", countryCode: "", countryName: "", days: 0 },
  ]);
  const [results, setResults] = useState<ResidencyResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const countryOptions = useMemo(
    () =>
      SUPPORTED_COUNTRIES.map((c) => ({
        value: c.code,
        label: `${c.flag} ${c.name}`,
      })),
    [],
  );

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        value: String(currentYear - i),
        label: String(currentYear - i),
      })),
    [],
  );

  const addEntry = () => {
    setEntries([
      ...entries,
      { id: Date.now().toString(), countryCode: "", countryName: "", days: 0 },
    ]);
  };

  const removeEntry = (id: string) => {
    if (entries.length > 1) {
      setEntries(entries.filter((e) => e.id !== id));
    }
  };

  const updateEntry = (
    id: string,
    field: keyof CountryEntry,
    value: string | number,
  ) => {
    setEntries(
      entries.map((e) => {
        if (e.id !== id) return e;
        if (field === "countryCode") {
          const country = SUPPORTED_COUNTRIES.find((c) => c.code === value);
          return {
            ...e,
            countryCode: value as string,
            countryName: country?.name || "",
          };
        }
        return { ...e, [field]: value };
      }),
    );
  };

  const calculateResults = () => {
    const validEntries = entries.filter((e) => e.countryCode && e.days > 0);
    if (validEntries.length === 0) return;

    const calculatedResults = validEntries.map((entry) =>
      calculateResidencyStatus(
        entry.countryCode,
        entry.countryName,
        entry.days,
        year,
      ),
    );

    // Sort by risk level
    const riskOrder = { resident: 0, high: 1, medium: 2, low: 3 };
    calculatedResults.sort(
      (a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel],
    );

    setResults(calculatedResults);
    setShowResults(true);
  };

  const resetForm = () => {
    setEntries([{ id: "1", countryCode: "", countryName: "", days: 0 }]);
    setResults([]);
    setShowResults(false);
  };

  const getRiskBadgeVariant = (riskLevel: ResidencyResult["riskLevel"]) => {
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
  };

  const getRiskLabel = (riskLevel: ResidencyResult["riskLevel"]) => {
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
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Enter Your Travel Data
          </CardTitle>
          <CardDescription>
            Add each country you&apos;ve visited and the number of days spent
            there.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Year Selection */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Tax Year:</label>
            <Select
              options={yearOptions}
              value={String(year)}
              onChange={(value) => setYear(Number(value))}
              className="w-32"
            />
          </div>

          {/* Country Entries */}
          <div className="space-y-3">
            {entries.map((entry) => (
              <div key={entry.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <Select
                    options={countryOptions}
                    value={entry.countryCode}
                    onChange={(value) =>
                      updateEntry(entry.id, "countryCode", value)
                    }
                    placeholder="Select country"
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    min={0}
                    max={366}
                    value={entry.days || ""}
                    onChange={(e) =>
                      updateEntry(
                        entry.id,
                        "days",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    placeholder="Days"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEntry(entry.id)}
                  disabled={entries.length === 1}
                  aria-label="Remove country"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Add Country Button */}
          <Button variant="outline" onClick={addEntry} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Country
          </Button>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={calculateResults} className="flex-1">
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
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Results for {year}
          </h2>

          {/* Summary Alert */}
          {results.some((r) => r.isResident) && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Tax Residency Triggered</AlertTitle>
              <AlertDescription>
                You may be considered a tax resident in one or more countries.
                Please consult with a qualified tax professional.
              </AlertDescription>
            </Alert>
          )}

          {/* Individual Country Results */}
          {results.map((result) => (
            <Card
              key={result.countryCode}
              className={
                result.isResident
                  ? "border-red-500"
                  : result.riskLevel === "high"
                    ? "border-yellow-500"
                    : ""
              }
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    {
                      SUPPORTED_COUNTRIES.find(
                        (c) => c.code === result.countryCode,
                      )?.flag
                    }{" "}
                    {result.countryName}
                  </CardTitle>
                  <Badge variant={getRiskBadgeVariant(result.riskLevel)}>
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
                    className={
                      result.isResident
                        ? "[&>div]:bg-red-500"
                        : result.riskLevel === "high"
                          ? "[&>div]:bg-yellow-500"
                          : result.riskLevel === "medium"
                            ? "[&>div]:bg-blue-500"
                            : "[&>div]:bg-green-500"
                    }
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
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>
                      <strong>{result.daysRemaining}</strong> days remaining
                      before potential residency
                    </span>
                  </div>
                )}

                {/* Warnings */}
                {result.warnings.length > 0 && (
                  <div className="space-y-1">
                    {result.warnings.map((warning, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-sm text-yellow-600"
                      >
                        <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
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
                        <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
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
          ))}

          {/* Disclaimer */}
          <Alert>
            <Info className="h-4 w-4" />
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
