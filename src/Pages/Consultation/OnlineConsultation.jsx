import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MOCK_DOCTORS, STORAGE_KEYS, getStoredProfile } from "../../services/apiService";

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const OnlineConsultation = () => {
  const [stage, setStage] = useState("list"); // 'list' | 'call'
  const [doctor, setDoctor] = useState(null);
  const [callType, setCallType] = useState("video"); // 'video' | 'voice'
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCamOff, setIsCamOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatDraft, setChatDraft] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [leftCall, setLeftCall] = useState(false);
  const timerRef = useRef(null);

  const onlineDoctors = MOCK_DOCTORS.filter((d) =>
    (d.consultation_types || []).includes("Online Consultation")
  );
  const profile = getStoredProfile();
  const patientName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") || "Patient";

  const startCall = (doc, type) => {
    setDoctor(doc);
    setCallType(type);
    setLeftCall(false);
    setMessages([]);
    setSeconds(0);
    setIsMuted(false);
    setIsCamOff(false);
    setStage("call");
    setIsConnecting(true);
    const connectDelay = setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `doc-${Date.now()}`,
          from: "doctor",
          text: `Welcome to your online consultation. I'm ${doc.name}, how can I help you today?`,
        },
      ]);
    }, 2500);
    timerRef.current = setTimeout(() => {
      clearTimeout(connectDelay);
    }, 3000);
  };

  useEffect(() => {
    if (stage !== "call") return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [stage, isConnected]);

  useEffect(() => {
    if (!isConnected || leftCall) return;
    const reply = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `doc-${Date.now()}`,
          from: "doctor",
          text:
            "I can see your shared health summary on my side. Please describe your symptoms and how long you've had them.",
        },
      ]);
    }, 12000);
    return () => clearTimeout(reply);
  }, [isConnected, leftCall]);

  const endCall = () => {
    setIsConnected(false);
    setLeftCall(true);
    setIsConnecting(false);
    setStage("list");
    if (doctor) {
      try {
        const current = readJSON(STORAGE_KEYS.CONSULTATIONS, []);
        const entry = {
          id: `C-${Date.now()}`,
          doctor: doctor.name,
          specialty: doctor.specialty,
          type: callType,
          date: new Date().toISOString(),
          durationSec: seconds,
          status: "Completed",
        };
        localStorage.setItem(STORAGE_KEYS.CONSULTATIONS, JSON.stringify([entry, ...current].slice(0, 10)));
      } catch {
        /* no-op */
      }
    }
  };

  const sendMessage = () => {
    if (!chatDraft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: `me-${Date.now()}`, from: "me", text: chatDraft.trim() },
    ]);
    setChatDraft("");
  };

  const formatTimer = (sec) =>
    `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  if (stage === "call" && doctor) {
    return (
      <div className="min-h-screen bg-slate-950 text-white pt-20">
        {/* Call top bar */}
        <div className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/online-consultation" onClick={endCall} className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center" title="Leave call">
              <i className="fa-solid fa-chevron-left text-xs"></i>
            </Link>
            <div>
              <p className="font-bold text-sm">{doctor.name}</p>
              <p className="text-[11px] text-[#19A7CE] font-semibold">{doctor.specialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className={`px-3 py-1.5 rounded-full font-bold ${isConnected ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400 animate-pulse"}`}>
              <i className={`fa-solid ${isConnected ? "fa-circle-check" : "fa-circle-notch fa-spin"} mr-1.5`}></i>
              {isConnected ? "Connected" : "Connecting…"}
            </span>
            <span className="font-mono text-cyan-300 font-bold"><i className="fa-solid fa-clock mr-1 text-slate-500"></i>{formatTimer(seconds)}</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 py-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main video stage */}
          <div className="lg:col-span-2 relative aspect-video bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            {/* Encrypted overlay */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide text-emerald-400">
              <i className="fa-solid fa-lock"></i> END-TO-END ENCRYPTED
            </div>

            {isConnecting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 gap-4">
                <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover border-4 border-[#19A7CE] animate-pulse" />
                <p className="font-bold text-sm">Connecting securely to {doctor.name}…</p>
                <p className="text-[11px] text-slate-400">Establishing an encrypted WebRTC session</p>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950">
                {callType === "voice" || isCamOff ? (
                  <div className="text-center space-y-3">
                    <div className="relative mx-auto w-32 h-32">
                      <img src={doctor.image} alt={doctor.name} className="w-32 h-32 rounded-full object-cover border-4 border-[#19A7CE]" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-950"></span>
                    </div>
                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                      {callType === "voice" ? <i className="fa-solid fa-phone-volume"></i> : <i className="fa-solid fa-video-slash"></i>}
                      Voice consultation in progress
                    </p>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <div>
                        <p className="font-bold text-lg drop-shadow">{doctor.name}</p>
                        <p className="text-xs text-[#19A7CE] font-bold">{doctor.specialty}</p>
                      </div>
                      <span className="bg-emerald-500 rounded-full px-3 py-1 text-[10px] font-bold flex items-center gap-1.5">
                        <i className="fa-solid fa-circle animate-pulse"></i> LIVE
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Self view */}
            {!isCamOff && (
              <div className="absolute bottom-4 right-4 z-10 w-36 sm:w-44 aspect-video rounded-2xl border-2 border-slate-600 shadow-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
                <div className="text-center text-[10px] text-slate-400">
                  <i className="fa-solid fa-user text-3xl text-slate-600 mb-1"></i>
                  <p className="font-bold">{patientName}</p>
                  <p>You</p>
                </div>
                <span className="absolute top-1.5 left-1.5 bg-black/50 text-[9px] font-bold px-2 py-0.5 rounded text-emerald-400">YOU</span>
              </div>
            )}

            {/* Call controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-black/50 backdrop-blur px-5 py-3 rounded-2xl border border-white/10">
              <button
                onClick={() => setIsMuted((m) => !m)}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm transition ${isMuted ? "bg-red-600 text-white" : "bg-white/15 hover:bg-white/25 text-white"}`}
                title={isMuted ? "Unmute" : "Mute microphone"}
              >
                <i className={`fa-solid ${isMuted ? "fa-microphone-slash" : "fa-microphone"}`}></i>
              </button>
              {callType === "video" && (
                <button
                  onClick={() => setIsCamOff((c) => !c)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center text-sm transition ${isCamOff ? "bg-red-600 text-white" : "bg-white/15 hover:bg-white/25 text-white"}`}
                  title={isCamOff ? "Turn camera on" : "Turn off camera"}
                >
                  <i className={`fa-solid ${isCamOff ? "fa-video-slash" : "fa-video"}`}></i>
                </button>
              )}
              <button
                onClick={() => setIsChatOpen((c) => !c)}
                className={`w-11 h-11 rounded-full flex items-center justify-center text-sm transition ${isChatOpen ? "bg-[#19A7CE] text-white" : "bg-white/15 hover:bg-white/25 text-white"}`}
                title="Chat"
              >
                <i className="fa-regular fa-message"></i>
              </button>
              <button
                onClick={endCall}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white"
                title="End call"
              >
                <i className="fa-solid fa-phone"></i>
              </button>
            </div>
          </div>

          {/* Chat panel */}
          <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 transition ${isChatOpen ? "block" : "hidden lg:block"}`}>
            <h3 className="font-bold text-sm text-cyan-300 flex items-center gap-2">
              <i className="fa-regular fa-message"></i> Consultation Chat
            </h3>
            <div className="h-72 space-y-3 overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-500 text-center pt-16">
                  <i className="fa-regular fa-comment-dots text-3xl mb-2 block text-slate-700"></i>
                  Messages with your doctor appear here
                </p>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${m.from === "me" ? "bg-[#19A7CE] text-white rounded-br-md" : "bg-slate-800 text-slate-200 rounded-bl-md"}`}>
                      {m.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2 pt-3 border-t border-slate-800">
              <input
                value={chatDraft}
                onChange={(e) => setChatDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message…"
                className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#19A7CE]"
              />
              <button onClick={sendMessage} className="px-4 bg-[#19A7CE] hover:bg-[#148AA1] rounded-xl text-white font-bold text-xs transition">
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Listing / booking stage ─────────────────────────────────── */
  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto max-w-7xl px-4 space-y-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-[#19A7CE]/20 rounded-full blur-3xl"></div>
          <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-2">
            <i className="fa-solid fa-video"></i> Telemedicine
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Online Consultation</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Connect with a certified specialist over a secure video or voice call — no waiting rooms, and your vitals are shared instantly to help your doctor.
          </p>
          <div className="flex flex-wrap gap-3 text-xs pt-1">
            <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl"><i className="fa-solid fa-lock mr-1.5 text-emerald-400"></i>Encrypted video call</span>
            <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl"><i className="fa-solid fa-bolt mr-1.5 text-amber-400"></i>Connect in seconds</span>
            <span className="bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl"><i className="fa-solid fa-prescription mr-1.5 text-cyan-400"></i>Digital prescriptions</span>
          </div>
        </div>

        {/* Doctors grid */}
        <div>
          <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center gap-2">
            <i className="fa-solid fa-user-doctor text-[#19A7CE]"></i> Doctors available for online consultation
            <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse mr-1.5"></span>
              {onlineDoctors.length} online now
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {onlineDoctors.map((doc) => (
              <div key={doc.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
                <div className="p-5 flex items-center gap-4 border-b border-slate-100">
                  <div className="relative">
                    <img src={doc.image} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100" />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-sm truncate">{doc.name}</h3>
                    <p className="text-[11px] text-[#19A7CE] font-bold">{doc.specialty}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{doc.experience} yrs · {doc.languages.length} languages</p>
                  </div>
                </div>

                <div className="px-5 py-4 space-y-3 flex-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-amber-500 font-bold">
                      <i className="fa-solid fa-star mr-1"></i>{doc.rating}
                      <span className="text-slate-400 font-semibold"> ({doc.reviews_count} reviews)</span>
                    </span>
                    <span className="font-bold text-slate-900">{doc.fee} <span className="text-[10px] text-slate-400">{doc.currency}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-2 py-0.5 rounded-full">
                      <i className="fa-solid fa-circle text-[6px] mr-1"></i>AVAILABLE NOW
                    </span>
                    <span className="bg-cyan-50 text-cyan-700 border border-cyan-200 font-bold px-2 py-0.5 rounded-full">
                      <i className="fa-solid fa-shield-halved mr-1"></i>VERIFIED
                    </span>
                  </div>
                </div>

                <div className="px-5 pb-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => startCall(doc, "video")}
                    className="px-3 py-2.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-video"></i> Video Call
                  </button>
                  <button
                    onClick={() => startCall(doc, "voice")}
                    className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <i className="fa-solid fa-phone-volume"></i> Voice Call
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
          <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center gap-2">
            <i className="fa-solid fa-circle-question text-[#19A7CE]"></i> How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            {[
              { icon: "fa-user-doctor", title: "1. Pick your doctor", text: "Choose a verified specialist online right now — rates and reviews shown upfront." },
              { icon: "fa-video", title: "2. Start the call", text: "Instant encrypted video or voice session. Your vitals & health summary are shared on screen." },
              { icon: "fa-file-prescription", title: "3. Get your prescription", text: "Doctor writes your diagnosis and medications digitally, saved to your MedX record." },
            ].map((s) => (
              <div key={s.title} className="flex gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#19A7CE]/10 text-[#19A7CE] flex items-center justify-center text-lg flex-shrink-0">
                  <i className={`fa-solid ${s.icon}`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{s.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineConsultation;