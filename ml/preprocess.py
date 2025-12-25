"""
Data preprocessing and feature engineering for Titanic dataset
"""
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from typing import Tuple, Dict
import warnings
warnings.filterwarnings('ignore')


class TitanicPreprocessor:
    """Preprocessor for Titanic dataset with fairness-aware feature engineering"""
    
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_names = []
        self.sensitive_features = ['Sex', 'Pclass']
        
    def create_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Create engineered features"""
        df = df.copy()
        
        # Family size features
        df['FamilySize'] = df['SibSp'] + df['Parch'] + 1
        df['IsAlone'] = (df['FamilySize'] == 1).astype(int)
        
        # Title extraction from Name
        df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\.', expand=False)
        df['Title'] = df['Title'].replace(['Lady', 'Countess', 'Capt', 'Col', 
                                           'Don', 'Dr', 'Major', 'Rev', 'Sir', 
                                           'Jonkheer', 'Dona'], 'Rare')
        df['Title'] = df['Title'].replace('Mlle', 'Miss')
        df['Title'] = df['Title'].replace('Ms', 'Miss')
        df['Title'] = df['Title'].replace('Mme', 'Mrs')
        
        # Age group
        df['Age'].fillna(df['Age'].median(), inplace=True)
        df['AgeGroup'] = pd.cut(df['Age'], bins=[0, 12, 18, 35, 60, 100],
                                labels=['Child', 'Teen', 'Adult', 'MiddleAge', 'Senior'])
        
        # Fare per person
        df['Fare'].fillna(df['Fare'].median(), inplace=True)
        df['FarePerPerson'] = df['Fare'] / df['FamilySize']
        
        # Cabin deck (if available)
        df['HasCabin'] = df['Cabin'].notna().astype(int)
        df['Deck'] = df['Cabin'].str[0].fillna('Unknown')
        
        # Embarked
        df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)
        
        return df
    
    def fit_transform(self, df: pd.DataFrame, target_col: str = 'Survived') -> Tuple[np.ndarray, np.ndarray, pd.DataFrame]:
        """Fit preprocessor and transform data"""
        df = self.create_features(df)
        
        # Separate target
        y = df[target_col].values if target_col in df.columns else None
        
        # Select features for modeling
        feature_cols = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 
                       'Embarked', 'FamilySize', 'IsAlone', 'Title', 
                       'HasCabin', 'FarePerPerson', 'AgeGroup']
        
        df_features = df[feature_cols].copy()
        
        # Encode categorical variables
        categorical_cols = ['Sex', 'Embarked', 'Title', 'AgeGroup']
        for col in categorical_cols:
            le = LabelEncoder()
            df_features[col] = le.fit_transform(df_features[col].astype(str))
            self.label_encoders[col] = le
        
        self.feature_names = feature_cols
        
        # Scale features
        X = self.scaler.fit_transform(df_features)
        
        return X, y, df
    
    def transform(self, df: pd.DataFrame) -> np.ndarray:
        """Transform new data"""
        df = self.create_features(df)
        df_features = df[self.feature_names].copy()
        
        # Encode categorical variables
        categorical_cols = ['Sex', 'Embarked', 'Title', 'AgeGroup']
        for col in categorical_cols:
            if col in self.label_encoders:
                df_features[col] = self.label_encoders[col].transform(df_features[col].astype(str))
        
        # Scale features
        X = self.scaler.transform(df_features)
        return X
    
    def get_sensitive_attributes(self, df: pd.DataFrame) -> Dict[str, np.ndarray]:
        """Extract sensitive attributes for fairness analysis"""
        df = self.create_features(df)
        return {
            'sex': df['Sex'].map({'male': 1, 'female': 0}).values,
            'pclass': df['Pclass'].values
        }


def load_titanic_data() -> pd.DataFrame:
    """Load Titanic dataset (synthetic for demo purposes)"""
    # In production, this would load from actual CSV file
    # For demo, create synthetic data based on Titanic statistics
    np.random.seed(42)
    n_samples = 891
    
    data = {
        'PassengerId': range(1, n_samples + 1),
        'Survived': np.random.choice([0, 1], n_samples, p=[0.62, 0.38]),
        'Pclass': np.random.choice([1, 2, 3], n_samples, p=[0.24, 0.21, 0.55]),
        'Name': [f'Passenger_{i}' for i in range(n_samples)],
        'Sex': np.random.choice(['male', 'female'], n_samples, p=[0.65, 0.35]),
        'Age': np.random.normal(29.7, 14.5, n_samples).clip(0.42, 80),
        'SibSp': np.random.choice([0, 1, 2, 3, 4, 5, 8], n_samples, 
                                 p=[0.68, 0.23, 0.05, 0.02, 0.01, 0.005, 0.005]),
        'Parch': np.random.choice([0, 1, 2, 3, 4, 5, 6], n_samples,
                                 p=[0.76, 0.13, 0.08, 0.01, 0.01, 0.005, 0.005]),
        'Ticket': [f'TICKET_{i}' for i in range(n_samples)],
        'Fare': np.random.lognormal(3.2, 1.0, n_samples),
        'Cabin': [f'C{np.random.randint(1,100)}' if np.random.random() > 0.77 else np.nan 
                 for _ in range(n_samples)],
        'Embarked': np.random.choice(['C', 'Q', 'S'], n_samples, p=[0.19, 0.09, 0.72])
    }
    
    df = pd.DataFrame(data)
    
    # Apply realistic survival patterns
    survival_probs = np.zeros(n_samples)
    survival_probs[df['Sex'] == 'female'] += 0.5
    survival_probs[df['Pclass'] == 1] += 0.4
    survival_probs[df['Pclass'] == 2] += 0.2
    survival_probs[df['Age'] < 16] += 0.3
    survival_probs = np.clip(survival_probs / 1.2, 0.05, 0.95)
    
    df['Survived'] = (np.random.random(n_samples) < survival_probs).astype(int)
    
    return df


if __name__ == "__main__":
    # Test preprocessing
    df = load_titanic_data()
    preprocessor = TitanicPreprocessor()
    X, y, df_processed = preprocessor.fit_transform(df)
    print(f"Processed data shape: {X.shape}")
    print(f"Target distribution: {np.bincount(y)}")
