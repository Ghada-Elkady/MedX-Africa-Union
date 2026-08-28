import './Header.css';
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../Context/Context';
import UserSetting from './Setting';

const Header = () => {
    const userContext = useContext(User);
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(false);
    const headerRef = useRef(null);

    const navLinks = [
        { to: "/", label: "Home", id: "home" },
        { to: "/ask", label: "Ask MedX AI", id: "ask", isAi: true },
        { to: "/doctors", label: "Doctors", id: "doctors" },
        { to: "/prescriptions", label: "Prescriptions", id: "prescriptions" },
        { to: "/services/search/pharmacies", label: "E-Pharmacy", id: "pharmacies" },
        {
            to: "/services", label: "Labs & Radiology", id: "services", sections: [
                { value: "Laboratories", en: "Laboratories", to: "/services/search/Laboratories" },
                { value: "Radiology", en: "Radiologies", to: "/services/search/radiologies" }
            ]
        },
        { to: "/report-explainer", label: "Report Explainer", id: "report-explainer" },
        { to: "/dashboard", label: "Dashboard", id: "dashboard" }
    ];

    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;

        const handleScroll = () => {
            if (window.scrollY > 20) {
                header.classList.add('bg-white/90', 'shadow-md', 'backdrop-blur-md');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.add('bg-transparent');
                header.classList.remove('bg-white/90', 'shadow-md', 'backdrop-blur-md');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header id="header" ref={headerRef} className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-8 transition-all duration-300">
            <div className="container mx-auto max-w-7xl">
                {/* Mobile Header Bar */}
                <nav className="lg:hidden flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setOpenMenu(!openMenu)}
                            className="p-2 text-slate-700 hover:text-[#19A7CE] focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <i className={`fas ${openMenu ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
                        </button>
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="MedX Logo" className="w-9 h-9 object-contain" />
                            <span className="font-extrabold text-xl text-slate-900 tracking-tight">Med<span className="text-[#19A7CE]">X</span></span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link to="/ask" className="bg-[#19A7CE]/10 text-[#19A7CE] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#19A7CE]/20 transition-colors">
                            <i className="fa-solid fa-wand-magic-sparkles"></i>
                            <span>AI Assistant</span>
                        </Link>
                        {userContext?.auth?.accessToken && <UserSetting />}
                    </div>
                </nav>

                {/* Desktop & Mobile Slide-Out Menu */}
                <nav className={`lg:flex items-center justify-between ${openMenu ? 'flex flex-col fixed inset-0 bg-white z-50 p-6 overflow-y-auto' : 'hidden lg:flex'}`}>
                    {/* Header Left: Logo */}
                    <div className="flex items-center justify-between w-full lg:w-auto mb-6 lg:mb-0">
                        <Link to="/" onClick={() => setOpenMenu(false)} className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
                            <img src={logo} alt="MedX Logo" className="w-10 h-10 object-contain" />
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <span className="font-black text-2xl text-slate-900 tracking-tight">Med<span className="text-[#19A7CE]">X</span></span>
                                    <span className="bg-[#19A7CE]/10 text-[#19A7CE] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">AI Healthcare</span>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium hidden lg:block">Your First Safe Medical Touchpoint</p>
                            </div>
                        </Link>
                        <button 
                            onClick={() => setOpenMenu(false)}
                            className="lg:hidden p-2 text-slate-500 hover:text-slate-800"
                        >
                            <i className="fas fa-times text-2xl"></i>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-1 w-full lg:w-auto">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
                            
                            return (
                                <li key={link.id} className="relative w-full lg:w-auto group">
                                    <Link
                                        to={link.to}
                                        onClick={() => setOpenMenu(false)}
                                        className={`flex items-center justify-between lg:justify-start gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                            isActive 
                                                ? 'bg-[#19A7CE]/10 text-[#19A7CE]' 
                                                : link.isAi 
                                                    ? 'text-[#19A7CE] hover:bg-[#19A7CE]/10' 
                                                    : 'text-slate-700 hover:text-[#19A7CE] hover:bg-slate-100/80'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {link.isAi && <i className="fa-solid fa-[#19A7CE] fa-wand-magic-sparkles"></i>}
                                            <span>{link.label}</span>
                                        </div>
                                        {link.sections && <i className="fas fa-chevron-down text-xs text-slate-400 group-hover:rotate-180 transition-transform"></i>}
                                    </Link>

                                    {/* Dropdown for Subsections */}
                                    {link.sections && (
                                        <div className="hidden group-hover:block lg:absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50">
                                            {link.sections.map((sec) => (
                                                <Link
                                                    key={sec.en}
                                                    to={sec.to}
                                                    onClick={() => setOpenMenu(false)}
                                                    className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-[#19A7CE]/10 hover:text-[#19A7CE] transition-colors"
                                                >
                                                    {sec.value}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Auth & Quick CTAs */}
                    <div className="flex items-center gap-3 mt-6 lg:mt-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                        {userContext?.auth?.accessToken ? (
                            <UserSetting />
                        ) : (
                            <div className="flex items-center gap-2.5 w-full lg:w-auto">
                                <Link to="/login" onClick={() => setOpenMenu(false)} className="w-full lg:w-auto">
                                    <button className="w-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-[#19A7CE] hover:bg-slate-100 rounded-xl transition-all">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/signup" onClick={() => setOpenMenu(false)} className="w-full lg:w-auto">
                                    <button className="w-full px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#19A7CE] to-[#148AA1] hover:shadow-md hover:shadow-[#19A7CE]/20 rounded-xl transition-all">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
