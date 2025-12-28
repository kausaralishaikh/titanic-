"use client"

import { useState } from "react"
import { PredictionForm } from "@/components/prediction-form"
import { PredictionResult } from "@/components/prediction-result"
import { FairnessDashboard } from "@/components/fairness-dashboard"
import { FeatureImportanceChart } from "@/components/feature-importance-chart"
import { PartialDependencePlot } from "@/components/partial-dependence-plot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, BarChart3, Shield, TrendingUp } from "lucide-react"
import type { ExplanationResult } from "@/lib/types"

export default function Home() {
  const [prediction, setPrediction] = useState<ExplanationResult | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-balance text-3xl font-bold tracking-tight">Titanic Fairness Audit</h1>
              <p className="text-pretty text-muted-foreground">Advanced ML bias detection and mitigation system</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/docs" className="text-sm text-muted-foreground hover:text-foreground">
                Documentation
              </a>
              <Shield className="size-12 text-primary" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="predict" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="predict" className="gap-2">
              <Activity className="size-4" />
              Predict
            </TabsTrigger>
            <TabsTrigger value="fairness" className="gap-2">
              <Shield className="size-4" />
              Fairness
            </TabsTrigger>
            <TabsTrigger value="analysis" className="gap-2">
              <TrendingUp className="size-4" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="about" className="gap-2">
              <BarChart3 className="size-4" />
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="predict" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <PredictionForm onPrediction={setPrediction} />
              <div>
                {prediction ? (
                  <PredictionResult result={prediction} />
                ) : (
                  <Card className="flex h-full items-center justify-center">
                    <CardContent className="py-12 text-center">
                      <Activity className="mx-auto mb-4 size-12 text-muted-foreground" />
                      <p className="text-muted-foreground">Enter passenger details to see survival prediction</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="fairness">
            <FairnessDashboard />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <FeatureImportanceChart />
            <PartialDependencePlot />
          </TabsContent>

          <TabsContent value="about">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Project Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      This application demonstrates advanced fairness-aware machine learning for Titanic survival
                      prediction. It detects and analyzes bias in ML models across protected groups.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Key Features</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Real-time predictions with confidence scores</li>
                      <li>• Feature importance and SHAP-style explanations</li>
                      <li>• Fairness metrics (disparate impact, equal opportunity)</li>
                      <li>• Counterfactual what-if analysis</li>
                      <li>• Bias detection and mitigation recommendations</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div>
                    <h3 className="mb-2 font-semibold text-lg">Technical Stack</h3>
                    <p className="text-sm text-muted-foreground">
                      Next.js 16 • React 19 • TypeScript • XGBoost • scikit-learn • Recharts
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Model Performance</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xl font-bold">82.4%</p>
                        <p className="text-muted-foreground">Accuracy</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">0.86</p>
                        <p className="text-muted-foreground">ROC AUC</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">0.76</p>
                        <p className="text-muted-foreground">Disparate Impact</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold">0.12</p>
                        <p className="text-muted-foreground">Equal Opp. Δ</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <h3 className="mb-3 font-semibold text-lg">Deployment Instructions</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div>
                      <p className="font-medium text-foreground mb-1">Local Development:</p>
                      <code className="block bg-muted p-2 rounded">
                        npm install && pip install -r requirements.txt && python ml/train_model.py && npm run dev
                      </code>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-1">Deploy to Vercel:</p>
                      <code className="block bg-muted p-2 rounded">vercel deploy --prod</code>
                    </div>
                    <p className="mt-2">
                      The application automatically trains models during build and deploys with Python 3.11 runtime. See
                      README.md for detailed setup instructions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="mt-12 border-t bg-muted/30 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Next.js 16, XGBoost, and Fairness-Aware ML</p>
          <p className="mt-1">Created by Kausar Ali Shaikh • Production-ready • Open Source</p>
        </div>
      </footer>
    </div>
  )
}
