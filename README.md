# SETA — AI Healthcare Platform

> **"Your First Safe Medical Touchpoint"**

SETA is an AI-powered healthcare platform designed to serve as a user's first safe medical touchpoint. It combines AI preliminary educational guidance, verified doctor discovery, online video consultations, digital prescriptions, an integrated e-pharmacy network, and diagnostic laboratory & radiology services.

---

## 🌟 Key Features

1. **SETA AI Medical Assistant**: Preliminary educational guidance powered by Google Gemini, featuring conservative medical guardrails and red-flag emergency symptom detection (123 / 911 alert).
2. **Doctor Discovery & Booking**: Filter by specialty, location, fee, and availability with instant appointment booking.
3. **Digital Consultation Studio**: Live consultation room with active timer, patient health record panel, clinical notes editor, and e-prescription builder.
4. **Digital Prescriptions Vault**: Standardized e-Rx issuance, PDF export, and direct dispatch to partner pharmacies.
5. **E-Pharmacy**: Product catalog with OTC vs. Prescription-Required badges, shopping cart, and checkout fulfillment.
6. **Diagnostic Labs & Radiology**: Directory of accredited lab test centers and imaging facilities.
7. **Medical Report Explainer**: Interactive reference range analyzer for lab test values (Glucose, HbA1c, Cholesterol, Hemoglobin).
8. **Patient Dashboard**: Centralized hub managing appointments, prescriptions, and quick healthcare actions.

---

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/MohamedAttaMohamed/SETA.git
cd SETA

# Install dependencies
npm install

# Configure Environment Variables
cp .env.example .env
```

### Development

```bash
# Run local development server
npm run dev
```

### Production Build

```bash
# Build for production
npm run build
```

---

## 🌐 Vercel Deployment

SETA includes a pre-configured `vercel.json` for SPA routing on Vercel.

1. Import `MohamedAttaMohamed/SETA` on Vercel.
2. Set Framework Preset: `Vite`.
3. Build Command: `npm run build`.
4. Deploy!
