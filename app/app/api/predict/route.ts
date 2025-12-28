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

    // In a real deployment, this would call the Python API
    // For now, we'll return mock data
    const mockPrediction = {
      survived: body.Sex === "female" || body.Pclass === 1 ? 1 : 0,
      probability: {
        died: body.Sex === "male" && body.Pclass === 3 ? 0.75 : 0.35,
        survived: body.Sex === "female" || body.Pclass === 1 ? 0.85 : 0.25,
      },
      feature_importance: {
        Sex: 0.35,
        Pclass: 0.25,
        Fare: 0.15,
        Age: 0.12,
        FamilySize: 0.08,
        Embarked: 0.05,
      },
      confidence: body.Sex === "female" || body.Pclass === 1 ? 0.85 : 0.75,
    }

    return NextResponse.json(mockPrediction)
  } catch (error) {
    console.error("[v0] Prediction error:", error)
    return NextResponse.json({ error: "Failed to generate prediction" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Titanic Survival Prediction API",
    version: "1.0.0",
    endpoints: {
      POST: "/api/predict - Generate survival prediction",
    },
  })
}
