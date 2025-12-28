import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked", "Name"]
    for (const field of requiredFields) {
      if (!(field in body)) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Mock explanation with counterfactuals
    const baseProb = body.Sex === "female" || body.Pclass === 1 ? 0.85 : 0.25

    const mockExplanation = {
      survived: body.Sex === "female" || body.Pclass === 1 ? 1 : 0,
      probability: {
        died: 1 - baseProb,
        survived: baseProb,
      },
      feature_importance: {
        Sex: 0.35,
        Pclass: 0.25,
        Fare: 0.15,
        Age: 0.12,
        FamilySize: 0.08,
        Embarked: 0.05,
      },
      confidence: baseProb,
      counterfactuals: [
        {
          change: "Passenger in Class 1",
          new_probability: Math.min(baseProb + 0.3, 0.95),
          difference: body.Pclass === 1 ? 0 : 0.3,
        },
        {
          change: "Passenger in Class 2",
          new_probability: baseProb + (body.Pclass === 2 ? 0 : 0.15),
          difference: body.Pclass === 2 ? 0 : 0.15,
        },
        {
          change: `If ${body.Sex === "male" ? "female" : "male"}`,
          new_probability: body.Sex === "male" ? 0.75 : 0.3,
          difference: body.Sex === "male" ? 0.5 : -0.45,
        },
      ],
    }

    return NextResponse.json(mockExplanation)
  } catch (error) {
    console.error("[v0] Explanation error:", error)
    return NextResponse.json({ error: "Failed to generate explanation" }, { status: 500 })
  }
}
