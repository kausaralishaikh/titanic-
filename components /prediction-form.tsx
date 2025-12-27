"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"
import type { ExplanationResult, PassengerInput } from "@/lib/types"

interface PredictionFormProps {
  onPrediction: (result: ExplanationResult) => void
}

export function PredictionForm({ onPrediction }: PredictionFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<PassengerInput>({
    Pclass: 3,
    Sex: "male",
    Age: 30,
    SibSp: 0,
    Parch: 0,
    Fare: 15,
    Embarked: "S",
    Name: "John Doe",
    Cabin: null,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Prediction failed")

      const result = await response.json()
      onPrediction(result)
    } catch (error) {
      console.error("Prediction error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Information</CardTitle>
        <CardDescription>Enter passenger details to predict survival probability</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Passenger Name</Label>
              <Input
                id="name"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                value={formData.Sex}
                onValueChange={(value: "male" | "female") => setFormData({ ...formData, Sex: value })}
              >
                <SelectTrigger id="sex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pclass">Passenger Class</Label>
              <Select
                value={formData.Pclass.toString()}
                onValueChange={(value) => setFormData({ ...formData, Pclass: Number.parseInt(value) as 1 | 2 | 3 })}
              >
                <SelectTrigger id="pclass">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Class</SelectItem>
                  <SelectItem value="2">2nd Class</SelectItem>
                  <SelectItem value="3">3rd Class</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="embarked">Port of Embarkation</Label>
              <Select
                value={formData.Embarked}
                onValueChange={(value: "C" | "Q" | "S") => setFormData({ ...formData, Embarked: value })}
              >
                <SelectTrigger id="embarked">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">Cherbourg</SelectItem>
                  <SelectItem value="Q">Queenstown</SelectItem>
                  <SelectItem value="S">Southampton</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="age">Age: {formData.Age} years</Label>
              </div>
              <Slider
                id="age"
                min={0}
                max={80}
                step={1}
                value={[formData.Age]}
                onValueChange={([value]) => setFormData({ ...formData, Age: value })}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="fare">Fare: £{formData.Fare}</Label>
              </div>
              <Slider
                id="fare"
                min={0}
                max={500}
                step={5}
                value={[formData.Fare]}
                onValueChange={([value]) => setFormData({ ...formData, Fare: value })}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="sibsp">Siblings/Spouses: {formData.SibSp}</Label>
              </div>
              <Slider
                id="sibsp"
                min={0}
                max={8}
                step={1}
                value={[formData.SibSp]}
                onValueChange={([value]) => setFormData({ ...formData, SibSp: value })}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="parch">Parents/Children: {formData.Parch}</Label>
              </div>
              <Slider
                id="parch"
                min={0}
                max={6}
                step={1}
                value={[formData.Parch]}
                onValueChange={([value]) => setFormData({ ...formData, Parch: value })}
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Predict Survival"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
