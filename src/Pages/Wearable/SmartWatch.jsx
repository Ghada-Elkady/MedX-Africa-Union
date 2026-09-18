import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import { getStoredProfile, addEmergencyAlert, getEmergencyAlerts, formatAlertTime } from "../../services/apiService";
import { useLanguage } from "../../Components/Context/LanguageContext";

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

// Scripted live sensor simulation: normal → spike → critical dip → recovery
const LIVE_SIM = [
    { hr: 74, o2: 97 },
    { hr: 88, o2: 96 },
    { hr: 132, o2: 93 },
    { hr: 158, o2: 88 },
    { hr: 162, o2: 84 },
    { hr: 90, o2: 95 },
    { hr: 76, o2: 97 }
];

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

const DANGER_STYLES = {
    Safe: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Warning: "bg-amber-100 text-amber-700 border-amber-200",
    Critical: "bg-red-100 text-red-700 border-red-200"
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
    const [watchAlert, setWatchAlert] = useState(null);
    const [live, setLive] = useState({ hr: TODAY_READINGS.heartRate.value, o2: TODAY_READINGS.oxygen.value });
    const [autoSos, setAutoSos] = useState(true);
    const [countdown, setCountdown] = useState(null);
    const countdownRef = useRef(null);
    const armedRef = useRef(false);
    const { t } = useLanguage();
    const profile = getStoredProfile();

    const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "MedX Patient";
    const alertAddress = profile.address || "Location shared via profile";
    const [myAlerts, setMyAlerts] = useState(() =>
        getEmergencyAlerts().filter((a) => a.patientName === fullName)
    );

    // Live sensor simulation (only while a watch is connected)
    useEffect(() => {
        if (!connectedWatch || !autoSos) return;
        let i = 0;
        const id = setInterval(() => {
            i = (i + 1) % LIVE_SIM.length;
            setLive(LIVE_SIM[i]);
        }, 6000);
        return () => clearInterval(id);
    }, [connectedWatch, autoSos]);

    // Auto-SOS on critical vitals with cancel countdown
    useEffect(() => {
        const hr = live.hr;
        const o2 = live.o2;
        const critical = hr >= 150 || o2 < 90;
        if (autoSos && connectedWatch && critical) {
            if (!armedRef.current) {
                armedRef.current = true;
                setCountdown(5);
                countdownRef.current = setInterval(() => {
                    setCountdown((c) => {
                        if (c <= 1) {
                            dispatchSos(
                                "Watch SOS — Auto Critical Detection",
                                `Critical vitals detected: HR ${hr} bpm, SpO2 ${o2}%`,
                                "Critical"
                            );
                            setCountdown(null);
                            armedRef.current = false;
                            if (countdownRef.current) clearInterval(countdownRef.current);
                            countdownRef.current = null;
                            return c;
                        }
                        return c - 1;
                    });
                }, 1000);
            }
        } else {
            if (countdownRef.current) clearInterval(countdownRef.current);
            countdownRef.current = null;
            armedRef.current = false;
            setCountdown(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [live, autoSos, connectedWatch]);

    useEffect(() => () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
    }, []);

    const cancelAutoSos = () => {
        if (countdownRef.current) clearInterval(countdownRef.current);
        countdownRef.current = null;
        armedRef.current = false;
        setCountdown(null);
        setWatchAlert({
            title: "Auto-SOS Cancelled",
            body: "You are safe. Critical alert aborted.",
            severity: "Warning"
        });
        setTimeout(() => setWatchAlert(null), 4000);
    };

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

    const computeDanger = (hr = live.hr, o2 = live.o2) => {
        const temp = TODAY_READINGS.temperature.value;
        const [sys] = TODAY_READINGS.bloodPressure.value.split("/").map(Number);

        if (hr > 140 || hr < 40) return { level: "Critical", reason: "Heart rate out of safe range" };
        if (o2 < 90) return { level: "Critical", reason: "Dangerously low blood oxygen (SpO2)" };
        if (temp >= 39.5) return { level: "Critical", reason: "Very high body temperature" };
        if (sys >= 180) return { level: "Critical", reason: "Severe blood pressure reading" };
        if (o2 < 94 || temp >= 38.5 || sys >= 140 || hr >= 110) {
            return { level: "Warning", reason: "Vitals outside your usual range" };
        }
        return { level: "Safe", reason: "All vitals within normal limits" };
    };

    const dispatchSos = (type, reason, severity) => {
        addEmergencyAlert({
            patientName: fullName,
            address: alertAddress,
            phone: profile.phone || "",
            emergencyContact: profile.emergencyContact || "",
            bloodType: profile.bloodType || "Unknown",
            type,
            icon: type.includes("Fall") ? "🩹" : "🆘",
            severity,
            reason: reason || "Patient signaled danger",
            watch: connectedWatch ? connectedWatch.name : "MedX Watch"
        });

        if (navigator.vibrate) navigator.vibrate([300, 100, 300]);

        setWatchAlert({
            title: type.includes("Fall") ? "Fall Detected — SOS Sent" : "Panic SOS Sent",
            body: `${fullName} signaled danger. Rescue Team notified with location, blood type & vitals.`,
            severity
        });
        setMyAlerts(getEmergencyAlerts().filter((a) => a.patientName === fullName));
        setTimeout(() => setWatchAlert(null), 7000);
    };

    const triggerSos = (mode) => {
        const danger = computeDanger();
        const isSos = mode === "sos";
        dispatchSos(
            isSos ? "Watch SOS — Panic Button" : "Watch SOS — Fall Detected",
            danger.reason,
            danger.level === "Safe" ? "High" : danger.level
        );
    };

    const exportPdf = () => {
        const doc = new jsPDF();
        const brand = [25, 167, 206];
        const dark = [15, 23, 42];

        doc.setFontSize(20);
        doc.setTextColor(...brand);
        doc.text("MedX Health Report", 14, 22);

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 29);

        doc.setFontSize(12);
        doc.setTextColor(...dark);
        doc.text("Patient", 14, 40);
        doc.setFontSize(10);
        doc.setTextColor(60);
        doc.text(`Name: ${fullName}   |   Blood type: ${profile.bloodType || "Unknown"}`, 14, 47);
        doc.text(`Address: ${alertAddress}`, 14, 53);
        doc.text(`Emergency contact: ${profile.emergencyContact || "Not set"}`, 14, 59);

        doc.setFontSize(12);
        doc.setTextColor(...dark);
        let y = 70;
        doc.text("Latest Readings", 14, y);
        y += 7;
        doc.setFontSize(10);
        doc.setTextColor(60);
        Object.values(metrics).forEach((m) => {
            doc.text(`${m.label}: ${m.value} ${m.unit}  (${m.status})`, 14, y);
            y += 6;
        });

        y += 4;
        doc.setFontSize(12);
        doc.setTextColor(...dark);
        doc.text("Watch-Detected Diagnoses", 14, y);
        y += 7;
        doc.setFontSize(10);
        doc.setTextColor(60);
        DIAGNOSES.forEach((d) => {
            const lines = doc.splitTextToSize(`${d.name} — ${d.detail}`, 180);
            doc.text(lines, 14, y);
            y += lines.length * 5 + 3;
        });

        y += 2;
        doc.setFontSize(12);
        doc.setTextColor(...dark);
        doc.text("Tracked Diseases", 14, y);
        y += 7;
        doc.setFontSize(10);
        doc.setTextColor(60);
        diseases.forEach((d) => {
            doc.text(`${d.name}  (${d.status})`, 14, y);
            y += 6;
        });

        doc.setTextColor(130);
        doc.setFontSize(8);
        doc.text("This report is informational and not a medical diagnosis.", 14, y + 10);

        doc.save("MedX-Health-Report.pdf");
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
    const danger = computeDanger(
        connectedWatch ? live.hr : TODAY_READINGS.heartRate.value,
        connectedWatch ? live.o2 : TODAY_READINGS.oxygen.value
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-16">
            {/* Simulated Watch Notification (dispatched to your watch) */}
            {watchAlert && (
                <div className={`fixed top-20 inset-x-0 z-[60] px-4`}>
                    <div className={`mx-auto max-w-md rounded-2xl border-2 shadow-2xl p-4 flex items-start gap-3 animate-bounce ${
                        watchAlert.severity === "Critical"
                            ? "bg-red-600 border-red-300"
                            : watchAlert.severity === "Warning"
                                ? "bg-amber-500 border-amber-300"
                                : "bg-[#19A7CE] border-[#148AA1]"
                    } text-white`}>
                        <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                            🚨
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">MEDX WATCH ALERT</span>
                                <span className="text-[10px] font-bold">{connectedWatch ? connectedWatch.name : "MedX Watch"}</span>
                            </div>
                            <p className="font-extrabold text-sm mt-1">{watchAlert.title}</p>
                            <p className="text-xs opacity-90 mt-0.5">{watchAlert.body}</p>
                        </div>
                        <button onClick={() => setWatchAlert(null)} className="text-white/80 hover:text-white text-lg leading-none">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            )}
            <div className="max-w-6xl mx-auto px-5 space-y-8">

                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center sm:text-left">
                        <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Wearables & Health Monitoring
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold">{t("watch_title")}</h1>
                        <p className="text-sm text-slate-300">
                            {connectedWatch
                                ? t("watch_status_connected")
                                : t("watch_status_disconnected")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={exportPdf}
                            className="px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-md flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20"
                        >
                            <i className="fa-solid fa-file-pdf"></i>
                            Export PDF
                        </button>
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
                </div>

                {/* Connect Devices */}
                <SectionCard icon="fa-link" title={t("watch_connect")} subtitle="Tap a device to pair — MedX reads heart rate, SpO2, blood pressure, sleep and more">
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
                <SectionCard icon="fa-chart-line" title={t("watch_readings")} subtitle="Live streamed from your watch — select a range">
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

                {/* Danger, SOS & Rescue */}
                <SectionCard icon="fa-triangle-exclamation" title={t("watch_danger")} subtitle="Your watch sensors detect danger and alert the Rescue Team instantly" accent="from-red-600 to-rose-700">
                    <div className="grid sm:grid-cols-3 gap-3 mb-5">
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Patient Profile</p>
                            <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                {fullName}
                                <Link to="/profile" className="text-[#19A7CE] hover:underline text-xs font-semibold" title="Edit profile">
                                    <i className="fa-solid fa-pen"></i>
                                </Link>
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                                <i className="fa-solid fa-location-dot text-xs"></i>{alertAddress}
                            </p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Emergency Contact</p>
                            <p className="text-sm font-bold text-slate-800">{profile.emergencyContact || "Not set"}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">Blood type: {profile.bloodType || "Unknown"}</p>
                        </div>
                        <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
                            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">Sensor Safety Status</p>
                            <span className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-xs font-bold ${DANGER_STYLES[danger.level]}`}>
                                <i className={`fa-solid ${danger.level === "Safe" ? "fa-shield-heart" : danger.level === "Warning" ? "fa-circle-exclamation" : "fa-triangle-exclamation"}`}></i>
                                {danger.level}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-2">
                                {connectedWatch ? `HR ${live.hr} bpm · SpO2 ${live.o2}%` : danger.reason}
                            </p>
                        </div>
                    </div>

                    {/* Auto-SOS on critical vitals */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#19A7CE]/10 text-[#19A7CE] flex items-center justify-center text-lg">
                                <i className="fa-solid fa-robot"></i>
                            </div>
                            <div>
                                <p className="font-extrabold text-slate-900 text-sm">Auto-SOS on critical vitals</p>
                                <p className="text-xs text-slate-500">
                                    Fires rescue automatically when HR ≥ 150 or SpO2 &lt; 90, with a {countdown !== null ? countdown : 5}-second cancel window.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setAutoSos((prev) => !prev)}
                            disabled={!connectedWatch}
                            className={`relative w-12 h-7 flex items-center rounded-full transition-colors flex-shrink-0 ${
                                autoSos && connectedWatch ? "bg-emerald-500" : "bg-slate-300"
                            } ${!connectedWatch ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
                            title={connectedWatch ? (autoSos ? "Auto-SOS on" : "Auto-SOS off") : "Connect a watch first"}
                        >
                            <span className={`absolute w-5 h-5 bg-white rounded-full shadow transition-all ${autoSos && connectedWatch ? "left-[calc(100%-22px)]" : "left-1"}`}></span>
                        </button>
                    </div>

                    {countdown !== null && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-red-600 text-white rounded-2xl px-5 py-4 mb-4 animate-pulse shadow-md">
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-triangle-exclamation text-xl"></i>
                                <div>
                                    <p className="font-extrabold text-sm">Critical vitals detected — auto SOS incoming</p>
                                    <p className="text-xs text-red-100">Rescue alert will be sent in {countdown} seconds. Cancel if you are safe.</p>
                                </div>
                            </div>
                            <button
                                onClick={cancelAutoSos}
                                className="bg-white text-red-600 font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-50 transition-colors flex-shrink-0"
                            >
                                <i className="fa-solid fa-circle-xmark mr-1"></i> I'm Safe — Cancel
                            </button>
                        </div>
                    )}

                    {!connectedWatch && (
                        <p className="text-[11px] text-slate-400 mb-4">
                            <i className="fa-solid fa-circle-info mr-1 text-[#19A7CE]"></i>
                            Connect a smart watch above to enable live sensor simulation and auto-SOS.
                        </p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl p-5">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl shadow-md">
                                <i className="fa-solid fa-bolt"></i>
                            </div>
                            <div>
                                <p className="font-extrabold text-slate-900 text-sm">Send an SOS signal</p>
                                <p className="text-xs text-slate-500">
                                    If you are in danger, MedX dispatches your location, blood type & vitals to the Rescue Volunteers team and notifies your watch + app.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                onClick={() => triggerSos("sos")}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                            >
                                <i className="fa-solid fa-satellite-dish"></i> Send SOS
                            </button>
                            <button
                                onClick={() => triggerSos("fall")}
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1.5"
                            >
                                <i className="fa-solid fa-person-falling"></i> Simulate Fall
                            </button>
                        </div>
                    </div>

                    {myAlerts.length > 0 && (
                        <div className="mt-5">
                            <p className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
                                <i className="fa-solid fa-flag text-red-600"></i> My rescue alerts
                            </p>
                            <div className="space-y-2">
                                {myAlerts.map((alert) => (
                                    <div key={alert.id} className="border border-slate-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 hover:bg-slate-50 transition">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-xl">{alert.icon}</span>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-slate-800">{alert.type}</p>
                                                <p className="text-[11px] text-slate-500 truncate">{alert.reason}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                                alert.status === "Rescued" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                            }`}>
                                                {alert.status}
                                            </span>
                                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{formatAlertTime(alert.createdAt)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/dashboard/rescue"
                                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#19A7CE] hover:underline"
                            >
                                <i className="fa-solid fa-flag"></i> Track in the Rescue Volunteers Center
                            </Link>
                        </div>
                    )}
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