import { useState } from "react";
import { Link } from "react-router-dom";
import landingImage from "../../assets/Home/landing.png";
import doctor_1 from "../../assets/Home/doctors/doctor-1.webp";

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is MedX AI a substitute for seeing a real doctor?",
      answer: "No. MedX AI provides preliminary educational guidance and symptom information. It is designed to help you understand potential causes and prepare for a professional consultation. It does not provide medical diagnoses or replace licensed physicians."
    },
    {
      question: "How does MedX handle medical emergencies?",
      answer: "MedX automatically detects red-flag emergency symptoms (such as acute chest pain, sudden numbness, or severe difficulty breathing) and immediately alerts the user to call emergency services (123 / 911) or seek an emergency room."
    },
    {
      question: "Can I get a digital prescription through MedX?",
      answer: "Yes. Following an online or in-clinic consultation with a certified doctor on MedX, your doctor can issue an official digital prescription that you can send directly to partner pharmacies for home delivery."
    },
    {
      question: "Are the doctors on MedX verified?",
      answer: "All medical specialists on MedX undergo strict license verification and credential checks prior to joining the platform."
    }
  ];

  return (
    <div className="home-page min-h-screen bg-slate-50 text-slate-800">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-cyan-50/70 via-blue-50/40 to-slate-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#19A7CE]/10 border border-[#19A7CE]/20 px-4 py-2 rounded-full text-xs font-bold text-[#19A7CE] uppercase tracking-wider shadow-sm">
                <i className="fa-solid fa-shield-heart"></i>
                <span>Your First Safe Medical Touchpoint</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Smarter Healthcare Starts <span className="bg-gradient-to-r from-[#19A7CE] to-[#148AA1] bg-clip-text text-transparent">Before the Clinic</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                MedX seamlessly combines AI preliminary medical guidance with certified doctors, digital prescriptions, e-pharmacy orders, and diagnostic laboratories in one safe ecosystem.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/ask" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#19A7CE] to-[#148AA1] hover:opacity-95 text-white font-bold rounded-2xl shadow-xl shadow-[#19A7CE]/25 hover:shadow-[#19A7CE]/40 transition-all flex items-center justify-center gap-3 text-base">
                    <i className="fa-solid fa-wand-magic-sparkles text-lg"></i>
                    <span>Ask MedX AI Assistant</span>
                  </button>
                </Link>

                <Link to="/doctors" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 font-bold border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 text-base">
                    <i className="fa-solid fa-user-doctor text-[#19A7CE]"></i>
                    <span>Find a Specialist</span>
                  </button>
                </Link>
              </div>

              {/* Metrics & Trust Badges */}
              <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">250+</h3>
                  <p className="text-xs font-semibold text-slate-500">Verified Doctors</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">100K+</h3>
                  <p className="text-xs font-semibold text-slate-500">AI Consultations</p>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">99.4%</h3>
                  <p className="text-xs font-semibold text-slate-500">Patient Trust Rate</p>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#19A7CE]/20 to-emerald-400/20 rounded-3xl blur-2xl transform scale-95"></div>
                 <img
                  src={landingImage}
                  alt="MedX Healthcare"
                  className="relative z-10 w-full h-auto object-contain rounded-3xl mix-blend-multiply drop-shadow-2xl"
                />

                {/* Floating Doctor Card */}
                <div className="absolute bottom-6 -left-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 max-w-xs">
                  <img src={doctor_1} alt="Verified Doctor" className="w-12 h-12 rounded-full object-cover border-2 border-[#19A7CE]" />
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-sm text-slate-900">Dr. Sarah Al-Mansoor</span>
                      <i className="fa-solid fa-circle-check text-[#19A7CE] text-xs"></i>
                    </div>
                    <p className="text-xs text-slate-500">Cardiology Specialist</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs font-bold">
                      <i className="fa-solid fa-star"></i>
                      <span>4.9 (128 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Floating AI Status */}
                <div className="absolute top-6 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">MedX AI Online</span>
                    <span className="text-slate-400">24/7 Educational Touchpoint</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-extrabold text-[#19A7CE] uppercase tracking-widest">Why MedX Exists</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Navigating Health Concerns Shouldn't Be Scary or Confusing
            </h3>
            <p className="text-slate-600 text-base leading-relaxed">
              When symptoms arise, searching online often leads to anxiety and inaccurate conclusions. MedX bridges the gap between uncertainty and real medical care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200/80 hover:border-[#19A7CE]/50 transition-all hover:shadow-lg space-y-4">
              <div className="w-14 h-14 bg-cyan-100 rounded-2xl flex items-center justify-center text-[#19A7CE] text-2xl font-bold">
                <i className="fa-solid fa-comments text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900">1. Educational AI Guidance</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Describe your symptoms in natural language. MedX AI clarifies terminology, explores possibilities safely, and identifies whether you need a specialist.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200/80 hover:border-[#19A7CE]/50 transition-all hover:shadow-lg space-y-4">
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-2xl font-bold">
                <i className="fa-solid fa-user-doctor text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900">2. Seamless Doctor Booking</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect directly with certified doctors. Filter by specialty, read patient reviews, choose online or in-clinic visits, and book appointments in seconds.
              </p>
            </div>

            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200/80 hover:border-[#19A7CE]/50 transition-all hover:shadow-lg space-y-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-2xl font-bold">
                <i className="fa-solid fa-pills text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold text-slate-900">3. Prescription & Fulfillment</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Receive digital prescriptions, send them to accredited partner pharmacies, and order tests at accredited diagnostic labs effortlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM ECOSYSTEM HIGHLIGHTS */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6 max-w-7xl space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-extrabold text-[#19A7CE] uppercase tracking-widest">Complete Healthcare Services</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Everything You Need in One Safe Touchpoint</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: AI Assistant */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#19A7CE]/10 rounded-2xl text-[#19A7CE]">
                  <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-[#19A7CE]/10 text-[#19A7CE] px-3 py-1 rounded-full">AI Triage</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">MedX AI Assistant</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instant preliminary guidance, symptom analysis, and red-flag emergency detection powered by advanced Gemini AI.
              </p>
              <Link to="/ask" className="inline-flex items-center gap-2 text-sm font-bold text-[#19A7CE] hover:underline pt-2">
                <span>Try AI Assistant</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 2: Doctor Directory */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
                  <i className="fa-solid fa-user-doctor text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Verified Only</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Doctor Consultations</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Book in-clinic or online video consultations with licensed cardiologists, neurologists, pediatricians, and more.
              </p>
              <Link to="/doctors" className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:underline pt-2">
                <span>Browse Specialists</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 3: Digital Prescriptions */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                  <i className="fa-solid fa-file-prescription text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Digital Rx</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Digital Prescriptions</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Access structured prescriptions issued by your physician. Download as PDF or push directly to partner pharmacies.
              </p>
              <Link to="/prescriptions" className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 hover:underline pt-2">
                <span>View Prescriptions</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 4: E-Pharmacy */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                  <i className="fa-solid fa-prescription-bottle-medical text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Fast Delivery</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">E-Pharmacy</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Order OTC healthcare products and upload prescriptions for verified prescription-required medications.
              </p>
              <Link to="/services/search/pharmacies" className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:underline pt-2">
                <span>Shop Pharmacy</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 5: Report Explainer */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-rose-100 rounded-2xl text-rose-600">
                  <i className="fa-solid fa-vial-circle-check text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-3 py-1 rounded-full">Educational</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Report Explainer</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Understand your lab results (blood sugar, cholesterol, CBC) with simplified reference ranges and plain-language summaries.
              </p>
              <Link to="/report-explainer" className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:underline pt-2">
                <span>Explain My Report</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

            {/* Card 6: Labs & Radiology */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/80 hover:shadow-xl transition-all space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">
                  <i className="fa-solid fa-x-ray text-2xl"></i>
                </div>
                <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">Accredited Centers</span>
              </div>
              <h4 className="text-xl font-bold text-slate-900">Labs & Radiology</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Find nearby diagnostic laboratories, MRI centers, and CT scan facilities with transparent pricing and home sample collection.
              </p>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:underline pt-2">
                <span>Find Facilities</span>
                <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SAFETY & MEDICAL TRUST BANNER */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <i className="fa-solid fa-shield-halved"></i>
                <span>Medical Credibility & Safety Standards</span>
              </div>
              <h3 className="text-3xl font-extrabold tracking-tight">AI Assistance Built with Patient Safety First</h3>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                MedX AI is engineered with conservative medical guardrails. It never presents preliminary guidance as a final diagnosis, actively identifies red-flag emergency symptoms, and always encourages timely professional consultation.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <Link to="/ask">
                <button className="px-8 py-4 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-3">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Try MedX AI Assistant</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ ACCORDION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-xs font-extrabold text-[#19A7CE] uppercase tracking-widest">Frequently Asked Questions</h2>
            <h3 className="text-3xl font-extrabold text-slate-900">Got Questions About MedX?</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <i className={`fa-solid fa-chevron-down text-slate-400 transition-transform ${openFaq === index ? 'rotate-180 text-[#19A7CE]' : ''}`}></i>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
