"""
Create synthetic Titanic dataset for demonstration
This script generates realistic data based on historical Titanic statistics
"""
import pandas as pd
import numpy as np
import os
from pathlib import Path

def create_titanic_dataset(n_samples=891):
    """Generate synthetic Titanic dataset with realistic distributions"""
    np.random.seed(42)
    
    # Basic demographics
    passenger_ids = range(1, n_samples + 1)
    pclass = np.random.choice([1, 2, 3], n_samples, p=[0.24, 0.21, 0.55])
    sex = np.random.choice(['male', 'female'], n_samples, p=[0.65, 0.35])
    age = np.random.normal(29.7, 14.5, n_samples).clip(0.42, 80)
    
    # Family information
    sibsp = np.random.choice([0, 1, 2, 3, 4, 5, 8], n_samples, 
                            p=[0.68, 0.23, 0.05, 0.02, 0.01, 0.005, 0.005])
    parch = np.random.choice([0, 1, 2, 3, 4, 5, 6], n_samples,
                            p=[0.76, 0.13, 0.08, 0.01, 0.01, 0.005, 0.005])
    
    # Ticket and fare information
    fare = np.random.lognormal(3.2, 1.0, n_samples).clip(0, 512)
    embarked = np.random.choice(['C', 'Q', 'S'], n_samples, p=[0.19, 0.09, 0.72])
    
    # Generate names based on sex
    male_titles = ['Mr', 'Master', 'Rev', 'Dr', 'Col', 'Major', 'Capt']
    female_titles = ['Miss', 'Mrs', 'Ms', 'Lady', 'Countess', 'Dona']
    
    names = []
    for s, a in zip(sex, age):
        if s == 'male':
            if a < 15:
                title = 'Master'
            else:
                title = np.random.choice(male_titles, p=[0.8, 0.05, 0.05, 0.03, 0.03, 0.02, 0.02])
        else:
            if a < 18:
                title = 'Miss'
            else:
                title = np.random.choice(female_titles, p=[0.4, 0.5, 0.05, 0.02, 0.02, 0.01])
        
        surname = f"Passenger{len(names)+1}"
        firstname = f"Test{len(names)+1}"
        names.append(f"{surname}, {title}. {firstname}")
    
    # Cabin information (most missing)
    cabins = []
    for _ in range(n_samples):
        if np.random.random() > 0.77:
            deck = np.random.choice(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'T'])
            number = np.random.randint(1, 150)
            cabins.append(f"{deck}{number}")
        else:
            cabins.append(None)
    
    # Generate realistic survival patterns
    survival_probs = np.zeros(n_samples)
    
    # Women and children first
    survival_probs[sex == 'female'] += 0.5
    survival_probs[age < 16] += 0.3
    
    # Class matters
    survival_probs[pclass == 1] += 0.4
    survival_probs[pclass == 2] += 0.2
    survival_probs[pclass == 3] -= 0.1
    
    # High fare (wealthier) passengers
    survival_probs[fare > 50] += 0.2
    
    # Family effects (very large families struggled)
    family_size = sibsp + parch + 1
    survival_probs[family_size > 4] -= 0.2
    survival_probs[(family_size >= 2) & (family_size <= 4)] += 0.1
    
    # Normalize probabilities
    survival_probs = np.clip(survival_probs / 1.5, 0.05, 0.95)
    
    # Generate survival outcomes
    survived = (np.random.random(n_samples) < survival_probs).astype(int)
    
    # Create DataFrame
    df = pd.DataFrame({
        'PassengerId': passenger_ids,
        'Survived': survived,
        'Pclass': pclass,
        'Name': names,
        'Sex': sex,
        'Age': age,
        'SibSp': sibsp,
        'Parch': parch,
        'Ticket': [f'TICKET_{i}' for i in passenger_ids],
        'Fare': fare,
        'Cabin': cabins,
        'Embarked': embarked
    })
    
    return df


def main():
    """Create and save demonstration dataset"""
    print("Creating synthetic Titanic dataset...")
    
    # Create data directory
    Path("data").mkdir(exist_ok=True)
    
    # Generate data
    df = create_titanic_dataset(n_samples=891)
    
    # Save to CSV
    output_path = "data/titanic.csv"
    df.to_csv(output_path, index=False)
    
    print(f"\n✓ Dataset created: {output_path}")
    print(f"  Total passengers: {len(df)}")
    print(f"  Survival rate: {df['Survived'].mean():.1%}")
    print(f"\nClass distribution:")
    print(df['Pclass'].value_counts().sort_index())
    print(f"\nSex distribution:")
    print(df['Sex'].value_counts())
    print(f"\nSurvival by sex:")
    print(df.groupby('Sex')['Survived'].mean())
    print(f"\nSurvival by class:")
    print(df.groupby('Pclass')['Survived'].mean())
    

if __name__ == "__main__":
    main()
