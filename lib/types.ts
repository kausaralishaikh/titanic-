export interface PassengerInput {
  Pclass: 1 | 2 | 3
  Sex: "male" | "female"
  Age: number
  SibSp: number
  Parch: number
  Fare: number
  Embarked: "C" | "Q" | "S"
  Name: string
  Cabin?: string | null
}

export interface PredictionResult {
  survived: number
  probability: {
    died: number
    survived: number
  }
  feature_importance: Record<string, number>
  confidence: number
}

export interface ExplanationResult extends PredictionResult {
  counterfactuals: Array<{
    change: string
    new_probability: number
    difference: number
  }>
}

export interface FairnessMetrics {
  disparate_impact: number
  equal_opportunity_diff: number
  demographic_parity_diff: number
}

export interface ModelMetrics {
  performance: {
    accuracy: number
    precision: number
    recall: number
    f1_score: number
    roc_auc: number
  }
  fairness_sex: FairnessMetrics
  fairness_class: FairnessMetrics
}

export interface FeatureContribution {
  baseline_probability: number
  actual_probability: number
  contributions: Record<string, number>
}
