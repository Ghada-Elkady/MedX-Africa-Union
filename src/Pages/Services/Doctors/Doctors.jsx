import { useState, useEffect } from 'react';
import { MOCK_DOCTORS } from '../../../services/apiService';
import { Link } from 'react-router-dom';

const Doctors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [filteredDoctors, setFilteredDoctors] = useState(MOCK_DOCTORS);
  const [bookingDoctor, setBookingDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const specialties = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology'];

  useEffect(() => {
    let result = MOCK_DOCTORS;

    if (selectedSpecialty !== 'All') {
      result = result.filter(d => 
        d.specialization_name.toLowerCase() === selectedSpecialty.toLowerCase() ||
        d.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(term) ||
        d.specialty.toLowerCase().includes(term) ||
        d.location.toLowerCase().includes(term)
      );
    }

    setFilteredDoctors(result);
  }, [searchTerm, selectedSpecialty]);

  const handleBookSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !patientName || !patientPhone) return;

    const newAppointment = {
      id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      doctor_id: bookingDoctor.id,
      doctor_name: bookingDoctor.name,
      specialty: bookingDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      type: "Online Consultation",
      status: "Confirmed",
      fee: bookingDoctor.fee,
      patient_name: patientName,
      patient_phone: patientPhone,
      notes: notes || "General medical consultation"
    };

    // Save to LocalStorage
    try {
      const current = JSON.parse(localStorage.getItem('medx_appointments') || '[]');
      localStorage.setItem('medx_appointments', JSON.stringify([newAppointment, ...current]));
    } catch (err) {
      console.error("Error saving appointment:", err);
    }

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingDoctor(null);
      setSelectedDate('');
      setSelectedTime('');
      setPatientName('');
      setPatientPhone('');
      setNotes('');
    }, 2500);
  };

  return (
    <div className="doctors-page min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left max-w-2xl">
            <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Verified Medical Network
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Find & Book Certified Medical Specialists
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with top-rated physicians across all specialties. Choose between in-clinic visits or instant online video consultations.
            </p>
          </div>

          <Link to="/ask">
            <button className="px-6 py-3.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm flex-shrink-0">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>Ask AI Which Doctor You Need</span>
            </button>
          </Link>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
          
          {/* Search Bar */}
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctors by name, specialty (e.g. Cardiology), or city..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-[#19A7CE] focus:bg-white rounded-2xl outline-none text-sm text-slate-800 placeholder-slate-400 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
          </div>

          {/* Specialty Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Specialty:</span>
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedSpecialty === spec
                    ? 'bg-[#19A7CE] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
              <i className="fa-solid fa-user-slash text-4xl text-slate-300"></i>
              <h3 className="text-lg font-bold text-slate-800">No Doctors Match Your Search</h3>
              <p className="text-sm text-slate-500">Try clearing filters or searching for a different specialty.</p>
              <button 
                onClick={() => { setSearchTerm(''); setSelectedSpecialty('All'); }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredDoctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
                
                <div className="p-6 space-y-5">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 group-hover:scale-105 transition-transform" 
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-base">{doc.name}</h3>
                        {doc.verified && <i className="fa-solid fa-circle-check text-[#19A7CE] text-sm" title="Verified Specialist"></i>}
                      </div>
                      <p className="text-xs font-bold text-[#19A7CE]">{doc.specialty}</p>
                      <p className="text-xs text-slate-500">{doc.experience} Years Experience</p>

                      <div className="flex items-center gap-1 pt-1 text-amber-400 text-xs font-bold">
                        <i className="fa-solid fa-star"></i>
                        <span className="text-slate-800">{doc.rating}</span>
                        <span className="text-slate-400">({doc.reviews_count} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Address */}
                  <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-location-dot text-[#19A7CE]"></i>
                      <span>{doc.location}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <i className="fa-solid fa-globe text-slate-400"></i>
                      <span>Languages: {doc.languages.join(", ")}</span>
                    </p>
                  </div>

                  {/* Fee & Consult types */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block uppercase">Consultation Fee</span>
                      <span className="text-lg font-extrabold text-slate-900">{doc.fee} {doc.currency}</span>
                    </div>

                    <div className="flex gap-1.5">
                      {doc.consultation_types.map((type, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
                  <Link to={`/doctor/${doc.id}`} className="flex-1">
                    <button className="w-full py-3 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 text-xs transition-all">
                      View Profile
                    </button>
                  </Link>

                  <button 
                    onClick={() => setBookingDoctor(doc)}
                    className="flex-1 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs shadow-md transition-all"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

      {/* Appointment Booking Modal */}
      {bookingDoctor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-fadeIn space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <img src={bookingDoctor.image} alt={bookingDoctor.name} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{bookingDoctor.name}</h3>
                  <p className="text-xs text-[#19A7CE] font-semibold">{bookingDoctor.specialty}</p>
                </div>
              </div>
              <button onClick={() => setBookingDoctor(null)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {bookingSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
                  <i className="fa-solid fa-check"></i>
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900">Appointment Confirmed!</h4>
                <p className="text-sm text-slate-600">
                  Your appointment with <strong>{bookingDoctor.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been successfully booked.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Available Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Select Time Slot</label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 outline-none focus:border-[#19A7CE]"
                  >
                    <option value="">Choose a time slot...</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Patient Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#19A7CE]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+20 123 456 7890"
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold outline-none focus:border-[#19A7CE]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Reason for Visit / Symptoms (Optional)</label>
                  <textarea
                    rows="2"
                    placeholder="Briefly describe your symptoms..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#19A7CE]"
                  />
                </div>

                <div className="pt-2 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block uppercase">Total Due</span>
                    <span className="text-lg font-black text-slate-900">{bookingDoctor.fee} {bookingDoctor.currency}</span>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold text-sm rounded-xl shadow-md transition-all"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Doctors;