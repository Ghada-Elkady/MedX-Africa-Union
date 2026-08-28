import { useState } from "react";
import { Link } from "react-router-dom";
import { MOCK_LABS, MOCK_RADIOLOGY } from "../../services/apiService";

const Services = () => {
  const [activeTab, setActiveTab] = useState("labs");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookedFacility, setBookedFacility] = useState(null);

  const filteredLabs = MOCK_LABS.filter(lab => 
    lab.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lab.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRadiology = MOCK_RADIOLOGY.filter(rad => 
    rad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rad.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="services-page min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-4">
          <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Diagnostic & Imaging Network
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Diagnostic Laboratories & Radiology Centers</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Locate accredited blood test laboratories, open MRI centers, 128-slice CT scan facilities, and schedule home sample collection.
          </p>
        </div>

        {/* Tab Switcher & Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* View Tabs */}
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("labs")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto ${
                  activeTab === "labs" ? "bg-[#19A7CE] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-vial mr-2"></i> Diagnostic Labs ({MOCK_LABS.length})
              </button>

              <button
                onClick={() => setActiveTab("radiology")}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all w-full sm:w-auto ${
                  activeTab === "radiology" ? "bg-[#19A7CE] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <i className="fa-solid fa-x-ray mr-2"></i> Radiology Centers ({MOCK_RADIOLOGY.length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search test or facility name..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#19A7CE] rounded-xl outline-none text-xs font-semibold text-slate-800"
              />
            </div>

          </div>
        </div>

        {/* Content Lists */}
        {activeTab === "labs" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredLabs.map((lab) => (
              <div key={lab.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{lab.name}</h3>
                      <p className="text-xs text-slate-500">{lab.location}</p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                      {lab.accreditation}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Popular Lab Panels:</span>
                    <div className="flex flex-wrap gap-2">
                      {lab.services.map((srv, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs text-slate-600 font-semibold">
                    {lab.home_sample_collection && <span className="text-[#19A7CE] font-bold"><i className="fa-solid fa-house-medical mr-1"></i> Home Sample Collection Available</span>}
                  </div>

                  <button
                    onClick={() => setBookedFacility(lab.name)}
                    className="px-5 py-2.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                  >
                    Request Lab Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredRadiology.map((rad) => (
              <div key={rad.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg">{rad.name}</h3>
                      <p className="text-xs text-slate-500">{rad.location}</p>
                    </div>
                    <span className="bg-cyan-50 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full border border-cyan-200">
                      {rad.hours}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Imaging Modalities:</span>
                    <div className="flex flex-wrap gap-2">
                      {rad.services.map((srv, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-xl">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-bold"><i className="fa-solid fa-phone text-[#19A7CE] mr-1"></i> Hotline: {rad.phone}</span>

                  <button
                    onClick={() => setBookedFacility(rad.name)}
                    className="px-5 py-2.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs shadow-sm transition-all"
                  >
                    Book Scan Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Booking Confirmation Dialog */}
      {bookedFacility && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
            <i className="fa-solid fa-circle-check text-emerald-500 text-5xl"></i>
            <h3 className="text-2xl font-extrabold text-slate-900">Request Received!</h3>
            <p className="text-xs text-slate-600">
              Your appointment request for <strong>{bookedFacility}</strong> has been logged. Facility staff will contact you shortly to confirm your slot.
            </p>
            <button
              onClick={() => setBookedFacility(null)}
              className="px-6 py-2.5 bg-[#19A7CE] text-white font-bold rounded-xl text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Services;
