import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MOCK_DOCTORS } from "../../../services/apiService";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = MOCK_DOCTORS.find(d => String(d.id) === String(id)) || MOCK_DOCTORS[0];
    setDoctor(found);
  }, [id]);

  if (!doctor) {
    return (
      <div className="min-h-screen pt-32 text-center text-slate-500">
        <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
        <p className="mt-2 text-sm font-semibold">Loading Doctor Profile...</p>
      </div>
    );
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !patientName || !patientPhone) return;

    const newAppointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      doctor_id: doctor.id,
      doctor_name: doctor.name,
      specialty: doctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: "Online Consultation",
      status: "Confirmed",
      fee: doctor.fee,
      patient_name: patientName,
      patient_phone: patientPhone
    };

    try {
      const current = JSON.parse(localStorage.getItem('medx_appointments') || '[]');
      localStorage.setItem('medx_appointments', JSON.stringify([newAppointment, ...current]));
    } catch (err) {
      console.error("Error saving appointment:", err);
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowBooking(false);
    }, 2000);
  };

  return (
    <div className="doctor-details-page min-h-screen pt-28 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-[#19A7CE] font-bold text-sm transition"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back to Specialists</span>
        </button>

        {/* Doctor Header Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-36 h-36 rounded-2xl object-cover border-2 border-slate-100 shadow-md flex-shrink-0"
            />

            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{doctor.name}</h1>
                    {doctor.verified && <i className="fa-solid fa-circle-check text-[#19A7CE] text-lg"></i>}
                  </div>
                  <p className="text-sm font-bold text-[#19A7CE] mt-0.5">{doctor.specialty}</p>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200/80 w-fit">
                  <i className="fa-solid fa-star text-amber-500"></i>
                  <span className="font-extrabold text-slate-900 text-sm">{doctor.rating}</span>
                  <span className="text-xs text-slate-500 font-semibold">({doctor.reviews_count} Reviews)</span>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Experience</span>
                  <span className="font-bold text-slate-800 text-sm">{doctor.experience} Years</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Location</span>
                  <span className="font-bold text-slate-800 text-sm">{doctor.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Consultation Fee</span>
                  <span className="font-extrabold text-slate-900 text-sm">{doctor.fee} {doctor.currency}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase">Languages</span>
                  <span className="font-bold text-slate-800 text-sm">{doctor.languages.join(", ")}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setShowBooking(true)}
                  className="px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>Book Appointment Now</span>
                </button>

                <Link to={`/consultation/${doctor.id}`}>
                  <button className="px-6 py-3 bg-cyan-50 hover:bg-cyan-100 text-[#19A7CE] font-bold rounded-2xl text-xs border border-cyan-200 transition-all flex items-center gap-2">
                    <i className="fa-solid fa-[#19A7CE] fa-headset"></i>
                    <span>Digital Consultation Room</span>
                  </button>
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Bio & Slots */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {["overview", "availability", "location"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-xs font-extrabold uppercase tracking-wider transition-all border-b-2 ${
                  activeTab === tab
                    ? "border-[#19A7CE] text-[#19A7CE] bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Doctor Overview & Clinical Focus</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{doctor.about}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Clinical Services Offered</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-slate-700">
                    <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500"></i> Comprehensive Medical Evaluation</div>
                    <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500"></i> Digital Prescription Issuance</div>
                    <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500"></i> Tele-consultation & Remote Follow-up</div>
                    <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2"><i className="fa-solid fa-check text-emerald-500"></i> Diagnostic Lab Test Recommendation</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "availability" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Upcoming Time Slots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {doctor.available_slots?.map((slot, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{slot.date}</span>
                        <span className="text-xs text-[#19A7CE] font-semibold">{slot.time}</span>
                      </div>
                      <button 
                        onClick={() => { setSelectedDate(slot.date); setSelectedTime(slot.time); setShowBooking(true); }}
                        className="px-3 py-1.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs"
                      >
                        Book Slot
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Clinic Address & Directions</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{doctor.address}</p>
                <div className="p-8 bg-slate-100 rounded-2xl text-center text-slate-400 text-sm font-semibold">
                  <i className="fa-solid fa-map-location-dot text-3xl mb-2 block"></i>
                  <span>Interactive Map View Placeholder</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Booking Dialog */}
      {showBooking && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="font-extrabold text-slate-900 text-lg">Book Consultation</h3>
              <button onClick={() => setShowBooking(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-times"></i>
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-2">
                <i className="fa-solid fa-circle-check text-emerald-500 text-4xl"></i>
                <h4 className="font-bold text-slate-900">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500">Your appointment has been added to your dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Time Slot</label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#19A7CE]"
                  >
                    <option value="">Select time...</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+20 123 456 789"
                    className="w-full p-3 bg-slate-50 border rounded-xl text-sm outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <button type="submit" className="w-full py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-sm">
                  Complete Booking ({doctor.fee} {doctor.currency})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default DoctorDetails;
