import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MOCK_PRESCRIPTIONS } from "../../services/apiService";

const PrescriptionView = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [selectedRx, setSelectedRx] = useState(null);
  const [sentToPharmacy, setSentToPharmacy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('medx_prescriptions') || '[]');
      const combined = stored.length > 0 ? stored : MOCK_PRESCRIPTIONS;
      setPrescriptions(combined);
      setSelectedRx(combined[0] || null);
    } catch (e) {
      setPrescriptions(MOCK_PRESCRIPTIONS);
      setSelectedRx(MOCK_PRESCRIPTIONS[0] || null);
    }
  }, []);

  const handleSendToPharmacy = () => {
    if (!selectedRx) return;

    // Add prescription medications to cart in localStorage
    try {
      const currentCart = JSON.parse(localStorage.getItem('medx_cart') || '[]');
      const rxItems = selectedRx.medications.map(m => ({
        id: `RX-ITEM-${Math.random()}`,
        name: m.name,
        dosage: m.dosage,
        price: 95,
        currency: "EGP",
        quantity: 1,
        requires_prescription: true,
        prescription_id: selectedRx.id
      }));

      localStorage.setItem('medx_cart', JSON.stringify([...currentCart, ...rxItems]));
      setSentToPharmacy(true);
      setTimeout(() => setSentToPharmacy(false), 2500);
    } catch (e) {
      console.error("Cart error:", e);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="prescription-page min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Official Digital Medical Prescriptions
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight mt-2">Digital Prescription Vault</h1>
            <p className="text-slate-300 text-sm mt-1">Review physician prescriptions, print PDF copies, or dispatch orders to verified pharmacies.</p>
          </div>

          <Link to="/services/search/pharmacies">
            <button className="px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2">
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Go to E-Pharmacy</span>
            </button>
          </Link>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Prescription List */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Prescription</h2>
            
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                onClick={() => setSelectedRx(rx)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedRx?.id === rx.id
                    ? 'bg-white border-[#19A7CE] shadow-md ring-2 ring-[#19A7CE]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs font-bold text-[#19A7CE]">{rx.id}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{rx.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{rx.doctor_name}</h3>
                <p className="text-xs text-slate-500">{rx.diagnosis}</p>
                <div className="pt-2 flex justify-between items-center text-[11px] font-bold text-slate-700">
                  <span>{rx.medications.length} Prescribed Drugs</span>
                  {rx.verified && <span className="text-emerald-600 flex items-center gap-1"><i className="fa-solid fa-circle-check"></i> Verified</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Official Medical Prescription Document */}
          <div className="lg:col-span-8">
            {selectedRx ? (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10 space-y-8 print:shadow-none print:border-none">
                
                {/* Clinic Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-6 gap-4">
                  <div>
                    <span className="font-extrabold text-2xl text-slate-900 tracking-tight">Med<span className="text-[#19A7CE]">X</span> Healthcare</span>
                    <p className="text-xs text-slate-400 font-medium">Digital Medical Record & e-Rx Portal</p>
                  </div>
                  
                  <div className="text-left sm:text-right text-xs space-y-1">
                    <span className="font-mono font-bold text-[#19A7CE] text-sm block">{selectedRx.id}</span>
                    <p className="text-slate-500 font-medium">Date: <strong>{selectedRx.date}</strong></p>
                  </div>
                </div>

                {/* Doctor & Patient Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Prescribing Physician</span>
                    <h3 className="font-bold text-slate-900 text-sm">{selectedRx.doctor_name}</h3>
                    <p className="text-slate-600">{selectedRx.doctor_specialty} Consultant</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Patient Details</span>
                    <h3 className="font-bold text-slate-900 text-sm">{selectedRx.patient_name}</h3>
                    <p className="text-slate-600">Age: {selectedRx.patient_age} Yrs | Gender: Male</p>
                  </div>
                </div>

                {/* Diagnosis Section */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Diagnosis & Notes</span>
                  <div className="p-4 bg-cyan-50/50 border border-cyan-100 rounded-2xl text-sm font-semibold text-slate-800">
                    {selectedRx.diagnosis}
                  </div>
                  {selectedRx.notes && <p className="text-xs text-slate-500 italic px-2">Clinical Note: {selectedRx.notes}</p>}
                </div>

                {/* Medications Rx List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="font-serif text-3xl font-bold text-[#19A7CE]">Rx</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Medication Schedule</span>
                  </div>

                  <div className="space-y-3">
                    {selectedRx.medications.map((med, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{med.name}</h4>
                          <p className="text-xs text-slate-600">Dosage: {med.dosage} | Frequency: {med.frequency}</p>
                          {med.instructions && <p className="text-[11px] text-[#19A7CE] font-semibold mt-0.5">{med.instructions}</p>}
                        </div>
                        <span className="bg-cyan-100 text-[#19A7CE] font-bold text-xs px-3 py-1 rounded-full whitespace-nowrap">
                          {med.duration || "30 Days"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification Stamp & QR Code */}
                <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-xl">
                      <i className="fa-solid fa-stamp"></i>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">Digitally Signed & Stamp Verified</span>
                      <span className="text-slate-400 text-[11px]">Licensed Practitioner Authorization</span>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-3 print:hidden">
                    <button
                      onClick={handleSendToPharmacy}
                      className="px-5 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                      <span>{sentToPharmacy ? "Sent to Cart!" : "Send to Pharmacy"}</span>
                    </button>

                    <button
                      onClick={handleDownload}
                      className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition-all flex items-center gap-2"
                    >
                      <i className="fa-solid fa-print"></i>
                      <span>Print / Save PDF</span>
                    </button>
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  );
};

export default PrescriptionView;
