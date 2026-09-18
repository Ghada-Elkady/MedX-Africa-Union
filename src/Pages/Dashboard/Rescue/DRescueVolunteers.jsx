import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

// Mock disaster data (Disaster places shown to rescue volunteers)
const MOCK_DISASTER_SITES = [
    {
        id: 1,
        place: "Ramsis Downtown Market",
        location: "Ramses Square, Downtown Cairo",
        type: "Fire",
        icon: "🔥",
        severity: "Critical",
        affected: 120,
        status: "Active",
        volunteers: 8,
        reported: "10:45 AM",
    },
    {
        id: 2,
        place: "Zamalek Riverside Flats",
        location: "Zamalek, Cairo",
        type: "Flooding",
        icon: "🌊",
        severity: "High",
        affected: 340,
        status: "Active",
        volunteers: 14,
        reported: "9:20 AM",
    },
    {
        id: 3,
        place: "Building Collapse Site",
        location: "Mansheyat Nasser, Cairo",
        type: "Structural Collapse",
        icon: "🏚️",
        severity: "Critical",
        affected: 78,
        status: "In Progress",
        volunteers: 22,
        reported: "8:15 AM",
    },
    {
        id: 4,
        place: "Hurghada Coastal Village",
        location: "Hurghada, Red Sea",
        type: "Storm",
        icon: "🌪️",
        severity: "Medium",
        affected: 250,
        status: "Active",
        volunteers: 6,
        reported: "Yesterday 11:00 PM",
    },
    {
        id: 5,
        place: "Aswan Earthquake Aftermath",
        location: "Aswan City Center",
        type: "Earthquake",
        icon: "🗻",
        severity: "High",
        affected: 410,
        status: "On Hold",
        volunteers: 11,
        reported: "2 days ago",
    },
    {
        id: 6,
        place: "Nasr City Field Hospital",
        location: "Al Hay Al Asher, Nasr City, Cairo",
        type: "Medical Emergency",
        icon: "🚑",
        severity: "High",
        affected: 95,
        status: "Rescued",
        volunteers: 18,
        reported: "3 days ago",
    },
    {
        id: 7,
        place: "Embaba Low-Lying District",
        location: "Embaba, Giza",
        type: "Flooding",
        icon: "🌊",
        severity: "Medium",
        affected: 195,
        status: "Rescued",
        volunteers: 9,
        reported: "4 days ago",
    }
];

const severityStyles = {
    Critical: { badge: "bg-red-100 text-red-700", dot: "bg-red-500" },
    High: { badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
    Medium: { badge: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
    Low: { badge: "bg-green-100 text-green-700", dot: "bg-green-500" }
};

const statusStyles = {
    Active: "bg-red-50 text-red-700 border-red-200",
    "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
    "On Hold": "bg-gray-100 text-gray-600 border-gray-200",
    Rescued: "bg-green-50 text-green-700 border-green-200"
};

const riskStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-amber-100 text-amber-700",
    Low: "bg-green-100 text-green-700"
};

// Mock disaster-related diseases (health risks that spread after disasters)
const MOCK_DISASTER_DISEASES = [
    {
        id: 1,
        name: "Cholera",
        icon: "🦠",
        relatedTo: ["Flooding", "Storm"],
        risk: "High",
        mode: "Contaminated water & food",
        advice: "Use boiled/treated water, wash hands with soap, report watery diarrhea immediately.",
    },
    {
        id: 2,
        name: "Dengue Fever",
        icon: "🦟",
        relatedTo: ["Flooding", "Storm"],
        risk: "High",
        mode: "Mosquito bites in stagnant water",
        advice: "Drain standing water, use mosquito nets and repellent, cover water containers.",
    },
    {
        id: 3,
        name: "Tetanus",
        icon: "🩹",
        relatedTo: ["Earthquake", "Structural Collapse"],
        risk: "Medium",
        mode: "Wounds cut by debris & metal",
        advice: "Clean all wounds, verify tetanus vaccination, watch for jaw stiffness.",
    },
    {
        id: 4,
        name: "Acute Respiratory Infection",
        icon: "🫁",
        relatedTo: ["Fire", "Storm"],
        risk: "Medium",
        mode: "Smoke inhalation & dust exposure",
        advice: "Wear N95 masks near smoke/debris, keep rescue areas ventilated.",
    },
    {
        id: 5,
        name: "Leptospirosis",
        icon: "🐀",
        relatedTo: ["Flooding"],
        risk: "High",
        mode: "Animal urine in floodwater",
        advice: "Wear waterproof boots & gloves, avoid wading barefoot, cover any cuts.",
    },
    {
        id: 6,
        name: "Skin & Wound Infections",
        icon: "🧴",
        relatedTo: ["Earthquake", "Flooding", "Structural Collapse"],
        risk: "Medium",
        mode: "Dirty water, debris, and overcrowded shelters",
        advice: "Dress wounds with clean bandaging, keep skin dry, seek help for redness or pus.",
    },
    {
        id: 7,
        name: "Malaria",
        icon: "🦟",
        relatedTo: ["Flooding", "Storm"],
        risk: "High",
        mode: "Mosquito bites in flooded areas",
        advice: "Sleep under treated nets, apply repellent, clear stagnant pools.",
    },
    {
        id: 8,
        name: "Typhoid Fever",
        icon: "🌡️",
        relatedTo: ["Flooding"],
        risk: "High",
        mode: "Unsafe food & water after floods",
        advice: "Drink only boiled water, eat thoroughly cooked food, keep food covered.",
    },
    {
        id: 9,
        name: "Carbon Monoxide Poisoning",
        icon: "💨",
        relatedTo: ["Fire", "Storm"],
        risk: "Medium",
        mode: "Generators & heaters in closed shelters",
        advice: "Never run generators indoors, keep vents open, watch for dizziness & headaches.",
    },
    {
        id: 10,
        name: "Hypothermia",
        icon: "❄️",
        relatedTo: ["Storm", "Flooding"],
        risk: "Low",
        mode: "Prolonged exposure to cold & wet",
        advice: "Provide dry blankets & warm shelter, keep vulnerable people (children/elderly) warm.",
    },
    {
        id: 11,
        name: "Waterborne Diarrhea",
        icon: "💧",
        relatedTo: ["Flooding", "Storm"],
        risk: "High",
        mode: "Contaminated drinking water",
        advice: "Distribute oral rehydration salts, treat water with chlorine or boiling.",
    },
    {
        id: 12,
        name: "Staph Skin Infections",
        icon: "🩹",
        relatedTo: ["Earthquake", "Structural Collapse"],
        risk: "Medium",
        mode: "Crowded shelters & dirty wounds",
        advice: "Maintain shelter hygiene, disinfect surfaces, isolate infected wounds.",
    }
];

const RescueVolunteersDashboard = () => {
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [demoMode, setDemoMode] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("Bearer");

    useEffect(() => {
        const fetchSites = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/disaster-sites/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setSites(response.data);
            } catch (err) {
                console.warn("Backend rescue API unavailable, showing demo data:", err.message);
                setDemoMode(true);
                setSites(MOCK_DISASTER_SITES);
            } finally {
                setLoading(false);
            }
        };

        fetchSites();
    }, [token]);

    const handleRespond = (id) => {
        const confirmed = window.confirm(
            "Deploy yourself to this disaster place? Your name will be added to the response team."
        );
        if (!confirmed) return;

        setSites(prev =>
            prev.map(site =>
                site.id === id
                    ? { ...site, status: "In Progress", volunteers: site.volunteers + 1 }
                    : site
            )
        );
    };

    const handleResolve = (id) => {
        const confirmed = window.confirm(
            "Mark this disaster place as Rescued / fully responded?"
        );
        if (!confirmed) return;

        setSites(prev =>
            prev.map(site =>
                site.id === id ? { ...site, status: "Rescued" } : site
            )
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading disaster places...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <p className="text-red-500 text-lg mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const activeSites = sites.filter(s => s.status !== "Rescued");
    const rescuedSites = sites.filter(s => s.status === "Rescued");
    const totalAffected = sites.reduce((sum, s) => sum + s.affected, 0);
    const totalVolunteers = sites.reduce((sum, s) => sum + s.volunteers, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-rose-700 px-6 py-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <i className="fa-solid fa-flag"></i> Rescue Volunteers
                        </h2>
                        <p className="text-rose-100 text-sm mt-1">
                            Live disaster places in need of response — deploy to the nearest site
                        </p>
                    </div>
                    <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-xl text-sm font-semibold">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400"></span>
                        </span>
                        {activeSites.length} Active Place{activeSites.length === 1 ? "" : "s"}
                    </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">{activeSites.length}</p>
                                <p className="text-xs text-slate-500 font-semibold">Active Sites</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                                <i className="fa-solid fa-handshake-angle"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">{totalVolunteers}</p>
                                <p className="text-xs text-slate-500 font-semibold">Volunteers Deployed</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">{totalAffected}</p>
                                <p className="text-xs text-slate-500 font-semibold">People Affected</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                                <i className="fa-solid fa-circle-check"></i>
                            </div>
                            <div>
                                <p className="text-2xl font-extrabold text-slate-900">{rescuedSites.length}</p>
                                <p className="text-xs text-slate-500 font-semibold">Places Rescued</p>
                            </div>
                        </div>
                    </div>
                </div>

                {demoMode && (
                    <div className="bg-amber-50 border border-amber-200 px-6 py-3 rounded-2xl text-amber-800 text-sm">
                        <span className="font-semibold">Demo mode:</span> backend not reachable — showing sample disaster data.
                    </div>
                )}

                {/* Disaster Places Table */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider">
                        <div className="col-span-2">Disaster Place</div>
                        <div>Type</div>
                        <div>Severity</div>
                        <div>Affected</div>
                        <div className="text-center">Action</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-100">
                        {sites.length === 0 ? (
                            <div className="px-6 py-12 text-center text-gray-500">
                                <i className="fa-solid fa-map-location-dot text-4xl text-gray-300 mb-3"></i>
                                <p className="text-lg font-medium">No disaster places reported</p>
                                <p className="text-sm mt-1">New disaster reports will appear here</p>
                            </div>
                        ) : (
                            sites.map((site) => {
                                const sev = severityStyles[site.severity] || severityStyles.Low;
                                const statusCls = statusStyles[site.status] || statusStyles["On Hold"];
                                return (
                                    <div key={site.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-slate-50 transition-colors items-center">
                                        <div className="col-span-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl">
                                                    {site.icon}
                                                </div>
                                                <div>
                                                    <p className="text-gray-900 font-semibold">{site.place}</p>
                                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                                        <i className="fa-solid fa-location-dot text-xs"></i>
                                                        {site.location}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                                                <span className={`inline-flex items-center gap-1 border px-2 py-0.5 rounded-full text-[11px] font-bold ${statusCls}`}>
                                                    {site.status}
                                                </span>
                                                <span className="text-[11px] text-gray-400">
                                                    <i className="fa-solid fa-clock mr-1"></i>{site.reported}
                                                </span>
                                                <span className="text-[11px] text-gray-400">
                                                    <i className="fa-solid fa-handshake-angle mr-1"></i>{site.volunteers} deployed
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-gray-700 text-sm flex items-center gap-1.5">
                                            <span>{site.icon}</span> {site.type}
                                        </div>
                                        <div>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${sev.badge}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`}></span>
                                                {site.severity}
                                            </span>
                                        </div>
                                        <div className="text-gray-900 font-bold text-sm">{site.affected}</div>
                                        <div className="flex items-center justify-center gap-2">
                                            {site.status !== "Rescued" ? (
                                                <>
                                                    <button
                                                        onClick={() => handleRespond(site.id)}
                                                        className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                                                        title="Deploy to this disaster place"
                                                    >
                                                        <i className="fa-solid fa-bolt"></i> Respond
                                                    </button>
                                                    <button
                                                        onClick={() => handleResolve(site.id)}
                                                        className="inline-flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
                                                        title="Mark place as rescued"
                                                    >
                                                        <i className="fa-solid fa-circle-check"></i> Rescued
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-xs font-semibold text-green-600 flex items-center gap-1">
                                                    <i className="fa-solid fa-circle-check"></i> Completed
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Disaster Diseases & Health Risks */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <i className="fa-solid fa-disease"></i> Disaster Diseases & Health Risks
                            </h2>
                            <p className="text-emerald-100 text-sm mt-1">
                                Diseases that spread after disasters — know the risks before deploying
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {["High", "Medium", "Low"].map((r) => (
                                <span key={r} className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold ${riskStyles[r].replace("bg-", "bg-white/")}`}>
                                    {r} risk
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                        {MOCK_DISASTER_DISEASES.map((disease) => (
                            <div key={disease.id} className="border border-slate-100 rounded-2xl p-4 hover:border-emerald-200 hover:shadow-sm transition">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-xl flex items-center justify-center">
                                            {disease.icon}
                                        </div>
                                        <div>
                                            <p className="text-gray-900 font-bold text-sm">{disease.name}</p>
                                            <p className="text-xs text-gray-500">{disease.mode}</p>
                                        </div>
                                    </div>
                                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[11px] font-bold flex-shrink-0 ${riskStyles[disease.risk]}`}>
                                        {disease.risk}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                                    {disease.relatedTo.map((rel) => (
                                        <span key={rel} className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                                            <i className="fa-solid fa-triangle-exclamation text-[9px]"></i>
                                            {rel}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                                    <span className="font-bold text-slate-700">Prevention: </span>
                                    {disease.advice}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {sites.length > 0 && (
                    <div className="text-sm text-gray-600 text-center">
                        Showing {sites.length} disaster {sites.length === 1 ? "place" : "places"} — call 123 for emergency coordination
                    </div>
                )}
            </div>
        </div>
    );
};

export default RescueVolunteersDashboard;