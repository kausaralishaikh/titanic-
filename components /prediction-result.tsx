"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, TrendingDown, TrendingUp } from "lucide-react"
import type { ExplanationResult } from "@/lib/types"

interface PredictionResultProps {
  result: ExplanationResult
}

export function PredictionResult({ result }: PredictionResultProps) {
  const survivalProb = result.probability.survived * 100
  const isLikelyToSurvive = result.survived === 1

  return (
    <div className="space-y-6">
      <Alert variant={isLikelyToSurvive ? "default" : "destructive"}>
        {isLikelyToSurvive ? <CheckCircle2 className="size-4" /> : <AlertCircle className="size-4" />}
        <AlertTitle className="text-lg font-semibold">
          {isLikelyToSurvive ? "Likely to Survive" : "Unlikely to Survive"}
        </AlertTitle>
        <AlertDescription>
          Survival Probability: {survivalProb.toFixed(1)}% (Confidence: {(result.confidence * 100).toFixed(1)}%)
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Survival Probability</CardTitle>
          <CardDescription>Model confidence in prediction outcome</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Survived</span>
              <span className="font-medium">{survivalProb.toFixed(1)}%</span>
            </div>
            <Progress value={survivalProb} className="h-3" />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Did Not Survive</span>
              <span className="font-medium">{(result.probability.died * 100).toFixed(1)}%</span>
            </div>
            <Progress value={result.probability.died * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Importance</CardTitle>
          <CardDescription>Which factors most influenced this prediction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(result.feature_importance)
              .slice(0, 6)
              .map(([feature, importance]) => (
                <div key={feature}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{feature}</span>
                    <span className="text-muted-foreground">{(importance * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={importance * 100} className="h-2" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Counterfactual Analysis</CardTitle>
          <CardDescription>What if circumstances were different?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.counterfactuals.map((cf, idx) => {
              const isPositive = cf.difference > 0
              return (
                <div key={idx} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="flex items-center gap-2">
                    {isPositive ? (
                      <TrendingUp className="size-4 text-green-600" />
                    ) : (
                      <TrendingDown className="size-4 text-red-600" />
                    )}
                    <span className="text-sm font-medium">{cf.change}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{(cf.new_probability * 100).toFixed(1)}%</span>
                    <Badge variant={isPositive ? "default" : "secondary"}>
                      {cf.difference > 0 ? "+" : ""}
                      {(cf.difference * 100).toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
