import { useState } from "react";
import { getStoredProfile } from "../../services/apiService";

const WATCHES = [
    { id: "apple", name: "Apple Watch", brand: "Apple", icon: "🍎", accents: ["Heart Rate", "ECG", "SpO2", "Sleep"] },
    { id: "galaxy", name: "Galaxy Watch", brand: "Samsung", icon: "🪐", accents: ["Blood Pressure", "ECG", "Sleep"] },
    { id: "fitbit", name: "Inspire / Sense", brand: "Fitbit", icon: "⌚", accents: ["Heart Rate", "Sleep", "Steps"] },
    { id: "garmin", name: "Forerunner / Venu", brand: "Garmin", icon: "🏃", accents: ["HR Zones", "SpO2", "Activity"] },
    { id: "huawei", name: "Watch GT", brand: "Huawei", icon: "🕶️", accents: ["SpO2", "Stress", "Sleep"] },
    { id: "miband", name: "Mi Smart Band", brand: "Xiaomi", icon: "📿", accents: ["Heart Rate", "Steps", "Sleep"] }
];

const TODAY_READINGS = {
    heartRate: { icon: "fa-heart-pulse", label: "Heart Rate", value: 72, unit: "bpm", status: "Normal", bars: [45, 52, 60, 55, 72, 68, 74, 70, 63] },
    oxygen: { icon: "fa-droplet", label: "Blood Oxygen (SpO2)", value: 97, unit: "%", status: "Normal", bars: [96, 97, 96, 98, 97, 96, 97, 96, 97] },
    bloodPressure: { icon: "fa-gauge-high", label: "Blood Pressure", value: "118/76", unit: "mmHg", status: "Normal", bars: [40, 44, 50, 46, 55, 52, 58, 54, 50] },
    temperature: { icon: "fa-temperature-half", label: "Body Temp", value: 36.8, unit: "°C", status: "Normal", bars: [30, 32, 35, 33, 36, 35, 37, 35, 34] },
    sleep: { icon: "fa-moon", label: "Sleep", value: 7.2, unit: "hrs", status: "Normal", bars: [55, 62, 70, 75, 68, 72, 80] },
    steps: { icon: "fa-person-walking", label: "Steps", value: 8425, unit: "steps", status: "Active", bars: [20, 35, 55, 70, 85, 95, 100] },
    activeMinutes: { icon: "fa-fire", label: "Active Minutes", value: 46, unit: "min", status: "Good", bars: [30, 40, 60, 75, 50, 80, 90] },
    calories: { icon: "fa-bolt", label: "Calories Burned", value: 532, unit: "kcal", status: "—", bars: [25, 45, 65, 70, 85, 60, 95] }
};

const STATUS_STYLES = {
    Normal: "bg-emerald-100 text-emerald-700",
    Active: "bg-cyan-100 text-cyan-700",
    Good: "bg-teal-100 text-teal-700",
    Elevated: "bg-amber-100 text-amber-700",
    Low: "bg-orange-100 text-orange-700",
    "—": "bg-slate-100 text-slate-500"
};

const DIAGNOSES = [
    { id: 1, name: "Sinus Arrhythmia Pattern", severity: "Monitor", icon: "🫀", detail: "Mild heart rate variation detected during sleep tracking. Common and often benign; review with your doctor if you feel palpitations.", date: "Sep 16, 2026" },
    { id: 2, name: "Sleep Apnea Indication", severity: "Moderate", icon: "😴", detail: "Repeated SpO2 dips below 90% during deep sleep with snoring patterns across several nights.", date: "Sep 14, 2026" },
    { id: 3, name: "Hypertension Early Trend", severity: "Raised", icon: "🩸", detail: "Systolic pressure trending 130–140 mmHg during recovery peaks after activity. Keep monitoring morning readings.", date: "Sep 10, 2026" },
    { id: 4, name: "SpO2 Within Normal Range", severity: "Healthy", icon: "🫁", detail: "Average daytime oxygen saturation remains 96–98%, within expected healthy range.", date: "Sep 18, 2026" }
];

const SEVERITY_STYLES = {
    Healthy: "bg-emerald-100 text-emerald-700",
    Monitor: "bg-cyan-100 text-cyan-700",
    Moderate: "bg-amber-100 text-amber-700",
    Raised: "bg-orange-100 text-orange-700"
};

const DEFAULT_DISEASES = [
    { name: "Hypertension", status: "Under Control", icon: "🩸" },
    { name: "Type 2 Diabetes", status: "Monitoring", icon: "🩺" },
    { name: "High Cholesterol", status: "Monitoring", icon: "🧪" }
];

const DISEASE_STATUS_STYLES = {
    "Under Control": "bg-emerald-100 text-emerald-700",
    Monitoring: "bg-amber-100 text-amber-700",
    Active: "bg-red-100 text-red-700"
};

const SectionCard = ({ icon, title, subtitle, children, accent = "from-[#19A7CE] to-[#148AA1]" }) => (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className={`bg-gradient-to-r ${accent} px-6 py-5 flex items-center gap-3`}>
            <div className="w-11 h-11 bg-white/20 text-white rounded-xl flex items-center justify-center text-lg">
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <div>
                <h2 className="font-extrabold text-white text-base">{title}</h2>
                <p className="text-xs text-white/70 mt-0.5">{subtitle}</p>
            </div>
        </div>
        <div className="p-6">{children}</div>
    </div>
);

const MetricCard = ({ metric }) => (
    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 hover:shadow-sm transition">
        <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">{metric.label}</span>
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLES[metric.status] || STATUS_STYLES["—"]}`}>
                {metric.status}
            </span>
        </div>
        <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{metric.value}</span>
            <span className="text-xs text-slate-400 font-semibold">{metric.unit}</span>
        </div>
        <div className="mt-3 flex items-end gap-1 h-10">
            {metric.bars.map((b, idx) => (
                <div key={idx} className="flex-1 rounded-t bg-[#19A7CE]/25" style={{ height: `${b}%` }}></div>
            ))}
        </div>
    </div>
);

const SmartWatch = () => {
    const [connectedWatch, setConnectedWatch] = useState(null);
    const [tab, setTab] = useState("Today");
    const [syncing, setSyncing] = useState(false);
    const [lastSync, setLastSync] = useState("Just now");
    const profile = getStoredProfile();

    const chronicList = (profile.chronicConditions || "")
        .split(/[,،\n]+/)
        .map((s) => s.trim())
        .filter(Boolean);

    const diseases = chronicList.length > 0
        ? chronicList.map((name) => ({ name, status: "Monitoring", icon: "🩺" }))
        : DEFAULT_DISEASES;

    const handleConnect = (watch) => {
        setConnectedWatch(connectedWatch === watch.id ? null : watch);
    };

    const handleSync = () => {
        setSyncing(true);
        setTimeout(() => {
            setSyncing(false);
            setLastSync("Just now");
        }, 1000);
    };

    const renderMetrics = () => {
        if (tab === "Today") return TODAY_READINGS;
        if (tab === "Week") {
            return Object.fromEntries(
                Object.entries(TODAY_READINGS).map(([key, m]) => {
                    if (key === "bloodPressure") {
                        const [s, d] = m.value.split("/").map(Number);
                        const ns = Math.round(s * 1.03);
                        const nd = Math.round(d * 1.02);
                        return [key, { ...m, value: `${ns}/${nd}`, bars: m.bars.map((b) => Math.min(100, Math.round(b * 1.06))) }];
                    }
                    if (typeof m.value === "number") {
                        return [key, { ...m, value: Math.round(m.value * 1.08), bars: m.bars.map((b) => Math.min(100, Math.round(b * 1.08))) }];
                    }
                    return [key, m];
                })
            );
        }
        return Object.fromEntries(
            Object.entries(TODAY_READINGS).map(([key, m]) => {
                if (key === "bloodPressure") {
                    return [key, { ...m, value: "126/82", bars: m.bars.map((b) => Math.max(8, Math.round(b * 0.96))) }];
                }
                if (typeof m.value === "number") {
                    return [key, { ...m, value: Math.round(m.value * 1.14), bars: m.bars.map((b) => Math.max(8, Math.round(b * 1.14))) }];
                }
                return [key, m];
            })
        );
    };

    const metrics = renderMetrics();

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            <div className="max-w-6xl mx-auto px-5 space-y-8">

                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Wearables & Health Monitoring
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold">Smart Watch Connection</h1>
                        <p className="text-sm text-slate-300">
                            {connectedWatch
                                ? `Connected to ${connectedWatch.name} — live readings streaming`
                                : "Connect your smart watch to stream your health readings, diagnoses, and tracked diseases"}
                        </p>
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={!connectedWatch || syncing}
                        className={`px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 flex-shrink-0 ${
                            connectedWatch && !syncing
                                ? "bg-[#19A7CE] hover:bg-[#148AA1] text-white cursor-pointer"
                                : "bg-slate-700 text-slate-300 cursor-not-allowed"
                        }`}
                    >
                        <i className={`fa-solid ${syncing ? "fa-rotate fa-spin" : "fa-arrows-rotate"}`}></i>
                        {syncing ? "Syncing…" : "Sync Now"}
                    </button>
                </div>

                {/* Connect Devices */}
                <SectionCard icon="fa-link" title="Connect Your Smart Watch" subtitle="Tap a device to pair — MedX reads heart rate, SpO2, blood pressure, sleep and more">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {WATCHES.map((watch) => {
                            const isConnected = connectedWatch?.id === watch.id;
                            return (
                                <button
                                    key={watch.id}
                                    onClick={() => handleConnect(watch)}
                                    className={`border rounded-2xl p-4 text-center transition-all ${
                                        isConnected
                                            ? "border-[#19A7CE] bg-[#19A7CE]/5 ring-2 ring-[#19A7CE]/20"
                                            : "border-slate-200 hover:border-[#19A7CE]/50 hover:shadow-sm"
                                    }`}
                                >
                                    <div className="text-3xl mb-2">{watch.icon}</div>
                                    <p className="text-xs font-bold text-slate-800">{watch.name}</p>
                                    <p className="text-[10px] text-slate-400 font-semibold">{watch.brand}</p>
                                    <span className={`mt-2 inline-block text-[10px] font-bold px-2 py-1 rounded-full ${
                                        isConnected ? "bg-[#19A7CE] text-white" : "bg-slate-100 text-slate-500"
                                    }`}>
                                        {isConnected ? "Connected" : "Connect"}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-4 text-[11px] text-slate-400">
                        <i className="fa-solid fa-shield-halved mr-1 text-[#19A7CE]"></i>
                        Pairing is encrypted and readings stay private to your MedX profile.
                    </p>
                </SectionCard>

                {/* Live Readings */}
                <SectionCard icon="fa-chart-line" title="Your Readings" subtitle="Live streamed from your watch — select a range">
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-fit mb-5">
                        {["Today", "Week", "Month"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    tab === t ? "bg-white text-[#19A7CE] shadow-sm" : "text-slate-500"
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                        <span className="ml-3 pr-2 text-[10px] text-slate-400 font-semibold">
                            <i className="fa-solid fa-clock mr-1"></i>{lastSync}
                        </span>
                    </div>

                    {!connectedWatch && (
                        <div className="bg-amber-50 border border-amber-200 px-4 py-3 rounded-xl text-amber-800 text-xs mb-5">
                            <span className="font-bold">No watch connected:</span> showing your last synced readings. Connect a device above to stream live data.
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.values(metrics).map((metric) => (
                            <MetricCard key={metric.label} metric={metric} />
                        ))}
                    </div>
                </SectionCard>

                {/* Diagnoses */}
                <SectionCard icon="fa-stethoscope" title="Watch-Detected Diagnoses" subtitle="Insights derived from your wearable readings" accent="from-emerald-600 to-teal-700">
                    <div className="space-y-3">
                        {DIAGNOSES.map((diag) => (
                            <div key={diag.id} className="border border-slate-100 rounded-2xl p-4 flex items-start gap-3 hover:bg-slate-50 transition">
                                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-xl flex items-center justify-center flex-shrink-0">
                                    {diag.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <p className="font-bold text-sm text-slate-900">{diag.name}</p>
                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${SEVERITY_STYLES[diag.severity] || SEVERITY_STYLES.Monitor}`}>
                                            {diag.severity}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">{diag.detail}</p>
                                    <p className="text-[10px] text-slate-400 mt-2"><i className="fa-regular fa-calendar mr-1"></i>{diag.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-[11px] text-slate-400">
                        <i className="fa-solid fa-circle-info mr-1 text-[#19A7CE]"></i>
                        These are device-generated insights, not medical diagnoses — always confirm with a licensed doctor.
                    </p>
                </SectionCard>

                {/* Diseases */}
                <SectionCard icon="fa-disease" title="Tracked Diseases & Conditions" subtitle="Your chronic conditions, monitored through watch readings" accent="from-rose-600 to-pink-700">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {diseases.map((disease, idx) => (
                            <div key={`${disease.name}-${idx}`} className="border border-slate-100 rounded-2xl p-4 flex items-center gap-3 hover:shadow-sm transition">
                                <div className="text-2xl">{disease.icon}</div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm text-slate-900">{disease.name}</p>
                                </div>
                                <span className={`inline-flex px-2 py-1 rounded-full text-[10px] font-bold ${DISEASE_STATUS_STYLES[disease.status] || DISEASE_STATUS_STYLES.Monitoring}`}>
                                    {disease.status}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-4 text-[11px] text-slate-400">
                        <i className="fa-solid fa-circle-info mr-1 text-[#19A7CE]"></i>
                        Conditions come from your MedX profile. Edit them on your{" "}
                        <a href="/profile" className="text-[#19A7CE] font-bold hover:underline">patient profile</a>.
                    </p>
                </SectionCard>
            </div>
        </div>
    );
};

export default SmartWatch;