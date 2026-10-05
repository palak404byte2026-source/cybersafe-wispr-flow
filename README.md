# 🛡️ CyberSafe — Cybersecurity Awareness Dashboard

> **CyberSafe** is an interactive, privacy-first cybersecurity awareness platform engineered for the **Wispr Flow Voice-Driven Development Challenge**. It empowers users to elevate their personal security posture through real-time password entropy analysis, realistic phishing simulations, client-side URL safety inspection, a unified security health scoreboard, and hands-free voice navigation.

[![Security](https://img.shields.io/badge/Security-Fortified-06b6d4?style=for-the-badge&logo=shield)](https://github.com/palak404byte2026-source/CyberSafe-Wispr-Flow)
[![Vite](https://img.shields.io/badge/Vite-v8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Architecture-100%25_Frontend_Only-10b981?style=for-the-badge)](https://github.com/palak404byte2026-source/CyberSafe-Wispr-Flow)
[![Render](https://img.shields.io/badge/Render-Static_Site_Ready-46e3b7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

---

## 🔗 Live Demo & Video Presentation

| Resource | Link |
| :--- | :--- |
| 🌐 **Live Web Application (Render)** | [https://cybersafe-wispr-flow.onrender.com](https://cybersafe-wispr-flow.onrender.com) *(Configure your Render deployment link here)* |
| 🎥 **Wispr Flow Voice Demo Video** | [https://youtu.be/your-demo-video-link](https://youtu.be/your-demo-video-link) *(Add your demonstration video URL here)* |

---

## 🎙️ Voice-Driven Development with Wispr Flow

CyberSafe was designed and built embracing **voice-driven development** inspired by **Wispr Flow**. The application features an integrated, hands-free voice controller that lets users navigate modules, launch audits, and generate secure keys via natural speech commands.

### Supported Voice Commands:
- 🗣️ **"Check password"** / **"Test password strength"** $\rightarrow$ Opens the Password Strength Checker
- 🗣️ **"Take phishing quiz"** / **"Test me"** $\rightarrow$ Launches the Phishing Awareness Quiz
- 🗣️ **"Scan URL"** / **"Check link"** $\rightarrow$ Opens the URL Safety & Threat Evaluator
- 🗣️ **"What is my score?"** $\rightarrow$ Navigates to the Overall Security Scorecard with spoken speech feedback
- 🗣️ **"Show security tips"** $\rightarrow$ Opens the Cybersecurity Knowledge Hub & Threat Glossary
- 🗣️ **"Generate password"** $\rightarrow$ Generates a high-entropy CSPRNG password automatically
- 🗣️ **"Go to dashboard"** $\rightarrow$ Returns to the central Security Command Center

> **Microphone Fallback**: If browser microphone permissions are restricted or speech recognition is unsupported, an **Interactive 1-Click Voice Command Simulator** provides full hands-free simulation.

---

## 🌟 Key Features

### 1. 🛡️ Security Command Center (Dashboard)
- **High-Impact Overview**: Centralized dashboard displaying the composite security score, active alerts, and immediate navigation to all audit tools.
- **Interactive Action Cards**: Direct routing buttons (`Check Password`, `Take Quiz`, `Check URL`, `View Score`) with hover micro-animations.
- **Curated Security Tips**: Instant preview of beginner-friendly defense tips directly from the dashboard.

### 2. 🔑 Password Strength Checker & CSPRNG Generator
- **5-Tier Strength Classification**: Rates passwords across *Very Weak*, *Weak*, *Fair*, *Strong*, and *Very Strong*.
- **5 Core Criteria Breakdown**: Real-time validation of length ($\ge 12$ chars), uppercase, lowercase, numbers, and special symbols.
- **Cryptographic Entropy & GPU Simulation**: Computes Shannon keyspace entropy in bits and estimates crack times against 10 billion guesses/sec clustered RTX 4090 GPU rigs.
- **Compromised Password Alerts**: Real-time detection against common breach wordlists (e.g. `RockYou`, `HaveIBeenPwned`).
- **Fortified Generator**: Cryptographically Secure Pseudorandom Number Generator (CSPRNG) with customizable length (8–32 chars) and character set toggles.
- **Quick Preset Testing**: One-click preset demo passwords to visualize each tier.

### 3. 🎣 Phishing Awareness Quiz
- **5 Realistic Scenarios**: Tests discernment against suspicious hyperlinks, urgent threats, fake login portals, malicious attachments, and OTP interception attacks.
- **Progress Tracking**: One question at a time with a dynamic progress bar and scenario indicator.
- **Anti-Bypass Validation**: Users must select an answer before proceeding, preventing invalid progress state.
- **Educational Feedback**: Immediate visual explanations for both safe and deceptive choices.
- **Comprehensive Score Review**: Calculates total score out of 5 and percentage, with full answer breakdowns and a one-click retake button.

### 4. 🌐 Educational URL Safety Checker
- **6 Heuristic Checks**:
  1. **HTTPS Protocol Check**: Detects insecure unencrypted HTTP connections.
  2. **IP Hostname Check**: Identifies direct IPv4/IPv6 host addresses bypassing DNS.
  3. **Suspicious Keyword Filter**: Flags credential and financial harvesting keywords (`login`, `verify`, `paypal`, `secure`, `update`, etc.).
  4. **Subdomain Stacking**: Catches excessive subdomain nesting ($>3$ levels).
  5. **Malformed Syntax Check**: Validates compliance with RFC 3986 URL specifications.
  6. **Deceptive Characters & Homoglyphs**: Detects Cyrillic character substitutions and Punycode (`xn--`).
- **Risk Categorization**: Rates links as *Low Risk*, *Suspicious*, or *High Risk*.
- **Preset Demonstration Links**: One-click buttons to evaluate safe vs. malicious link structures instantly.

### 5. 📊 Overall Security Scoreboard
- **Radial SVG Score Gauge**: Responsive circular progress meter with ARIA accessibility roles and dynamic colors.
- **Transparent Scoring Formula (0–100 Scale)**:
  - **Password Strength**: Up to 35 points
  - **Phishing Quiz**: Up to 35 points
  - **URL Scanner Audits**: Up to 30 points (10 points per scan, max 30)
- **4 Defense Posture Tiers**: Categorized into *Needs Improvement* ($<50$), *Fair* ($50–69$), *Good* ($70–84$), and *Intelligent/Excellent* ($85–100$).
- **Direct Action Checklist**: One-click jump links to help users improve each facet of their score.

### 6. 💡 Cybersecurity Knowledge Hub & Threat Glossary
- **6 Beginner-Friendly Best Practices**:
  1. Strong Passwords & Passphrases
  2. Multi-Factor Authentication (MFA)
  3. Recognizing Phishing Attacks
  4. Software & System Updates
  5. Safe Browsing & Public Wi-Fi
  6. Protecting Sensitive Personal Data
- **Interactive Progress**: Mark tips as mastered or bookmark them for quick reference (saved in `localStorage`).
- **Threat Glossary**: Clear, accessible definitions for Ransomware, Man-in-the-Middle (MitM), Social Engineering, and Zero-Day vulnerabilities.

---

## 🔒 Security & Privacy Commitments

### 🛡️ Local-Only Password Evaluation
> **Important Privacy Notice**: The CyberSafe Password Strength Checker operates **entirely in your local browser memory**. Passwords entered into CyberSafe are **never transmitted over any network, never sent to external servers, and never stored in cookies or local storage**. Only the non-sensitive numerical score and rating are retained locally to calculate your overall security score.

### ⚠️ Educational Demonstration Disclaimer
> **URL Checker Disclaimer**: The URL Safety Checker is designed strictly as an **educational demonstration** to teach users how to spot common red flags in web addresses. It operates solely through client-side heuristic pattern matching and **does not replace professional threat intelligence feeds, enterprise firewalls, antivirus software, or secure web gateways**.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tooling**: [Vite 8](https://vitejs.dev/) with `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Dark cybersecurity theme, responsive grid layouts, custom glow effects)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Voice Engine**: Web Speech API (`SpeechRecognition` & `SpeechSynthesisUtterance`)
- **Deployment**: [Render](https://render.com/) Static Site (`render.yaml` blueprint included)

---

## 🚀 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/palak404byte2026-source/CyberSafe-Wispr-Flow.git
cd CyberSafe-Wispr-Flow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

The application will start locally at:
```
http://localhost:5173
```

---

## 📦 Creating a Production Build

To build the optimized static production bundle:

```bash
npm run build
```

This compiles all assets into the `./dist` folder with sub-second build times ($\approx 800\text{ms}$).

To test the production build locally:
```bash
npm run preview
```

---

## 🌐 Deploying to Render (Static Site)

CyberSafe includes a pre-configured [`render.yaml`](./render.yaml) file for instant deployment on Render:

1. Push your code to your GitHub repository.
2. In the [Render Dashboard](https://dashboard.render.com/), select **New +** $\rightarrow$ **Static Site** (or **Blueprint**).
3. Connect your `CyberSafe-Wispr-Flow` GitHub repository.
4. Configure the build parameters:
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Configure the SPA Rewrite Rule:
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
6. Click **Deploy**. Render will generate your live production URL with automated SSL certificates and CDN distribution.

---

## 📄 License

This project is licensed under the **MIT License**. Created with ❤️ for the **Wispr Flow Voice-Driven Development Challenge**.
