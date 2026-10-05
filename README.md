# 🛡️ CyberSafe | Wispr Flow Voice-Driven Development Challenge

> **CyberSafe** is an advanced, reactive cybersecurity awareness platform engineered for the **Wispr Flow Voice-Driven Development Challenge**. It empowers users with real-time defense intelligence, password entropy calculations, realistic phishing simulations, client-side URL threat inspection, and hands-free voice navigation.

![CyberSafe Preview](https://img.shields.io/badge/Security-Fortified-06b6d4?style=for-the-badge&logo=shield)
![Tech Stack](https://img.shields.io/badge/Vite-React%2019-3b82f6?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=for-the-badge&logo=tailwindcss)
![Architecture](https://img.shields.io/badge/Architecture-100%25_Frontend_Only-10b981?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Render-Static_Site_Ready-46e3b7?style=for-the-badge&logo=render)

---

## 🌟 Key Features

### 1. 📊 Security Command Center (Dashboard)
- **Dynamic Security Posture Gauge**: Animated SVG radial gauge displaying real-time composite security score (0–100) and defense tier.
- **4 Core Defense Pillar KPI Cards**: Instant status indicators for Password Defense, Phishing Lab, URL Threat Scanner, and Hygiene Radar.
- **Live Simulated Threat Feed**: Real-time advisories on Quishing, MFA Fatigue, and zero-day attack trends.
- **Persistent Activity Timeline**: Tracks and logs all user scans and assessments locally.

### 2. 🔑 Password Strength Analyzer & CSPRNG Generator
- **Information Entropy Calculation**: Calculates exact bit entropy ($E = L \times \log_2(R)$) and estimated crack times against modern GPU clusters.
- **Breach Database Check**: Real-time matching against a dictionary of the most frequently compromised passwords with NIST 800-63B guidelines.
- **Comprehensive Criteria Engine**: Evaluates length, character diversity, repetitive sequences, and common keyboard patterns.
- **Fortified Generator**: Customizable length (8–32 chars), character pools, and ambiguous character avoidance with one-click clipboard copying.
- **Voice Dictation**: Dictate secure passphrases directly into the evaluator.

### 3. 🎣 Phishing & Social Engineering Lab
- **Realistic Scenario Simulations**:
  - Business Email Compromise (CEO wire & gift card fraud)
  - Smishing (SMS postal redelivery phishing)
  - Quishing (Breakroom QR code SSO harvest)
  - MFA Fatigue Attack (Authenticator push prompt flooding)
  - Double Extension Executable (`.pdf.exe` masquerade)
  - Cross-Platform Credential Harvesting (Google Doc requiring Microsoft SSO)
- **Cognitive Red Flag Highlighting**: Explains exact social engineering triggers.
- **Printable Certificate of Cybersecurity Awareness**: Generates an official, customizable certificate with verification hash upon passing.

### 4. 🔗 URL & Phishing Threat Inspector
- **Heuristic Threat Engine**:
  - Unencrypted HTTP transport detection
  - Raw IP address hostname identification
  - High-risk TLD analysis (`.xyz`, `.top`, `.tk`, `.zip`, `.mov`, `.cam`, etc.)
  - Punycode & IDN Homoglyph attack detection (Cyrillic character substitution)
  - Brand typosquatting heuristics (PayPal, Google, Apple, Microsoft, Amazon, Chase)
  - Subdomain depth stacking and credential harvesting lures
- **Threat Index (0–100%)**: Instant verdict classification (Safe, Low Risk, Suspicious, Dangerous Phishing).
- **1-Click Attack Presets**: Test real-world scenarios instantly.

### 5. 🩺 Security Health Score & Hygiene Radar
- **Mathematical Composite Health Score**:
  - Password Defense: Up to 25 pts
  - Phishing Simulation: Up to 25 pts
  - URL Scanner Audits: Up to 20 pts
  - Daily Hygiene Checklist: Up to 30 pts
- **Interactive 8-Point Defense Checklist**: Immediate live score recalculation upon toggling controls.
- **Audit Report Export**: One-click JSON download for compliance or personal review.

### 6. 📚 Cyber Defense Knowledge Hub & Threat Glossary
- **Actionable Best Practices**: Curated security advice across Passwords, Phishing, Browsing, Endpoint, and Network domains.
- **Tip of the Day**: Interactive spotlight with bookmarking and "Mark as Mastered" tracker.
- **Threat Glossary**: Quick reference definitions for Ransomware, MitM, Zero-Day, Quishing, Smishing, and more.

### 7. 🎙️ Wispr Flow Voice-Driven Controller
- **Hands-Free Navigation**: Built using the Web Speech API with automatic speech recognition and speech synthesis voice responses.
- **Recognized Voice Commands**:
  - *"Check password"* / *"Test password strength"*
  - *"Take phishing quiz"* / *"Start quiz"*
  - *"Scan URL"* / *"Check link"*
  - *"What is my security score?"*
  - *"Show security tips"* / *"Knowledge hub"*
  - *"Generate password"*
  - *"Go to dashboard"*
- **Visual Waveform & Fallback Simulator**: Features an animated audio waveform during listening and 1-click simulated command buttons for environments without microphone permissions.

---

## 🔒 Privacy & Architecture

- **100% Frontend-Only**: No backend server, no database, no third-party API dependencies.
- **Zero Data Leakage**: All passwords, URLs, and quiz responses are evaluated in browser memory and persisted only to client `localStorage`.
- **Fast & Lightweight**: Built with Vite and Tailwind CSS v4, achieving sub-second production builds (< 850ms).

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd cybersafe-wispr-flow

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🌐 Deploying to Render (Static Site)

CyberSafe is pre-configured for deployment as a static site on Render:

### Option 1: Automatic Blueprint (`render.yaml`)
1. Push your repository to GitHub or GitLab.
2. In the Render Dashboard, click **New +** and select **Blueprint**.
3. Connect your repository. Render will automatically detect `render.yaml` and configure the static site.

### Option 2: Manual Static Site Setup
1. In the Render Dashboard, click **New +** > **Static Site**.
2. Connect your repository.
3. Configure the following build settings:
   - **Name**: `cybersafe`
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
5. Click **Create Static Site**.

---

## 🛠️ Built With
- **Vite** - High-performance next-generation frontend build tooling
- **React 19** - Component architecture and reactive state management
- **Tailwind CSS v4** - Clean modern cybersecurity dark-mode design system
- **Lucide React** - High-clarity iconography
- **Canvas Confetti** - Certification celebration animations
- **Web Speech API** - Voice recognition and dictation for the Wispr Flow challenge

---

## 📜 License
MIT License. Created for the Wispr Flow Voice-Driven Development Challenge.
