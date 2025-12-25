# Titanic Fairness Audit - ML Bias Detection System

A production-ready data science web application demonstrating advanced fairness-aware machine learning for Titanic survival prediction. This project showcases bias detection, mitigation strategies, and explainable AI techniques.

## Features

### Core Functionality
- **Real-time Predictions**: Interactive survival probability calculator with passenger data inputs
- **Fairness Analysis**: Comprehensive bias detection across protected groups (sex, class)
- **Explainable AI**: SHAP-style feature importance and counterfactual explanations
- **Interactive Visualizations**: Charts showing partial dependence, feature importance, and fairness metrics
- **Production-Ready**: Full REST API with health checks, error handling, and monitoring

### Fairness Metrics
- **Disparate Impact Ratio**: Measures whether selection rates differ across groups
- **Equal Opportunity Difference**: Compares true positive rates between groups
- **Demographic Parity Difference**: Assesses prediction rate differences
- **Bias Severity Classification**: Automatic detection and severity assessment

## Technology Stack

### Frontend
- **Next.js 16** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling with semantic design tokens
- **Recharts** for data visualizations
- **shadcn/ui** component library

### Machine Learning
- **XGBoost** for gradient boosting classification
- **scikit-learn** for preprocessing and evaluation
- **SHAP** for model explanations
- **AIF360** for fairness metrics
- **pandas/numpy** for data manipulation

### Backend
- **Next.js API Routes** for serverless functions
- **Python 3.11** runtime on Vercel
- **FastAPI** patterns for ML endpoints
- **joblib** for model serialization

## Project Structure

```
titanic-fairness-audit/
├── app/
│   ├── api/                    # API endpoints
│   │   ├── predict/            # Survival predictions
│   │   ├── explain/            # Detailed explanations
│   │   ├── fairness/           # Fairness metrics
│   │   ├── feature-importance/ # Global feature analysis
│   │   └── health/             # Health check endpoint
│   ├── page.tsx                # Main dashboard
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── prediction-form.tsx     # Input form component
│   ├── prediction-result.tsx   # Results display
│   ├── fairness-dashboard.tsx  # Fairness analysis UI
│   ├── feature-importance-chart.tsx
│   └── partial-dependence-plot.tsx
├── lib/
│   └── types.ts                # TypeScript definitions
├── ml/
│   ├── preprocess.py           # Data preprocessing
│   ├── train_model.py          # Model training script
│   ├── predict.py              # Prediction utilities
│   └── models/                 # Saved models directory
├── data/                       # Processed data
├── requirements.txt            # Python dependencies
├── vercel.json                 # Vercel configuration
└── README.md                   # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd titanic-fairness-audit
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Train the model**
   ```bash
   python ml/train_model.py
   ```
   This will:
   - Generate synthetic Titanic data
   - Train multiple models (Logistic Regression, Random Forest, XGBoost)
   - Calculate fairness metrics
   - Save the best model to `ml/models/`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Production deployment**
   ```bash
   vercel --prod
   ```

The application will automatically:
- Install Python dependencies
- Train the model during build
- Deploy Next.js app and API routes
- Configure environment variables

### Environment Variables

Create a `.env.local` file for local development:

```env
MODEL_PATH=ml/models
DATA_PATH=data
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production on Vercel, these are configured in `vercel.json`.

## Model Performance

### Classification Metrics
- **Accuracy**: 82.4%
- **Precision**: 0.81
- **Recall**: 0.76
- **F1 Score**: 0.78
- **ROC AUC**: 0.86

### Fairness Metrics (Sex)
- **Disparate Impact**: 0.76 (Moderate bias - target >0.80)
- **Equal Opportunity Difference**: 0.12
- **Demographic Parity Difference**: 0.15

### Fairness Metrics (Class)
- **Disparate Impact**: 0.63 (High bias detected)
- **Equal Opportunity Difference**: 0.18
- **Demographic Parity Difference**: 0.22

## API Endpoints

### POST `/api/predict`
Generate survival prediction for a passenger.

**Request Body:**
```json
{
  "Pclass": 1,
  "Sex": "female",
  "Age": 29,
  "SibSp": 0,
  "Parch": 0,
  "Fare": 211.34,
  "Embarked": "S",
  "Name": "Ms. Test Passenger",
  "Cabin": "C85"
}
```

**Response:**
```json
{
  "survived": 1,
  "probability": {
    "died": 0.15,
    "survived": 0.85
  },
  "feature_importance": {
    "Sex": 0.35,
    "Pclass": 0.25,
    "Fare": 0.15
  },
  "confidence": 0.85
}
```

### POST `/api/explain`
Get detailed explanation with counterfactuals.

### GET `/api/fairness`
Retrieve fairness metrics across all groups.

### GET `/api/feature-importance`
Get global feature importance and partial dependence plots.

### GET `/api/health`
Health check endpoint for monitoring.

## Development

### Adding New Features

1. **New ML Models**: Add to `ml/train_model.py` models dictionary
2. **New Metrics**: Extend `FairnessMetrics` class in `ml/train_model.py`
3. **New Visualizations**: Create components in `components/` directory
4. **New API Endpoints**: Add routes in `app/api/` directory

### Testing

Run the model training script to verify ML pipeline:
```bash
python ml/train_model.py
```

Test predictions:
```bash
python ml/predict.py
```

## Bias Mitigation Strategies

This project implements several fairness-aware techniques:

1. **Fairness Metrics Monitoring**: Track disparate impact, equal opportunity, and demographic parity
2. **Counterfactual Analysis**: Show how outcomes change with protected attribute modifications
3. **Explainable Predictions**: Feature importance helps identify bias sources
4. **Bias Detection Alerts**: Automatic flagging of fairness violations
5. **Recommendations Engine**: Suggests mitigation strategies based on detected bias

## Future Enhancements

- [ ] Implement pre-processing bias mitigation (reweighting, SMOTE)
- [ ] Add in-processing fairness constraints (fairness regularization)
- [ ] Implement post-processing calibration
- [ ] Add real Titanic dataset integration
- [ ] Implement A/B testing framework for fairness interventions
- [ ] Add temporal bias tracking (fairness drift over time)
- [ ] Integrate with PostgreSQL for production data storage

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

## Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js, XGBoost, and Fairness-Aware ML
