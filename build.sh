#!/bin/bash
# Build script for Vercel deployment

# Install Python dependencies
pip install -r requirements.txt

# Train model if not exists
python ml/train_model.py

# Build Next.js app
npm run build
