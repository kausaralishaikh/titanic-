"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface FeatureData {
  feature: string
  importance: number
  description: string
}

export function FeatureImportanceChart() {
  const [data, setData] = useState<FeatureData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/feature-importance")
      .then((res) => res.json())
      .then((result) => setData(result.global_importance))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading feature importance...</div>
  }

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Feature Importance</CardTitle>
        <CardDescription>Which features matter most for survival predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ left: 80, right: 20, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis type="number" domain={[0, 0.4]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
            <YAxis dataKey="feature" type="category" />
            <Tooltip
              formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-sm">
              <div className="mt-0.5 size-3 rounded-sm" style={{ backgroundColor: colors[idx % colors.length] }} />
              <div className="flex-1">
                <span className="font-medium">{item.feature}:</span>{" "}
                <span className="text-muted-foreground">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
