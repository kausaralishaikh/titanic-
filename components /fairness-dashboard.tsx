"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface FairnessData {
  overall: {
    total_predictions: number
    accuracy: number
    balanced_accuracy: number
  }
  by_sex: {
    male: {
      count: number
      survival_rate: number
      predicted_survival_rate: number
      accuracy: number
    }
    female: {
      count: number
      survival_rate: number
      predicted_survival_rate: number
      accuracy: number
    }
    metrics: {
      disparate_impact: number
      equal_opportunity_diff: number
      demographic_parity_diff: number
    }
  }
  by_class: {
    first: {
      count: number
      survival_rate: number
      predicted_survival_rate: number
      accuracy: number
    }
    second: {
      count: number
      survival_rate: number
      predicted_survival_rate: number
      accuracy: number
    }
    third: {
      count: number
      survival_rate: number
      predicted_survival_rate: number
      accuracy: number
    }
    metrics: {
      disparate_impact: number
      equal_opportunity_diff: number
      demographic_parity_diff: number
    }
  }
  bias_analysis: {
    protected_groups: string[]
    bias_detected: boolean
    severity: string
    recommendations: string[]
  }
}

export function FairnessDashboard() {
  const [data, setData] = useState<FairnessData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/fairness")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading fairness metrics...</div>
  }

  if (!data) {
    return <div className="text-center text-destructive">Failed to load fairness data</div>
  }

  const getBiasLevel = (value: number, metric: string) => {
    if (metric === "disparate_impact") {
      if (value >= 0.8 && value <= 1.25) return { label: "Fair", variant: "default" as const }
      if (value >= 0.6 || value <= 1.5) return { label: "Moderate Bias", variant: "secondary" as const }
      return { label: "High Bias", variant: "destructive" as const }
    } else {
      if (value <= 0.1) return { label: "Fair", variant: "default" as const }
      if (value <= 0.2) return { label: "Moderate Bias", variant: "secondary" as const }
      return { label: "High Bias", variant: "destructive" as const }
    }
  }

  return (
    <div className="space-y-6">
      <Alert variant={data.bias_analysis.bias_detected ? "destructive" : "default"}>
        {data.bias_analysis.bias_detected ? <AlertTriangle className="size-4" /> : <Info className="size-4" />}
        <AlertTitle>Bias Analysis: {data.bias_analysis.severity.toUpperCase()}</AlertTitle>
        <AlertDescription>
          {data.bias_analysis.bias_detected
            ? "Model exhibits bias across protected groups. Review recommendations below."
            : "Model appears fair across protected groups."}
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{data.overall.total_predictions}</CardTitle>
            <CardDescription>Total Predictions</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{(data.overall.accuracy * 100).toFixed(1)}%</CardTitle>
            <CardDescription>Overall Accuracy</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{(data.overall.balanced_accuracy * 100).toFixed(1)}%</CardTitle>
            <CardDescription>Balanced Accuracy</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="sex" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sex">By Sex</TabsTrigger>
          <TabsTrigger value="class">By Class</TabsTrigger>
        </TabsList>

        <TabsContent value="sex" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Male Passengers</CardTitle>
                <CardDescription>{data.by_sex.male.count} passengers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Actual Survival Rate</span>
                    <span className="font-medium">{(data.by_sex.male.survival_rate * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={data.by_sex.male.survival_rate * 100} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Predicted Survival Rate</span>
                    <span className="font-medium">{(data.by_sex.male.predicted_survival_rate * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={data.by_sex.male.predicted_survival_rate * 100} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{(data.by_sex.male.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={data.by_sex.male.accuracy * 100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Female Passengers</CardTitle>
                <CardDescription>{data.by_sex.female.count} passengers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Actual Survival Rate</span>
                    <span className="font-medium">{(data.by_sex.female.survival_rate * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={data.by_sex.female.survival_rate * 100} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Predicted Survival Rate</span>
                    <span className="font-medium">
                      {(data.by_sex.female.predicted_survival_rate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={data.by_sex.female.predicted_survival_rate * 100} />
                </div>
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span>Accuracy</span>
                    <span className="font-medium">{(data.by_sex.female.accuracy * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={data.by_sex.female.accuracy * 100} />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fairness Metrics (Sex)</CardTitle>
              <CardDescription>Lower values indicate better fairness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.by_sex.metrics).map(([key, value]) => {
                const biasLevel = getBiasLevel(value, key)
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{value.toFixed(3)}</span>
                      <Badge variant={biasLevel.variant}>{biasLevel.label}</Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            {["first", "second", "third"].map((classType) => {
              const classData = data.by_class[classType as keyof typeof data.by_class] as any
              return (
                <Card key={classType}>
                  <CardHeader>
                    <CardTitle className="capitalize">{classType} Class</CardTitle>
                    <CardDescription>{classData.count} passengers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Survival Rate</span>
                        <span className="font-medium">{(classData.survival_rate * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={classData.survival_rate * 100} />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-sm">
                        <span>Accuracy</span>
                        <span className="font-medium">{(classData.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={classData.accuracy * 100} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fairness Metrics (Class)</CardTitle>
              <CardDescription>Comparing 1st class vs. others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(data.by_class.metrics).map(([key, value]) => {
                const biasLevel = getBiasLevel(value, key)
                return (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{value.toFixed(3)}</span>
                      <Badge variant={biasLevel.variant}>{biasLevel.label}</Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Bias Mitigation Recommendations</CardTitle>
          <CardDescription>Actions to improve model fairness</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.bias_analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-muted-foreground">{idx + 1}.</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
