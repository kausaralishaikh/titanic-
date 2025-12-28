"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  BarChart3,
  Shield,
  Code2,
  Database,
  GitBranch,
  Layers,
  Zap,
  ChevronRight,
  Book,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  FileText,
  Github,
  Linkedin,
  Mail,
} from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-4 gap-1" variant="outline">
              <Zap className="size-3" />
              Machine Learning Fairness
            </Badge>
            <h1 className="text-balance mb-6 text-4xl font-bold tracking-tight lg:text-6xl">
              Titanic Survival Fairness Audit
            </h1>
            <p className="text-pretty mx-auto mb-8 max-w-2xl text-lg text-muted-foreground lg:text-xl">
              An advanced machine learning system designed to detect, analyze, and mitigate algorithmic bias in Titanic
              survival predictions using fairness-aware algorithms and comprehensive audit tools.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/">
                  <Activity className="size-4" />
                  Try Live Demo
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                <Github className="size-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </section>

      {/* Purpose & Overview */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Purpose & Overview</h2>
            <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
              Addressing the critical challenge of fairness in machine learning systems
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <Shield className="mb-2 size-10 text-primary" />
                <CardTitle>Why Fairness Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <p>
                  Machine learning models can inadvertently perpetuate or amplify existing biases present in training
                  data. This project addresses that critical issue by implementing comprehensive fairness audits.
                </p>
                <p>
                  Using the historical Titanic dataset, we demonstrate how to identify disparate impact across protected
                  groups such as gender and passenger class, ensuring equitable predictions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="mb-2 size-10 text-primary" />
                <CardTitle>Project Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span>Detect and quantify algorithmic bias in survival predictions</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span>Provide actionable fairness metrics and visualizations</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span>Demonstrate bias mitigation techniques in production</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span>Enable transparent, explainable AI decision-making</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="border-y bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Key Features</h2>
              <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
                Comprehensive tools for fairness analysis and bias mitigation
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Activity className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Real-Time Predictions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Get instant survival predictions with confidence scores and probability distributions for individual
                  passengers.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Feature Importance</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Understand which features drive predictions with SHAP-style feature contribution analysis and
                  visualizations.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Fairness Metrics</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Comprehensive fairness analysis including disparate impact, equal opportunity, and demographic parity
                  across groups.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <GitBranch className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Counterfactual Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Explore what-if scenarios showing how changing specific features would affect prediction outcomes.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <AlertTriangle className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Bias Detection</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Automatic identification of potential biases with detailed reports and mitigation recommendations.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="mb-2 size-8 text-primary" />
                  <CardTitle className="text-lg">Interactive Visualizations</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Partial dependence plots, feature importance charts, and fairness dashboards for comprehensive
                  analysis.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Used */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Technologies Used</h2>
            <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
              Built with modern, production-ready technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Code2 className="size-6 text-primary" />
                <h3 className="text-xl font-semibold">Frontend</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Next.js 16 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  React 19 with TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  shadcn/ui Components
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Recharts for Visualizations
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <Database className="size-6 text-primary" />
                <h3 className="text-xl font-semibold">Backend & ML</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Python 3.11 Runtime
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  XGBoost Classifier
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  scikit-learn
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  pandas & NumPy
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Next.js API Routes
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <Zap className="size-6 text-primary" />
                <h3 className="text-xl font-semibold">Deployment</h3>
              </div>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Vercel Platform
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Serverless Functions
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Edge Network CDN
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Automatic CI/CD
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="size-4" />
                  Analytics Integration
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">How It Works</h2>
              <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
                A comprehensive pipeline from data to actionable insights
              </p>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <CardTitle>Data Preprocessing</CardTitle>
                      <CardDescription className="mt-2">
                        The system loads historical Titanic passenger data and performs comprehensive preprocessing
                        including feature engineering, missing value imputation, and categorical encoding to prepare
                        data for model training.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <CardTitle>Model Training & Validation</CardTitle>
                      <CardDescription className="mt-2">
                        An XGBoost gradient boosting classifier is trained with cross-validation. The model learns
                        patterns from features like passenger class, gender, age, fare, and embarkation point to predict
                        survival probability.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <CardTitle>Fairness Audit</CardTitle>
                      <CardDescription className="mt-2">
                        Comprehensive fairness metrics are calculated across protected groups. The system evaluates
                        disparate impact, equal opportunity differences, and demographic parity to identify potential
                        biases in predictions.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      4
                    </div>
                    <div>
                      <CardTitle>Explainability & Insights</CardTitle>
                      <CardDescription className="mt-2">
                        Feature importance analysis and SHAP-style explanations provide transparency into model
                        decisions. Users can explore counterfactuals to understand how different features affect
                        outcomes.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      5
                    </div>
                    <div>
                      <CardTitle>Interactive Dashboard</CardTitle>
                      <CardDescription className="mt-2">
                        Results are presented through an intuitive web interface with real-time predictions, interactive
                        visualizations, and comprehensive fairness reports to enable informed decision-making.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">API Documentation</h2>
            <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
              RESTful API endpoints for programmatic access
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">POST</Badge>
                    <code className="text-sm">/api/predict</code>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Activity className="size-3" />
                    Core API
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-muted-foreground">
                  Get survival prediction for a passenger with probability scores and confidence metrics.
                </p>
                <div className="rounded-lg bg-muted p-4">
                  <p className="mb-2 text-sm font-medium">Request Body:</p>
                  <pre className="overflow-x-auto text-xs">
                    {JSON.stringify(
                      {
                        Pclass: 1,
                        Sex: "female",
                        Age: 29,
                        SibSp: 0,
                        Parch: 0,
                        Fare: 100,
                        Embarked: "S",
                        Name: "Jane Doe",
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">POST</Badge>
                    <code className="text-sm">/api/explain</code>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <FileText className="size-3" />
                    Explainability
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get detailed explanations including feature contributions and counterfactual analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">/api/fairness</code>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Shield className="size-3" />
                    Fairness Metrics
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Retrieve comprehensive fairness metrics including disparate impact and equal opportunity analysis.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">/api/feature-importance</code>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <BarChart3 className="size-3" />
                    Analysis
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get feature importance scores and partial dependence data for visualization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="border-y bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-balance mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Getting Started</h2>
              <p className="text-pretty mx-auto max-w-2xl text-lg text-muted-foreground">
                Deploy your own instance in minutes
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Local Development</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">1. Clone the repository</p>
                    <div className="rounded-lg bg-muted p-3">
                      <code className="text-xs">git clone https://github.com/yourusername/titanic-fairness-audit</code>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">2. Install dependencies</p>
                    <div className="rounded-lg bg-muted p-3">
                      <code className="text-xs">npm install && pip install -r requirements.txt</code>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">3. Train the model</p>
                    <div className="rounded-lg bg-muted p-3">
                      <code className="text-xs">python ml/train_model.py</code>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">4. Start development server</p>
                    <div className="rounded-lg bg-muted p-3">
                      <code className="text-xs">npm run dev</code>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Deploy to Vercel</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">1. Push to GitHub</p>
                    <div className="rounded-lg bg-muted p-3">
                      <code className="text-xs">git push origin main</code>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">2. Import to Vercel</p>
                    <p className="text-sm text-muted-foreground">
                      Connect your GitHub repository to Vercel through the dashboard
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">3. Configure build settings</p>
                    <p className="text-sm text-muted-foreground">
                      Vercel automatically detects Next.js and Python requirements
                    </p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">4. Deploy</p>
                    <p className="text-sm text-muted-foreground">
                      Your application will be live with automatic HTTPS and global CDN
                    </p>
                  </div>
                  <Button className="mt-4 w-full gap-2">
                    <ExternalLink className="size-4" />
                    Deploy Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <Separator className="mb-12" />
          <div className="text-center">
            <div className="mb-6 flex items-center justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                KS
              </div>
            </div>
            <h2 className="mb-2 text-3xl font-bold">Kausar Ali Shaikh</h2>
            <p className="mb-6 text-lg text-muted-foreground">Author & Developer</p>

            <Card className="mx-auto max-w-2xl text-left">
              <CardContent className="pt-6">
                <div className="mb-6 flex items-center gap-2">
                  <Book className="size-5 text-primary" />
                  <h3 className="text-xl font-semibold">About the Author</h3>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  I am passionate about building ethical AI systems that prioritize fairness, transparency, and
                  accountability. This project represents my commitment to addressing algorithmic bias and promoting
                  responsible machine learning practices. Through comprehensive fairness audits and explainable AI
                  techniques, I aim to create tools that empower developers and organizations to build more equitable
                  technology. My work focuses on bridging the gap between cutting-edge machine learning capabilities and
                  real-world ethical considerations, ensuring that AI systems serve all users fairly and transparently.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Github className="size-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Mail className="size-4" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-3 font-semibold">Project</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link href="/" className="hover:text-foreground">
                      Live Demo
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="hover:text-foreground">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      GitHub Repository
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      API Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Research Papers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Contributing Guide
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-3 font-semibold">Connect</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Report Issues
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Request Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-foreground">
                      Community Discussions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-8" />
            <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
              <p>© 2025 Kausar Ali Shaikh. Built with Next.js, XGBoost, and Fairness-Aware ML.</p>
              <p>Licensed under MIT</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
