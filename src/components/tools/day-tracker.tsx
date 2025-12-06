"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Calendar,
  Plus,
  Trash2,
  Download,
  AlertTriangle,
  MapPin,
  Plane,
  Briefcase,
  Coffee,
  ChevronDown,
  ChevronUp,
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
import { ALL_COUNTRIES } from "@/lib/constants";
import {
  CURRENT_YEAR,
  getYearOptions,
  getCountryOptions,
  getThresholdForCountry,
  getRiskLevel,
  getRiskBadgeVariant,
  getRiskProgressClass,
  getRiskAriaLabel,
  getCountryFlag,
} from "@/lib/form-utils";
import { useDayTrackerStore } from "@/store/day-tracker-store";
import { useHydrated } from "@/hooks";
import { format } from "date-fns";

const PURPOSE_OPTIONS = [
  { value: "work", label: "💼 Work" },
  { value: "leisure", label: "🏖️ Leisure" },
  { value: "transit", label: "✈️ Transit" },
] as const;

const PURPOSE_ICONS = {
  work: Briefcase,
  leisure: Coffee,
  transit: Plane,
} as const;

export function DayTracker() {
  const mounted = useHydrated();
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
    new Set(),
  );

  // Form state
  const [formData, setFormData] = useState({
    countryCode: "",
    startDate: "",
    endDate: "",
    purpose: "work" as "work" | "leisure" | "transit",
    notes: "",
  });

  // Store actions
  const trips = useDayTrackerStore((state) => state.trips);
  const addTrip = useDayTrackerStore((state) => state.addTrip);
  const removeTrip = useDayTrackerStore((state) => state.removeTrip);
  const clearAllTrips = useDayTrackerStore((state) => state.clearAllTrips);
  const getCountrySummaries = useDayTrackerStore(
    (state) => state.getCountrySummaries,
  );

  // Memoized options - only compute once
  const countryOptions = useMemo(() => getCountryOptions(), []);
  const yearOptions = useMemo(() => getYearOptions(5), []);

  const countrySummaries = useMemo(
    () => (mounted ? getCountrySummaries(selectedYear) : []),
    [mounted, getCountrySummaries, selectedYear],
  );

  const tripsForYear = useMemo(
    () =>
      mounted
        ? trips.filter(
            (trip) => new Date(trip.startDate).getFullYear() === selectedYear,
          )
        : [],
    [mounted, trips, selectedYear],
  );

  const totalDaysThisYear = useMemo(
    () => countrySummaries.reduce((sum, s) => sum + s.totalDays, 0),
    [countrySummaries],
  );

  // Memoized count of residencies triggered
  const residenciesTriggered = useMemo(
    () =>
      countrySummaries.filter(
        (s) => s.totalDays >= getThresholdForCountry(s.countryCode),
      ).length,
    [countrySummaries],
  );

  // Check if any country has triggered residency
  const hasResidentCountry = useMemo(
    () =>
      countrySummaries.some(
        (s) =>
          getRiskLevel(s.totalDays, getThresholdForCountry(s.countryCode)) ===
          "resident",
      ),
    [countrySummaries],
  );

  const handleAddTrip = useCallback(() => {
    if (!formData.countryCode || !formData.startDate || !formData.endDate)
      return;

    const country =
      ALL_COUNTRIES.find((c) => c.code === formData.countryCode) || null;

    addTrip({
      countryCode: formData.countryCode,
      countryName: country?.name || formData.countryCode,
      startDate: formData.startDate,
      endDate: formData.endDate,
      purpose: formData.purpose,
      notes: formData.notes || undefined,
    });

    // Reset form
    setFormData({
      countryCode: "",
      startDate: "",
      endDate: "",
      purpose: "work",
      notes: "",
    });
    setShowAddForm(false);
  }, [formData, addTrip]);

  const toggleCountryExpand = useCallback((countryCode: string) => {
    setExpandedCountries((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(countryCode)) {
        newExpanded.delete(countryCode);
      } else {
        newExpanded.add(countryCode);
      }
      return newExpanded;
    });
  }, []);

  const exportData = useCallback(() => {
    const data = {
      exportDate: new Date().toISOString(),
      year: selectedYear,
      trips: tripsForYear,
      summaries: countrySummaries,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nomad-tax-tracker-${selectedYear}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedYear, tripsForYear, countrySummaries]);

  const handleClearAll = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to delete all trips? This cannot be undone.",
      )
    ) {
      clearAllTrips();
    }
  }, [clearAllTrips]);

  if (!mounted) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground" role="status">
            Loading your travel data...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                Day Tracker
              </CardTitle>
              <CardDescription>
                Track your travel days and monitor tax residency thresholds.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select
                options={yearOptions}
                value={String(selectedYear)}
                onChange={(value) => setSelectedYear(Number(value))}
                className="w-28"
                aria-label="Select tax year"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={exportData}
                disabled={trips.length === 0}
                aria-label={`Export ${selectedYear} travel data as JSON`}
              >
                <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Year Summary */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            role="region"
            aria-label={`Travel summary for ${selectedYear}`}
          >
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{tripsForYear.length}</div>
              <div className="text-sm text-muted-foreground">Total Trips</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{totalDaysThisYear}</div>
              <div className="text-sm text-muted-foreground">Total Days</div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">
                {countrySummaries.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Countries Visited
              </div>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{residenciesTriggered}</div>
              <div className="text-sm text-muted-foreground">
                Residencies Triggered
              </div>
            </div>
          </div>

          {/* Add Trip Button */}
          {!showAddForm ? (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full"
              aria-expanded={showAddForm}
              aria-controls="add-trip-form"
            >
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Add New Trip
            </Button>
          ) : (
            <div
              id="add-trip-form"
              className="border rounded-lg p-4 space-y-4"
              role="form"
              aria-label="Add new trip form"
            >
              <h3 className="font-medium">Add New Trip</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="trip-country"
                    className="text-sm font-medium mb-1 block"
                  >
                    Country
                  </label>
                  <Select
                    id="trip-country"
                    options={countryOptions}
                    value={formData.countryCode}
                    onChange={(value) =>
                      setFormData({ ...formData, countryCode: value })
                    }
                    placeholder="Select country"
                  />
                </div>
                <div>
                  <label
                    htmlFor="trip-purpose"
                    className="text-sm font-medium mb-1 block"
                  >
                    Purpose
                  </label>
                  <Select
                    id="trip-purpose"
                    options={[...PURPOSE_OPTIONS]}
                    value={formData.purpose}
                    onChange={(value) =>
                      setFormData({
                        ...formData,
                        purpose: value as "work" | "leisure" | "transit",
                      })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="trip-start-date"
                    className="text-sm font-medium mb-1 block"
                  >
                    Start Date
                  </label>
                  <Input
                    id="trip-start-date"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="trip-end-date"
                    className="text-sm font-medium mb-1 block"
                  >
                    End Date
                  </label>
                  <Input
                    id="trip-end-date"
                    type="date"
                    value={formData.endDate}
                    min={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="trip-notes"
                  className="text-sm font-medium mb-1 block"
                >
                  Notes (optional)
                </label>
                <Input
                  id="trip-notes"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  placeholder="e.g., Client meeting in Berlin"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAddTrip}
                  disabled={
                    !formData.countryCode ||
                    !formData.startDate ||
                    !formData.endDate
                  }
                >
                  Add Trip
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Country Summaries */}
      {countrySummaries.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" aria-hidden="true" />
            Countries in {selectedYear}
          </h2>

          {/* Warnings for high-risk countries */}
          {hasResidentCountry && (
            <Alert variant="destructive" role="alert">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Tax Residency Alert</AlertTitle>
              <AlertDescription>
                You have exceeded the residency threshold in one or more
                countries. Please consult a tax professional.
              </AlertDescription>
            </Alert>
          )}

          {countrySummaries.map((summary) => {
            const threshold = getThresholdForCountry(summary.countryCode);
            const percentage = Math.min(
              100,
              Math.round((summary.totalDays / threshold) * 100),
            );
            const riskLevel = getRiskLevel(summary.totalDays, threshold);
            const isExpanded = expandedCountries.has(summary.countryCode);
            const flag = getCountryFlag(summary.countryCode);
            const ariaLabel = getRiskAriaLabel(
              riskLevel,
              summary.totalDays,
              threshold,
            );

            return (
              <Card
                key={summary.countryCode}
                className={
                  riskLevel === "resident"
                    ? "border-destructive"
                    : riskLevel === "high"
                      ? "border-warning"
                      : ""
                }
              >
                <CardHeader className="pb-2">
                  <button
                    type="button"
                    className="flex items-center justify-between cursor-pointer w-full text-left"
                    onClick={() => toggleCountryExpand(summary.countryCode)}
                    aria-expanded={isExpanded}
                    aria-controls={`trips-${summary.countryCode}`}
                    aria-label={`${summary.countryName}: ${ariaLabel}. Click to ${isExpanded ? "collapse" : "expand"} trip details.`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" aria-hidden="true">
                        {flag}
                      </span>
                      <div>
                        <CardTitle className="text-lg">
                          {summary.countryName}
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">
                          {summary.trips.length} trip
                          {summary.trips.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={getRiskBadgeVariant(riskLevel)}
                        aria-label={ariaLabel}
                      >
                        {summary.totalDays} days
                        {riskLevel === "resident" && (
                          <span className="sr-only"> - Tax Resident</span>
                        )}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp
                          className="h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChevronDown
                          className="h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </button>
                </CardHeader>
                <CardContent>
                  {/* Progress Bar */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>
                        {summary.totalDays} of {threshold} days
                      </span>
                      <span>{percentage}%</span>
                    </div>
                    <Progress
                      value={percentage}
                      className={getRiskProgressClass(riskLevel)}
                      aria-label={ariaLabel}
                    />
                    {summary.totalDays < threshold && (
                      <div className="text-sm text-muted-foreground">
                        {threshold - summary.totalDays} days remaining before
                        threshold
                      </div>
                    )}
                  </div>

                  {/* Trip List */}
                  {isExpanded && (
                    <div
                      id={`trips-${summary.countryCode}`}
                      className="space-y-2 mt-4 pt-4 border-t"
                    >
                      <h4 className="text-sm font-medium">Trip History</h4>
                      {summary.trips.map((trip) => {
                        const PurposeIcon = PURPOSE_ICONS[trip.purpose];
                        return (
                          <div
                            key={trip.id}
                            className="flex items-center justify-between py-2 px-3 bg-muted rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <PurposeIcon
                                className="h-4 w-4 text-muted-foreground"
                                aria-hidden="true"
                              />
                              <div>
                                <div className="text-sm font-medium">
                                  {format(new Date(trip.startDate), "MMM d")} -{" "}
                                  {format(
                                    new Date(trip.endDate),
                                    "MMM d, yyyy",
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {trip.days} days • {trip.purpose}
                                  {trip.notes && ` • ${trip.notes}`}
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeTrip(trip.id);
                              }}
                              aria-label={`Remove trip to ${summary.countryName} from ${format(new Date(trip.startDate), "MMM d")} to ${format(new Date(trip.endDate), "MMM d, yyyy")}`}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}

          {/* Clear All */}
          {trips.length > 0 && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                Clear All Trips
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar
              className="h-12 w-12 mx-auto text-muted-foreground mb-4"
              aria-hidden="true"
            />
            <h3 className="text-lg font-medium mb-2">
              No trips recorded for {selectedYear}
            </h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your travels to monitor tax residency thresholds.
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Add Your First Trip
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
