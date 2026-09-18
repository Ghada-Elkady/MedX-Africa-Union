import { useState } from "react";
import { Link } from "react-router-dom";
import {
    getReminders,
    saveReminder,
    deleteReminder,
    markReminderNotified,
    getStoredAppointments,
    addNotification
} from "../../services/apiService";

const Reminders = () => {
    const [reminders, setReminders] = useState(getReminders());
    const [form, setForm] = useState({ name: "", dose: "", time: "08:00", frequency: "Daily" });
    const [added, setAdded] = useState(false);
    const appointments = getStoredAppointments();

    const handleAdd = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        saveReminder(form);
        setReminders(getReminders());
        setForm({ name: "", dose: "", time: "08:00", frequency: "Daily" });
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    const nowMinutes = () => {
        const d = new Date();
        return d.getHours() * 60 + d.getMinutes();
    };

    const isDue = (r) => {
        const [h, m] = (r.time || "23:59").split(":").map(Number);
        return h * 60 + m <= nowMinutes();
    };

    const notifyMed = (r) => {
        addNotification({
            icon: "💊",
            title: "Medication Reminder",
            body: `Time to take: ${r.name}${r.dose ? ` (${r.dose})` : ""}`
        });
        markReminderNotified(r.id);
        setReminders(getReminders());
    };

    const remove = (r) => {
        deleteReminder(r.id);
        setReminders(getReminders());
    };

    const notifyAppt = (appt) => {
        addNotification({
            icon: "🗓️",
            title: "Appointment Reminder",
            body: `Upcoming: ${appt.doctor_name || "Doctor visit"} — ${appt.date || ""} ${appt.time || ""}`
        });
    };

    const dueCount = reminders.filter((r) => !r.notified && isDue(r)).length;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-5 space-y-8">

                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                        <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Medication & Appointments
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold">Reminders</h1>
                        <p className="text-sm text-slate-300">
                            Never miss a dose or an appointment — reminders fire as app notifications
                        </p>
                    </div>
                    {dueCount > 0 && (
                        <div className="bg-red-500/20 border border-red-400/40 text-red-200 font-bold text-sm px-4 py-3 rounded-xl flex items-center gap-2 flex-shrink-0">
                            <i className="fa-solid fa-bell animate-pulse"></i>
                            {dueCount} due now
                        </div>
                    )}
                </div>

                {/* Medication Reminders */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-[#19A7CE] to-[#148AA1] px-6 py-5 flex items-center gap-3">
                        <div className="w-11 h-11 bg-white/20 text-white rounded-xl flex items-center justify-center text-lg">
                            <i className="fa-solid fa-pills"></i>
                        </div>
                        <div>
                            <h2 className="font-extrabold text-white text-base">Medication Reminders</h2>
                            <p className="text-xs text-white/70">Add your medications and get notified at dose time</p>
                        </div>
                    </div>
                    <div className="p-6 grid lg:grid-cols-2 gap-8">
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-600 mb-1 block">Medicine</span>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        required
                                        placeholder="e.g. Metformin"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-600 mb-1 block">Dose</span>
                                    <input
                                        type="text"
                                        value={form.dose}
                                        onChange={(e) => setForm({ ...form, dose: e.target.value })}
                                        placeholder="e.g. 500 mg"
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-600 mb-1 block">Time</span>
                                    <input
                                        type="time"
                                        value={form.time}
                                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
                                    />
                                </label>
                                <label className="block">
                                    <span className="text-xs font-bold text-slate-600 mb-1 block">Frequency</span>
                                    <select
                                        value={form.frequency}
                                        onChange={(e) => setForm({ ...form, frequency: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#19A7CE]/40 focus:border-[#19A7CE] transition"
                                    >
                                        {["Daily", "Twice Daily", "Weekly", "As Needed"].map((o) => (
                                            <option key={o} value={o}>{o}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-6 py-3 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-sm transition-colors shadow-md flex items-center gap-2 justify-center"
                            >
                                <i className="fa-solid fa-plus"></i>
                                {added ? "Added!" : "Add Reminder"}
                            </button>
                        </form>

                        <div>
                            <p className="text-xs font-bold text-slate-700 mb-2">My medication ({reminders.length})</p>
                            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                                {reminders.length === 0 ? (
                                    <p className="text-sm text-slate-400 text-center py-10 border border-dashed border-slate-200 rounded-2xl">
                                        No medications added yet.
                                    </p>
                                ) : (
                                    reminders.map((r) => {
                                        const due = isDue(r);
                                        return (
                                            <div key={r.id} className="border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${due ? "bg-red-100" : "bg-cyan-100"}`}>
                                                        💊
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-bold text-slate-800">{r.name}</p>
                                                        <p className="text-[11px] text-slate-500">{r.dose || "As prescribed"} · {r.frequency}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <div className="text-center">
                                                        <span className={`block text-xs font-bold ${due ? "text-red-600" : "text-slate-700"}`}>{r.time}</span>
                                                        {due && !r.notified && (
                                                            <span className="text-[9px] font-bold text-red-500 uppercase">Due</span>
                                                        )}
                                                    </div>
                                                    {due && !r.notified && (
                                                        <button
                                                            onClick={() => notifyMed(r)}
                                                            title="Send reminder notification"
                                                            className="w-8 h-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
                                                        >
                                                            <i className="fa-solid fa-bell"></i>
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => remove(r)}
                                                        title="Delete reminder"
                                                        className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Reminders */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-700 to-purple-800 px-6 py-5 flex items-center gap-3">
                        <div className="w-11 h-11 bg-white/20 text-white rounded-xl flex items-center justify-center text-lg">
                            <i className="fa-solid fa-calendar-check"></i>
                        </div>
                        <div>
                            <h2 className="font-extrabold text-white text-base">Upcoming Appointments</h2>
                            <p className="text-xs text-white/70">Firing a notification reminds you before you go</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="grid sm:grid-cols-2 gap-3">
                            {appointments.map((appt, idx) => (
                                <div key={idx} className="border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-9 h-9 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center flex-shrink-0">
                                            <i className="fa-solid fa-user-doctor"></i>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-bold text-slate-800 truncate">{appt.doctor_name || "Doctor visit"}</p>
                                            <p className="text-[11px] text-slate-500">{appt.date}{appt.time ? ` · ${appt.time}` : ""}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => notifyAppt(appt)}
                                        title="Send reminder notification"
                                        className="w-8 h-8 rounded-lg bg-violet-100 text-violet-600 hover:bg-violet-200 transition flex-shrink-0"
                                    >
                                        <i className="fa-solid fa-bell"></i>
                                    </button>
                                </div>
                            ))}
                        </div>
                        {appointments.length === 0 && (
                            <p className="text-sm text-slate-400 text-center py-8 border border-dashed border-slate-200 rounded-2xl">
                                No upcoming appointments —{" "}
                                <Link to="/doctors" className="text-[#19A7CE] font-bold hover:underline">book a doctor</Link>.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reminders;