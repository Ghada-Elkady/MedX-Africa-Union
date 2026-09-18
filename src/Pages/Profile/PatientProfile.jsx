import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Components/Context/Context";
import { getStoredProfile, saveProfile } from "../../services/apiService";

const ProfileSection = ({ icon, title, subtitle, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
      <div className="w-11 h-11 bg-[#19A7CE]/10 text-[#19A7CE] rounded-xl flex items-center justify-center text-lg">
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <h2 className="font-extrabold text-slate-900 text-base">{title}</h2>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
    <p className="text-sm font-semibold text-slate-800">{value || "—"}</p>
  </div>
);

const Input = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <label className="block">
    <span className="text-xs font-bold text-slate-600 mb-1 block">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
    />
  </label>
);

const Select = ({ label, name, value, onChange, options, placeholder }) => (
  <label className="block">
    <span className="text-xs font-bold text-slate-600 mb-1 block">{label}</span>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </label>
);

const PatientProfile = () => {
  const userContext = useContext(User);
  const auth = userContext?.auth || {};
  const user = auth.user;
  const [profile, setProfile] = useState(getStoredProfile());
  const [saved, setSaved] = useState(false);

  const fullName = user?.username || user?.email?.split("@")[0] || "Patient";
  const initial = fullName.charAt(0).toUpperCase();

  const handleChange = (e) => {
    setSaved(false);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    saveProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-5 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#19A7CE] to-[#148AA1] rounded-3xl flex items-center justify-center text-3xl font-extrabold shadow-lg">
            {initial}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold">{fullName}</h1>
            <p className="text-sm text-slate-300">{user?.email || "Patient account"}</p>
            <p className="text-xs text-slate-400 mt-1 mt-2 uppercase tracking-wider">Member of MedX Health Network</p>
          </div>
          <button
            onClick={handleSave}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 self-start sm:self-center ${
              saved ? "bg-emerald-500 text-white" : "bg-[#19A7CE] hover:bg-[#148AA1] text-white"
            }`}
          >
            <i className={`fa-solid ${saved ? "fa-check" : "fa-floppy-disk"}`}></i>
            {saved ? "Saved!" : "Save Profile"}
          </button>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: "/dashboard", icon: "fa-chart-line", label: "Dashboard" },
            { to: "/smart-watch", icon: "fa-regular fa-clock", label: "Smart Watch" },
            { to: "/reminders", icon: "fa-bell", label: "Reminders" },
            { to: "/prescriptions", icon: "fa-prescription-bottle-medical", label: "Prescriptions" },
            { to: "/ask", icon: "fa-wand-magic-sparkles", label: "Ask MedX AI" },
            { to: "/doctors", icon: "fa-user-doctor", label: "Find a Doctor" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:border-[#19A7CE] hover:shadow-md transition-all group"
            >
              <i className={`fa-solid ${item.icon} text-[#19A7CE] text-lg group-hover:scale-110 transition-transform`}></i>
              <span className="font-bold text-xs text-slate-800">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Account Info */}
        <ProfileSection icon="fa-user" title="Account Information" subtitle="Your MedX sign-in details">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Field label="Username" value={user?.username} />
            <Field label="Email" value={user?.email} />
            <Field label="Account ID" value={user?.id ? `#${user.id}` : "—"} />
          </div>
        </ProfileSection>

        {/* Personal & Emergency Details */}
        <ProfileSection icon="fa-address-card" title="Personal Details" subtitle="Basic information for your care team">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="Ahmed" />
            <Input label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="Mohamed" />
            <Input label="Phone Number" name="phone" value={profile.phone} onChange={handleChange} type="tel" placeholder="+20 100 000 0000" />
            <Input label="Date of Birth" name="dateOfBirth" value={profile.dateOfBirth} onChange={handleChange} type="date" />
            <Select label="Gender" name="gender" value={profile.gender} onChange={handleChange} options={["Male", "Female"]} placeholder="Select gender" />
            <Select label="Blood Type" name="bloodType" value={profile.bloodType} onChange={handleChange} options={["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]} placeholder="Select blood type" />
            <Input label="Height (cm)" name="height" value={profile.height} onChange={handleChange} type="number" placeholder="175" />
            <Input label="Weight (kg)" name="weight" value={profile.weight} onChange={handleChange} type="number" placeholder="70" />
            <Input label="Emergency Contact" name="emergencyContact" value={profile.emergencyContact} onChange={handleChange} type="tel" placeholder="+20 100 000 0000" />
            <div className="sm:col-span-2">
              <Input label="Address" name="address" value={profile.address} onChange={handleChange} placeholder="Cairo, Egypt" />
            </div>
          </div>
        </ProfileSection>

        {/* Health History */}
        <ProfileSection icon="fa-heart-pulse" title="Health History" subtitle="Known conditions to share with your doctors">
          <div className="grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">Allergies</span>
              <textarea
                name="allergies"
                value={profile.allergies}
                onChange={handleChange}
                rows="2"
                placeholder="e.g. Penicillin, peanuts…"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition resize-none"
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-slate-600 mb-1 block">Chronic Conditions</span>
              <textarea
                name="chronicConditions"
                value={profile.chronicConditions}
                onChange={handleChange}
                rows="2"
                placeholder="e.g. Hypertension, Type 2 Diabetes…"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition resize-none"
              />
            </label>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default PatientProfile;