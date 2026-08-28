import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_DOCTORS } from "../../services/apiService";

const ConsultationRoom = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [activeTab, setActiveTab] = useState("video");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [rxDiagnosis, setRxDiagnosis] = useState("");
  const [rxMedications, setRxMedications] = useState([]);
  const [medName, setMedName] = useState("");
  const [medDosage, setMedDosage] = useState("");
  const [medFreq, setMedFreq] = useState("");
  const [prescriptionSaved, setPrescriptionSaved] = useState(false);

  useEffect(() => {
    const doc = MOCK_DOCTORS.find(d => String(d.id) === String(id)) || MOCK_DOCTORS[0];
    setDoctor(doc);

    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
  };

  const handleAddMedication = () => {
    if (!medName || !medDosage) return;
    setRxMedications([...rxMedications, { name: medName, dosage: medDosage, frequency: medFreq || "Once daily" }]);
    setMedName("");
    setMedDosage("");
    setMedFreq("");
  };

  const handleIssuePrescription = () => {
    if (!rxDiagnosis || rxMedications.length === 0) return;

    const newRx = {
      id: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      doctor_name: doctor ? doctor.name : "Dr. Sarah Al-Mansoor",
      doctor_specialty: doctor ? doctor.specialty : "Cardiology",
      patient_name: "John Doe",
      patient_age: 34,
      diagnosis: rxDiagnosis,
      notes: clinicalNotes || "Standard consultation guidance",
      medications: rxMedications,
      verified: true
    };

    try {
      const current = JSON.parse(localStorage.getItem('medx_prescriptions') || '[]');
      localStorage.setItem('medx_prescriptions', JSON.stringify([newRx, ...current]));
    } catch (err) {
      console.error("Error saving prescription:", err);
    }

    setPrescriptionSaved(true);
    setTimeout(() => setPrescriptionSaved(false), 3000);
  };

  if (!doctor) return null;

  return (
    <div className="consultation-room min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-7xl space-y-6">
        
        {/* Top Status Header */}
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={doctor.image} alt={doctor.name} className="w-10 h-10 rounded-full object-cover border border-[#19A7CE]" />
            <div>
              <h2 className="font-bold text-sm text-white">{doctor.name}</h2>
              <p className="text-xs text-[#19A7CE] font-semibold">{doctor.specialty}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="font-bold text-emerald-400">Live Consultation Active</span>
            </div>

            <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 font-mono font-bold text-cyan-300">
              <i className="fa-solid fa-clock mr-1 text-slate-500"></i>
              <span>{formatTimer(seconds)}</span>
            </div>

            <Link to="/dashboard">
              <button className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition">
                End Consultation
              </button>
            </Link>
          </div>
        </div>

        {/* Studio Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Stage (Video / Chat Placeholder) */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* View Tabs */}
            <div className="flex gap-2 border-b border-slate-800 pb-2">
              <button
                onClick={() => setActiveTab("video")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === "video" ? "bg-[#19A7CE] text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
              >
                <i className="fa-solid fa-video mr-1.5"></i> Video Stream
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === "notes" ? "bg-[#19A7CE] text-white" : "bg-slate-800 text-slate-400 hover:text-white"}`}
              >
                <i className="fa-solid fa-file-signature mr-1.5"></i> Clinical Notes & Prescriptions
              </button>
            </div>

            {activeTab === "video" ? (
              <div className="relative aspect-video bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between p-6 shadow-2xl">
                {/* Doctor Stream Simulation */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 opacity-90">
                  <div className="text-center space-y-3">
                    <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-[#19A7CE] mx-auto shadow-xl" />
                    <h3 className="font-bold text-lg text-white">{doctor.name}</h3>
                    <p className="text-xs text-slate-400">Encrypted WebRTC Video Stream (Integration Ready)</p>
                  </div>
                </div>

                {/* Self View Overlay */}
                <div className="relative z-10 self-end w-36 aspect-video bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden flex items-center justify-center">
                  <span className="text-[10px] font-bold text-slate-400">Patient Camera</span>
                </div>

                {/* Video Controls Toolbar */}
                <div className="relative z-10 self-center flex items-center gap-3 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-800">
                  <button className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white text-sm" title="Mute Microphone">
                    <i className="fa-solid fa-microphone"></i>
                  </button>
                  <button className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white text-sm" title="Turn off Camera">
                    <i className="fa-solid fa-video"></i>
                  </button>
                  <button className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white text-sm" title="Share Screen">
                    <i className="fa-solid fa-desktop"></i>
                  </button>
                  <Link to="/prescriptions">
                    <button className="w-10 h-10 bg-[#19A7CE] hover:bg-[#148AA1] rounded-full flex items-center justify-center text-white text-sm" title="Digital Prescription">
                      <i className="fa-solid fa-file-prescription"></i>
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              /* Clinical Notes & Prescription Builder */
              <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 space-y-6">
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-cyan-300">Clinical Consultation Notes</h3>
                  <textarea
                    rows="4"
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Enter physician observations, patient history notes, and vital signs..."
                    className="w-full p-4 bg-slate-900 border border-slate-700 rounded-2xl text-xs text-slate-200 outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-700">
                  <h3 className="font-bold text-sm text-cyan-300">Issue Digital Prescription</h3>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">Clinical Diagnosis</label>
                    <input
                      type="text"
                      value={rxDiagnosis}
                      onChange={(e) => setRxDiagnosis(e.target.value)}
                      placeholder="e.g. Acute Bronchitis / Essential Hypertension"
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#19A7CE]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={medName}
                      onChange={(e) => setMedName(e.target.value)}
                      placeholder="Medication Name"
                      className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none"
                    />
                    <input
                      type="text"
                      value={medDosage}
                      onChange={(e) => setMedDosage(e.target.value)}
                      placeholder="Dosage (e.g. 500mg)"
                      className="p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="px-3 py-2.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs"
                    >
                      + Add Drug
                    </button>
                  </div>

                  {rxMedications.length > 0 && (
                    <div className="space-y-2 bg-slate-900 p-4 rounded-xl border border-slate-700">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Prescribed Medications:</span>
                      {rxMedications.map((m, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                          <span className="font-bold text-slate-200">{m.name} ({m.dosage})</span>
                          <span className="text-slate-400">{m.frequency}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={handleIssuePrescription}
                    disabled={!rxDiagnosis || rxMedications.length === 0}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition"
                  >
                    {prescriptionSaved ? "✓ Prescription Saved to Patient Record!" : "Issue Digital Prescription"}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Patient Details & Side Summary */}
          <div className="lg:col-span-4 bg-slate-800 border border-slate-700/80 rounded-3xl p-6 space-y-6">
            <h3 className="font-bold text-sm text-cyan-300 border-b border-slate-700 pb-3">Patient Health File</h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Patient Name:</span>
                <span className="font-bold text-white">John Doe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Age / Gender:</span>
                <span className="font-bold text-white">34 Yrs / Male</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-bold text-emerald-400">O+ Positive</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Known Allergies:</span>
                <span className="font-bold text-amber-400">Penicillin</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Quick Actions:</span>
              <Link to="/prescriptions" className="block">
                <button className="w-full p-3 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 text-left flex items-center justify-between">
                  <span>View All Prescriptions</span>
                  <i className="fa-solid fa-chevron-right text-slate-500"></i>
                </button>
              </Link>
              <Link to="/report-explainer" className="block">
                <button className="w-full p-3 bg-slate-900 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 text-left flex items-center justify-between">
                  <span>Lab Reports Explainer</span>
                  <i className="fa-solid fa-chevron-right text-slate-500"></i>
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ConsultationRoom;
