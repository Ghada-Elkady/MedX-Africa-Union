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

export function Privacy() {
  return (
    <LegalLayout title="Privacy Policy">
      <LegalSection heading="1. Information We Collect">
        <p>
          We collect information you provide directly, including your name, email address, phone number, and health
          details you choose to share. We also collect usage data such as pages visited and features used to improve
          our services.
        </p>
      </LegalSection>
      <LegalSection heading="2. How We Use Your Information">
        <p>
          Your information is used to facilitate appointments, provide AI-assisted guidance, process prescription
          requests, and personalize your experience. We do not sell your personal or health data to third parties.
        </p>
      </LegalSection>
      <LegalSection heading="3. Data Storage & Security">
        <p>
          Health-related data is stored locally on your device where applicable and transmitted securely to our
          services. We employ industry-standard safeguards to protect your information from unauthorized access.
        </p>
      </LegalSection>
      <LegalSection heading="4. Sharing of Information">
        <p>
          We share information only with licensed providers you choose to contact and with service partners required to
          operate the platform, in accordance with applicable law.
        </p>
      </LegalSection>
      <LegalSection heading="5. Your Rights">
        <p>
          You may access, correct, or delete your personal information at any time through your profile settings or by
          contacting our support team.
        </p>
      </LegalSection>
      <LegalSection heading="6. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please reach out through the MedX contact page.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

export default Privacy;