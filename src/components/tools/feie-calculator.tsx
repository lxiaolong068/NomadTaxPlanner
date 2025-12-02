'use client'

import { useState, useMemo } from 'react'
import {
  Calculator,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  DollarSign,
  Calendar,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { calculateFEIE, getFEIEMaxExclusion } from '@/lib/calculations/feie'
import { FEIEResult } from '@/types'

const currentYear = new Date().getFullYear()

export function FEIECalculator() {
  const [formData, setFormData] = useState({
    taxYear: currentYear,
    testPeriodStart: '',
    testPeriodEnd: '',
    daysOutsideUS: 0,
    daysInUS: 0,
    foreignEarnedIncome: 0,
  })

  const [result, setResult] = useState<FEIEResult | null>(null)
  const [showResult, setShowResult] = useState(false)

  const yearOptions = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        value: String(currentYear - i),
        label: String(currentYear - i),
      })),
    []
  )

  const maxExclusion = useMemo(
    () => getFEIEMaxExclusion(formData.taxYear),
    [formData.taxYear]
  )

  const handleCalculate = () => {
    if (
      !formData.testPeriodStart ||
      !formData.testPeriodEnd ||
      formData.daysOutsideUS === 0
    ) {
      return
    }

    const calculatedResult = calculateFEIE({
      testPeriodStart: formData.testPeriodStart,
      testPeriodEnd: formData.testPeriodEnd,
      daysOutsideUS: formData.daysOutsideUS,
      daysInUS: formData.daysInUS,
      foreignEarnedIncome: formData.foreignEarnedIncome,
      taxYear: formData.taxYear,
    })

    setResult(calculatedResult)
    setShowResult(true)
  }

  const handleReset = () => {
    setFormData({
      taxYear: currentYear,
      testPeriodStart: '',
      testPeriodEnd: '',
      daysOutsideUS: 0,
      daysInUS: 0,
      foreignEarnedIncome: 0,
    })
    setResult(null)
    setShowResult(false)
  }

  const progressPercentage = useMemo(() => {
    return Math.min(100, Math.round((formData.daysOutsideUS / 330) * 100))
  }, [formData.daysOutsideUS])

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            FEIE Calculator
          </CardTitle>
          <CardDescription>
            Calculate your Foreign Earned Income Exclusion eligibility using the Physical
            Presence Test.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tax Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Tax Year</label>
              <Select
                options={yearOptions}
                value={String(formData.taxYear)}
                onChange={(value) =>
                  setFormData({ ...formData, taxYear: Number(value) })
                }
              />
              <p className="text-xs text-muted-foreground mt-1">
                Max exclusion for {formData.taxYear}: ${maxExclusion.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Test Period */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              365-Day Test Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Start Date</label>
                <Input
                  type="date"
                  value={formData.testPeriodStart}
                  onChange={(e) =>
                    setFormData({ ...formData, testPeriodStart: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">End Date</label>
                <Input
                  type="date"
                  value={formData.testPeriodEnd}
                  min={formData.testPeriodStart}
                  onChange={(e) =>
                    setFormData({ ...formData, testPeriodEnd: e.target.value })
                  }
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Choose any consecutive 365-day period that includes days in your tax year.
            </p>
          </div>

          {/* Days */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Days During Test Period
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Days Outside US</label>
                <Input
                  type="number"
                  min={0}
                  max={365}
                  value={formData.daysOutsideUS || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      daysOutsideUS: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="e.g., 335"
                />
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{formData.daysOutsideUS} of 330 required</span>
                    <span>{progressPercentage}%</span>
                  </div>
                  <Progress
                    value={progressPercentage}
                    className={
                      formData.daysOutsideUS >= 330
                        ? '[&>div]:bg-success'
                        : progressPercentage >= 90
                          ? '[&>div]:bg-warning'
                          : '[&>div]:bg-primary'
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Days in US</label>
                <Input
                  type="number"
                  min={0}
                  max={35}
                  value={formData.daysInUS || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      daysInUS: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="e.g., 30"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Up to 35 days in US allowed during test period
                </p>
              </div>
            </div>
          </div>

          {/* Income */}
          <div>
            <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Foreign Earned Income
            </h3>
            <div className="max-w-md">
              <label className="text-sm font-medium mb-1 block">
                Total Foreign Earned Income ({formData.taxYear})
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min={0}
                  value={formData.foreignEarnedIncome || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      foreignEarnedIncome: parseInt(e.target.value) || 0,
                    })
                  }
                  className="pl-7"
                  placeholder="e.g., 100000"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Wages, salaries, self-employment income earned while abroad
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleCalculate}
              className="flex-1"
              disabled={
                !formData.testPeriodStart ||
                !formData.testPeriodEnd ||
                formData.daysOutsideUS === 0
              }
            >
              Calculate FEIE
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResult && result && (
        <div className="space-y-4">
          {/* Qualification Status */}
          <Card className={result.qualifies ? 'border-success' : 'border-destructive'}>
            <CardHeader>
              <div className="flex items-center gap-3">
                {result.qualifies ? (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-red-500" />
                )}
                <div>
                  <CardTitle>
                    {result.qualifies
                      ? 'You Qualify for FEIE!'
                      : 'You Do Not Currently Qualify'}
                  </CardTitle>
                  <CardDescription>{result.explanation}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Calculation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{result.qualifyingDays}</div>
                  <div className="text-sm text-muted-foreground">Days Outside US</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{result.requiredDays}</div>
                  <div className="text-sm text-muted-foreground">Days Required</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    ${result.excludableAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Excludable Amount</div>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    ${result.taxableAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Taxable Amount</div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Test Type</span>
                  <Badge variant="secondary">Physical Presence Test</Badge>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Maximum Exclusion ({formData.taxYear})</span>
                  <span className="font-medium">${result.maxExclusion.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Pro-Rated Exclusion</span>
                  <span className="font-medium">${result.proRatedExclusion.toLocaleString()}</span>
                </div>
                {result.daysShort > 0 && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Days Short</span>
                    <span className="font-medium text-red-600">{result.daysShort} days</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Notes</AlertTitle>
              <AlertDescription>
                <ul className="mt-2 space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-yellow-600">•</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Disclaimer */}
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Important Disclaimer</AlertTitle>
            <AlertDescription>
              This calculator provides estimates for educational purposes only. FEIE rules are
              complex and individual circumstances vary. Always consult a qualified tax
              professional before making decisions based on these calculations. The IRS may
              require additional documentation to support your FEIE claim.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  )
}
