import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock feature importance data
    const featureImportance = {
      global_importance: [
        { feature: "Sex", importance: 0.348, description: "Gender of passenger" },
        { feature: "Pclass", importance: 0.252, description: "Ticket class (1st, 2nd, 3rd)" },
        { feature: "Fare", importance: 0.158, description: "Ticket fare paid" },
        { feature: "Age", importance: 0.121, description: "Age in years" },
        { feature: "FamilySize", importance: 0.087, description: "Total family members aboard" },
        { feature: "Embarked", importance: 0.034, description: "Port of embarkation" },
      ],
      interaction_effects: [
        {
          features: ["Sex", "Pclass"],
          strength: 0.42,
          description: "Female passengers in 1st/2nd class had highest survival",
        },
        {
          features: ["Age", "Pclass"],
          strength: 0.28,
          description: "Children in all classes prioritized, especially upper classes",
        },
        {
          features: ["FamilySize", "Pclass"],
          strength: 0.19,
          description: "Small families in upper classes had better outcomes",
        },
      ],
      partial_dependence: {
        Age: [
          { value: 0, effect: 0.45 },
          { value: 10, effect: 0.52 },
          { value: 20, effect: 0.38 },
          { value: 30, effect: 0.32 },
          { value: 40, effect: 0.28 },
          { value: 50, effect: 0.25 },
          { value: 60, effect: 0.22 },
          { value: 70, effect: 0.2 },
        ],
        Fare: [
          { value: 0, effect: 0.22 },
          { value: 10, effect: 0.28 },
          { value: 20, effect: 0.35 },
          { value: 50, effect: 0.48 },
          { value: 100, effect: 0.62 },
          { value: 200, effect: 0.71 },
          { value: 300, effect: 0.75 },
        ],
      },
    }

    return NextResponse.json(featureImportance)
  } catch (error) {
    console.error("[v0] Feature importance error:", error)
    return NextResponse.json({ error: "Failed to load feature importance" }, { status: 500 })
  }
}
