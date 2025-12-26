"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PDPData {
  Age: Array<{ value: number; effect: number }>
  Fare: Array<{ value: number; effect: number }>
}

export function PartialDependencePlot() {
  const [data, setData] = useState<PDPData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/feature-importance")
      .then((res) => res.json())
      .then((result) => setData(result.partial_dependence))
      .finally(() => setLoading(false))
  }, [])

  if (loading || !data) {
    return <div className="text-center text-muted-foreground">Loading partial dependence plots...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partial Dependence Plots</CardTitle>
        <CardDescription>How individual features affect survival probability</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="age">Age Effect</TabsTrigger>
            <TabsTrigger value="fare">Fare Effect</TabsTrigger>
          </TabsList>

          <TabsContent value="age">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.Age} margin={{ left: 5, right: 20, top: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="value" label={{ value: "Age (years)", position: "insideBottom", offset: -5 }} />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  label={{ value: "Survival Probability", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                  labelFormatter={(label) => `Age: ${label} years`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="effect"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={3}
                  name="Survival Effect"
                  dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-muted-foreground">
              Children (age {"<"} 12) had higher survival rates. Survival probability decreases with age, with a steeper
              decline after age 30.
            </p>
          </TabsContent>

          <TabsContent value="fare">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.Fare} margin={{ left: 5, right: 20, top: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="value" label={{ value: "Fare (£)", position: "insideBottom", offset: -5 }} />
                <YAxis
                  domain={[0, 1]}
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  label={{ value: "Survival Probability", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                  labelFormatter={(label) => `Fare: £${label}`}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="effect"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={3}
                  name="Survival Effect"
                  dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm text-muted-foreground">
              Higher ticket fares (proxy for socioeconomic status) strongly correlate with survival. Passengers paying
              over £100 had significantly better outcomes.
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
