"""
Train fairness-aware models for Titanic survival prediction
"""
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
import joblib
import json
import os
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

from preprocess import load_titanic_data, TitanicPreprocessor


class FairnessMetrics:
    """Calculate fairness metrics for model predictions"""
    
    @staticmethod
    def disparate_impact(y_pred, sensitive_attr):
        """Calculate disparate impact ratio"""
        privileged = sensitive_attr == 1
        unprivileged = sensitive_attr == 0
        
        priv_rate = y_pred[privileged].mean() if privileged.sum() > 0 else 0
        unpriv_rate = y_pred[unprivileged].mean() if unprivileged.sum() > 0 else 0
        
        if priv_rate == 0:
            return 0
        return unpriv_rate / priv_rate
    
    @staticmethod
    def equal_opportunity_difference(y_true, y_pred, sensitive_attr):
        """Calculate equal opportunity difference (TPR difference)"""
        privileged = sensitive_attr == 1
        unprivileged = sensitive_attr == 0
        
        # True positive rate for each group
        tpr_priv = (y_pred[privileged & (y_true == 1)].sum() / 
                   (y_true[privileged] == 1).sum() if (y_true[privileged] == 1).sum() > 0 else 0)
        tpr_unpriv = (y_pred[unprivileged & (y_true == 1)].sum() / 
                     (y_true[unprivileged] == 1).sum() if (y_true[unprivileged] == 1).sum() > 0 else 0)
        
        return abs(tpr_priv - tpr_unpriv)
    
    @staticmethod
    def demographic_parity_difference(y_pred, sensitive_attr):
        """Calculate demographic parity difference"""
        privileged = sensitive_attr == 1
        unprivileged = sensitive_attr == 0
        
        priv_rate = y_pred[privileged].mean() if privileged.sum() > 0 else 0
        unpriv_rate = y_pred[unprivileged].mean() if unprivileged.sum() > 0 else 0
        
        return abs(priv_rate - unpriv_rate)


def train_models():
    """Train multiple models and save the best one with fairness metrics"""
    
    print("Loading and preprocessing data...")
    df = load_titanic_data()
    preprocessor = TitanicPreprocessor()
    X, y, df_processed = preprocessor.fit_transform(df)
    
    # Get sensitive attributes
    sensitive_attrs = preprocessor.get_sensitive_attributes(df)
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Get test sensitive attributes
    train_idx = int(len(y) * 0.8)
    sex_test = sensitive_attrs['sex'][train_idx:]
    pclass_test = sensitive_attrs['pclass'][train_idx:]
    
    # Define models
    models = {
        'logistic_regression': LogisticRegression(max_iter=1000, random_state=42),
        'random_forest': RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10),
        'xgboost': XGBClassifier(n_estimators=100, random_state=42, max_depth=6, learning_rate=0.1)
    }
    
    results = {}
    best_model = None
    best_score = 0
    
    print("\nTraining models...")
    for name, model in models.items():
        print(f"\nTraining {name}...")
        model.fit(X_train, y_train)
        
        # Predictions
        y_pred = model.predict(X_test)
        y_pred_proba = model.predict_proba(X_test)[:, 1]
        
        # Performance metrics
        metrics = {
            'accuracy': accuracy_score(y_test, y_pred),
            'precision': precision_score(y_test, y_pred),
            'recall': recall_score(y_test, y_pred),
            'f1_score': f1_score(y_test, y_pred),
            'roc_auc': roc_auc_score(y_test, y_pred_proba)
        }
        
        # Fairness metrics by sex
        fairness_sex = {
            'disparate_impact': FairnessMetrics.disparate_impact(y_pred, sex_test),
            'equal_opportunity_diff': FairnessMetrics.equal_opportunity_difference(y_test, y_pred, sex_test),
            'demographic_parity_diff': FairnessMetrics.demographic_parity_difference(y_pred, sex_test)
        }
        
        # Fairness metrics by class (1st class vs others)
        pclass_privileged = (pclass_test == 1).astype(int)
        fairness_class = {
            'disparate_impact': FairnessMetrics.disparate_impact(y_pred, pclass_privileged),
            'equal_opportunity_diff': FairnessMetrics.equal_opportunity_difference(y_test, y_pred, pclass_privileged),
            'demographic_parity_diff': FairnessMetrics.demographic_parity_difference(y_pred, pclass_privileged)
        }
        
        results[name] = {
            'performance': metrics,
            'fairness_sex': fairness_sex,
            'fairness_class': fairness_class
        }
        
        print(f"Accuracy: {metrics['accuracy']:.4f}")
        print(f"ROC AUC: {metrics['roc_auc']:.4f}")
        print(f"Disparate Impact (Sex): {fairness_sex['disparate_impact']:.4f}")
        
        # Track best model by F1 score
        if metrics['f1_score'] > best_score:
            best_score = metrics['f1_score']
            best_model = (name, model)
    
    # Save best model and preprocessor
    print(f"\nBest model: {best_model[0]} with F1 score: {best_score:.4f}")
    
    # Create directories
    Path("ml/models").mkdir(parents=True, exist_ok=True)
    Path("data").mkdir(parents=True, exist_ok=True)
    
    # Save model and preprocessor
    joblib.dump(best_model[1], 'ml/models/model.pkl')
    joblib.dump(preprocessor, 'ml/models/preprocessor.pkl')
    
    # Save results
    with open('ml/models/metrics.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    # Save training data for reference
    df_processed.to_csv('data/titanic_processed.csv', index=False)
    
    print("\nModel training complete!")
    print(f"Model saved to: ml/models/model.pkl")
    print(f"Preprocessor saved to: ml/models/preprocessor.pkl")
    print(f"Metrics saved to: ml/models/metrics.json")
    
    return results


if __name__ == "__main__":
    results = train_models()
