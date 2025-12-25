"""
Prediction and explanation utilities
"""
import numpy as np
import pandas as pd
import joblib
from pathlib import Path
from typing import Dict, List, Tuple
import warnings
warnings.filterwarnings('ignore')


class TitanicPredictor:
    """Handle predictions with SHAP explanations"""
    
    def __init__(self, model_path: str = 'ml/models/model.pkl', 
                 preprocessor_path: str = 'ml/models/preprocessor.pkl'):
        """Initialize predictor with saved model and preprocessor"""
        self.model = joblib.load(model_path)
        self.preprocessor = joblib.load(preprocessor_path)
        self.feature_names = self.preprocessor.feature_names
        
    def predict(self, passenger_data: Dict) -> Dict:
        """
        Predict survival probability for a passenger
        
        Args:
            passenger_data: Dict with keys: Pclass, Sex, Age, SibSp, Parch, Fare, Embarked, Name, Cabin
            
        Returns:
            Dict with prediction, probability, and feature importance
        """
        # Create DataFrame from input
        df = pd.DataFrame([passenger_data])
        
        # Preprocess
        X = self.preprocessor.transform(df)
        
        # Predict
        prediction = self.model.predict(X)[0]
        probability = self.model.predict_proba(X)[0]
        
        # Feature importance (for tree-based models)
        feature_importance = {}
        if hasattr(self.model, 'feature_importances_'):
            importance = self.model.feature_importances_
            feature_importance = dict(zip(self.feature_names, importance.tolist()))
            # Sort by importance
            feature_importance = dict(sorted(feature_importance.items(), 
                                           key=lambda x: x[1], 
                                           reverse=True)[:10])
        
        return {
            'survived': int(prediction),
            'probability': {
                'died': float(probability[0]),
                'survived': float(probability[1])
            },
            'feature_importance': feature_importance,
            'confidence': float(max(probability))
        }
    
    def batch_predict(self, passengers: List[Dict]) -> List[Dict]:
        """Predict for multiple passengers"""
        return [self.predict(p) for p in passengers]
    
    def explain_prediction(self, passenger_data: Dict) -> Dict:
        """
        Generate detailed explanation for a prediction
        
        Returns:
            Dict with prediction details and counterfactual analysis
        """
        result = self.predict(passenger_data)
        
        # Generate counterfactual: what if they were in a different class?
        counterfactuals = []
        for pclass in [1, 2, 3]:
            if pclass != passenger_data.get('Pclass', 3):
                cf_data = passenger_data.copy()
                cf_data['Pclass'] = pclass
                cf_result = self.predict(cf_data)
                counterfactuals.append({
                    'change': f'Passenger in Class {pclass}',
                    'new_probability': cf_result['probability']['survived'],
                    'difference': cf_result['probability']['survived'] - result['probability']['survived']
                })
        
        # What if different sex?
        cf_data = passenger_data.copy()
        cf_data['Sex'] = 'female' if passenger_data.get('Sex') == 'male' else 'male'
        cf_result = self.predict(cf_data)
        counterfactuals.append({
            'change': f'If {cf_data["Sex"]}',
            'new_probability': cf_result['probability']['survived'],
            'difference': cf_result['probability']['survived'] - result['probability']['survived']
        })
        
        result['counterfactuals'] = counterfactuals
        return result
    
    def get_feature_contributions(self, passenger_data: Dict) -> Dict:
        """Calculate how each feature contributes to the prediction"""
        df = pd.DataFrame([passenger_data])
        df_processed = self.preprocessor.create_features(df)
        
        # Get baseline prediction (median passenger)
        baseline_data = {
            'Pclass': 3,
            'Sex': 'male',
            'Age': 28,
            'SibSp': 0,
            'Parch': 0,
            'Fare': 14.5,
            'Embarked': 'S',
            'Name': 'Baseline',
            'Cabin': None
        }
        baseline_prob = self.predict(baseline_data)['probability']['survived']
        
        # Calculate contribution of each feature
        contributions = {}
        for feature in ['Pclass', 'Sex', 'Age', 'Fare']:
            temp_data = baseline_data.copy()
            temp_data[feature] = passenger_data[feature]
            temp_prob = self.predict(temp_data)['probability']['survived']
            contributions[feature] = temp_prob - baseline_prob
        
        return {
            'baseline_probability': baseline_prob,
            'actual_probability': self.predict(passenger_data)['probability']['survived'],
            'contributions': contributions
        }


def load_predictor() -> TitanicPredictor:
    """Load the trained predictor"""
    return TitanicPredictor()


if __name__ == "__main__":
    # Test predictions
    predictor = load_predictor()
    
    # Example passengers
    examples = [
        {
            'Pclass': 1,
            'Sex': 'female',
            'Age': 29,
            'SibSp': 0,
            'Parch': 0,
            'Fare': 211.34,
            'Embarked': 'S',
            'Name': 'Ms. Test Passenger',
            'Cabin': 'C85'
        },
        {
            'Pclass': 3,
            'Sex': 'male',
            'Age': 22,
            'SibSp': 1,
            'Parch': 0,
            'Fare': 7.25,
            'Embarked': 'S',
            'Name': 'Mr. Test Passenger',
            'Cabin': None
        }
    ]
    
    for i, passenger in enumerate(examples, 1):
        print(f"\nPassenger {i}:")
        result = predictor.explain_prediction(passenger)
        print(f"Survival Probability: {result['probability']['survived']:.2%}")
        print("Counterfactuals:")
        for cf in result['counterfactuals']:
            print(f"  {cf['change']}: {cf['new_probability']:.2%} (Δ {cf['difference']:+.2%})")
