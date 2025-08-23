# Deployment Guide

## Firebase Setup

1. **Create Firebase Project:**
   - Go to https://console.firebase.google.com
   - Create new project: "sibm-alumni-portal"
   - Enable Firestore Database

2. **Get Firebase Config:**
   - Go to Project Settings > General
   - Add web app, copy config
   - Replace config in `client/src/firebase.js`

3. **Setup Firestore:**
   - Create collection: `alumni`
   - Deploy rules: `firebase deploy --only firestore:rules`

## GitHub Pages Deployment

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/sibm-alumni.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Source: GitHub Actions
   - The workflow will auto-deploy on push

3. **Update Homepage:**
   - Edit `client/package.json`
   - Change homepage to: `https://yourusername.github.io/sibm-alumni`

## Live URL
Your site will be available at: `https://yourusername.github.io/sibm-alumni`

## Why Firebase over Google Sheets?

**Firebase Advantages:**
- Real-time updates
- Better search performance
- Scalable (handles thousands of alumni)
- Built-in security rules
- No API rate limits
- Professional database solution

**Google Sheets would have:**
- API rate limits (100 requests/100 seconds)
- Slower search performance
- Complex setup for real-time updates
- Not designed for web applications