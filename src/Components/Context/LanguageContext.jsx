/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { getStoredLang, saveStoredLang } from "../../services/apiService";

const translations = {
    // Navigation
    nav_home: { en: "Home", ar: "الرئيسية" },
    nav_ask: { en: "Ask MedX AI", ar: "اسأل ميدكس AI" },
    nav_doctors: { en: "Doctors", ar: "الأطباء" },
    nav_prescriptions: { en: "Prescriptions", ar: "الوصفات الطبية" },
    nav_pharmacy: { en: "E-Pharmacy", ar: "الصيدلية" },
    nav_labs: { en: "Labs & Radiology", ar: "المعامل والأشعة" },
    nav_explainer: { en: "Report Explainer", ar: "شرح التقارير" },
    nav_dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    nav_signin: { en: "Sign In", ar: "تسجيل الدخول" },
    nav_getStarted: { en: "Get Started", ar: "ابدأ الآن" },
    nav_ai: { en: "AI Assistant", ar: "المساعد الذكي" },
    notif_viewRescue: { en: "View Rescue Center", ar: "عرض مركز الإنقاذ" },

    // Header hero
    hero_badge: { en: "AI Healthcare", ar: "رعاية صحية بالذكاء الاصطناعي" },

    // Dashboard
    dash_overview: { en: "Patient Overview", ar: "نظرة عامة على المريض" },
    dash_doctors: { en: "Doctors Admin", ar: "إدارة الأطباء" },
    dash_pharmacies: { en: "Pharmacies Admin", ar: "إدارة الصيدليات" },
    dash_labs: { en: "Laboratories Admin", ar: "إدارة المعامل" },
    dash_radiology: { en: "Radiology Admin", ar: "إدارة الأشعة" },
    dash_reservations: { en: "Reservations Log", ar: "سجل الحجوزات" },
    dash_rescue: { en: "Rescue Volunteers", ar: "متطوعو الإنقاذ" },
    dash_backHome: { en: "Back to MedX Home", ar: "العودة للرئيسية" },

    // Profile
    profile_dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
    profile_watch: { en: "Smart Watch", ar: "الساعة الذكية" },
    profile_prescriptions: { en: "Prescriptions", ar: "الوصفات الطبية" },
    profile_ask: { en: "Ask MedX AI", ar: "اسأل ميدكس AI" },
    profile_doctor: { en: "Find a Doctor", ar: "ابحث عن طبيب" },

    // Smart Watch
    watch_title: { en: "Smart Watch Connection", ar: "الاتصال بالساعة الذكية" },
    watch_status_connected: { en: "Connected — live readings streaming", ar: "متصل — قراءات حية" },
    watch_status_disconnected: { en: "Connect your smart watch to stream your health readings, diagnoses, and tracked diseases", ar: "اربط ساعتك الذكية لعرض قراءاتك الصحية والتشخيصات والأمراض" },
    watch_connect: { en: "Connect Your Smart Watch", ar: "ربط ساعتك الذكية" },
    watch_readings: { en: "Your Readings", ar: "قراءاتك" },
    watch_danger: { en: "Danger & SOS — Rescue Link", ar: "الخطر والاستغاثة — ربط الإنقاذ" },

    // Rescue
    rescue_title: { en: "Rescue Volunteers", ar: "متطوعو الإنقاذ" },
    rescue_subtitle: { en: "Live disaster places in need of response — deploy to the nearest site", ar: "مواقع الكوارث النشطة — توجه لأقرب موقع" },
    rescue_diseases: { en: "Disaster Diseases & Health Risks", ar: "أمراض ومخاطر الكوارث الصحية" },
    rescue_volunteer_signup: { en: "Become a Rescue Volunteer", ar: "انضم كمتطوع إنقاذ" },
    rescue_shifts: { en: "Rescue Shifts", ar: "ورديات الإنقاذ" },
    rescue_map: { en: "Live Rescue Map", ar: "خريطة الإنقاذ الحية" }
};

const LanguageContext = createContext({ lang: "en", t: (k) => k, toggleLang: () => {} });

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState(getStoredLang());

    useEffect(() => {
        saveStoredLang(lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }, [lang]);

    const t = (key) => {
        const entry = translations[key];
        if (!entry) return key;
        return entry[lang] || entry.en;
    };

    const toggleLang = () => setLang((prev) => (prev === "en" ? "ar" : "en"));

    return (
        <LanguageContext.Provider value={{ lang, t, toggleLang }}>
            {children}
        </LanguageContext.Provider>
    );
};