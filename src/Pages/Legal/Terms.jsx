import { Link } from "react-router-dom";

const LegalLayout = ({ title, children }) => (
  <div className="min-h-screen bg-slate-50 pt-24 pb-16">
    <div className="max-w-3xl mx-auto px-5">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 px-8 py-8 text-white">
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="text-sm text-slate-300 mt-1">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        <div className="p-8 space-y-6 text-sm text-slate-700 leading-relaxed">{children}</div>
        <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center">
          <Link to="/" className="text-[#19A7CE] font-bold text-sm hover:underline">
            <i className="fa-solid fa-arrow-left mr-2"></i>Back to Home
          </Link>
          <span className="text-xs text-slate-400">MedX Health Network</span>
        </div>
      </div>
    </div>
  </div>
);

const LegalSection = ({ heading, children }) => (
  <section>
    <h2 className="font-extrabold text-slate-900 text-base mb-2">{heading}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

export function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <LegalSection heading="1. Acceptance of Terms">
        <p>
          By accessing or using MedX, you agree to be bound by these Terms of Service. If you do not agree with any
          part of these terms, please discontinue using our platform.
        </p>
      </LegalSection>
      <LegalSection heading="2. Medical Disclaimer">
        <p>
          MedX is a digital health platform that facilitates connections between patients and licensed healthcare
          professionals. Content provided by MedX AI and the platform is for informational purposes only and is not a
          substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician
          with any questions you may have regarding a medical condition.
        </p>
      </LegalSection>
      <LegalSection heading="3. Account Responsibilities">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities
          that occur under your account. You agree to provide accurate and up-to-date information during registration.
        </p>
      </LegalSection>
      <LegalSection heading="4. Appointments & Payments">
        <p>
          Appointments and prescription requests submitted through MedX are subject to confirmation by the respective
          providers. Fees associated with consultations are displayed before booking and may vary by provider.
        </p>
      </LegalSection>
      <LegalSection heading="5. Acceptable Use">
        <p>
          You agree not to misuse the platform, including attempting to access restricted areas, disrupting services,
          or using the platform for any unlawful purpose.
        </p>
      </LegalSection>
      <LegalSection heading="6. Changes to Terms">
        <p>
          We may update these Terms from time to time. Continued use of the platform after changes constitutes
          acceptance of the revised terms.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Terms;