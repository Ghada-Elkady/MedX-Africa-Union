import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStoredAppointments, getStoredPrescriptions } from "../../services/apiService";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setAppointments(getStoredAppointments());
    setPrescriptions(getStoredPrescriptions());
  }, [location]);

  const menuItems = [
    { to: "/dashboard", label: "Patient Overview", icon: "📊" },
    { to: "/dashboard/doctors", label: "Doctors Admin", icon: "👨‍⚕️" },
    { to: "/dashboard/pharmacies", label: "Pharmacies Admin", icon: "💊" },
    { to: "/dashboard/laboratories", label: "Laboratories Admin", icon: "🧪" },
    { to: "/dashboard/radiology", label: "Radiology Admin", icon: "🦴" },
    { to: "/dashboard/reservations", label: "Reservations Log", icon: "📅" }
  ];

  return (
    <div className="flex h-screen bg-slate-50 pt-20">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-24 left-4 z-40 md:hidden bg-white p-2.5 rounded-xl shadow-md border border-slate-200 text-slate-700"
      >
        <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
      </button>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col justify-between`}>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-[#19A7CE] to-[#148AA1] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-base">MedX Portal</h2>
              <p className="text-[10px] text-slate-400 font-semibold uppercase">Patient & Provider Hub</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  location.pathname === item.to
                    ? 'bg-[#19A7CE]/10 text-[#19A7CE]'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100">
          <Link to="/" className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-slate-500 hover:text-slate-800 transition">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to MedX Home</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
        {location.pathname === "/dashboard" ? (
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* User Greeting Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Patient Health Control Center
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome Back, John Doe</h1>
                <p className="text-xs text-slate-300">Access your upcoming appointments, digital prescriptions, and AI conversations.</p>
              </div>

              <Link to="/ask">
                <button className="px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-xs shadow-md transition-all flex items-center gap-2 flex-shrink-0">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Ask MedX AI</span>
                </button>
              </Link>
            </div>

            {/* Quick Action Grid */}
            <div className="space-y-3">
              <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <Link to="/ask" className="p-4 bg-white hover:bg-cyan-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-[#19A7CE]/10 text-[#19A7CE] rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Ask AI</span>
                </Link>

                <Link to="/doctors" className="p-4 bg-white hover:bg-emerald-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-user-doctor"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Book Doctor</span>
                </Link>

                <Link to="/prescriptions" className="p-4 bg-white hover:bg-purple-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-file-prescription"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">My Prescriptions</span>
                </Link>

                <Link to="/services/search/pharmacies" className="p-4 bg-white hover:bg-amber-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-prescription-bottle-medical"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Find Pharmacy</span>
                </Link>

                <Link to="/services" className="p-4 bg-white hover:bg-indigo-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-vial"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Find Lab</span>
                </Link>

                <Link to="/report-explainer" className="p-4 bg-white hover:bg-rose-50/50 border border-slate-200 rounded-2xl text-center space-y-2 transition shadow-sm group">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mx-auto text-lg group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-square-poll-vertical"></i>
                  </div>
                  <span className="font-bold text-xs text-slate-800 block">Report Explainer</span>
                </Link>
              </div>
            </div>

            {/* Dashboard Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Card 1: Upcoming Appointments */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Upcoming Appointments</h3>
                  <Link to="/doctors" className="text-xs font-bold text-[#19A7CE] hover:underline">+ Book New</Link>
                </div>

                {appointments.length === 0 ? (
                  <p className="text-xs text-slate-400 py-6 text-center">No upcoming appointments scheduled.</p>
                ) : (
                  appointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{apt.doctor_name}</h4>
                        <p className="text-[#19A7CE] font-semibold">{apt.specialty}</p>
                        <p className="text-slate-500 mt-1"><i className="fa-solid fa-calendar-day mr-1"></i> {apt.date} at {apt.time}</p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 font-bold px-3 py-1 rounded-full text-[10px]">
                        {apt.status}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Card 2: Recent Digital Prescriptions */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-base">Active Digital Prescriptions</h3>
                  <Link to="/prescriptions" className="text-xs font-bold text-[#19A7CE] hover:underline">View All Vault</Link>
                </div>

                {prescriptions.map((rx) => (
                  <div key={rx.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-[#19A7CE]">{rx.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{rx.diagnosis}</h4>
                      <p className="text-slate-500">Dr. {rx.doctor_name} ({rx.date})</p>
                    </div>
                    <Link to="/prescriptions">
                      <button className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 font-bold text-slate-700 rounded-xl text-[11px]">
                        View Rx
                      </button>
                    </Link>
                  </div>
                ))}
              </div>

            </div>

          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
}