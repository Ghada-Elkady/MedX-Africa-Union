import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Footer = () => {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
                    
                    {/* Brand Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="MedX Logo" className="w-10 h-10 object-contain brightness-125" />
                            <span className="font-black text-2xl text-white tracking-tight">Med<span className="text-[#19A7CE]">X</span></span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Your First Safe Medical Touchpoint. Combining AI-powered health guidance, verified medical specialists, digital prescriptions, and integrated pharmacy and laboratory networks.
                        </p>
                        <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800/80 max-w-sm">
                            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                                <i className="fa-solid fa-triangle-exclamation"></i>
                                <span>Emergency Medical Notice</span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-normal">
                                MedX AI is an educational guidance assistant. For severe symptoms, chest pain, or trauma, call 123 / Emergency services immediately.
                            </p>
                        </div>
                    </div>
 
                    {/* Medical Platform */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">MedX Ecosystem</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/ask" className="hover:text-[#19A7CE] transition-colors flex items-center gap-1.5"><i className="fa-solid fa-wand-magic-sparkles text-[#19A7CE] text-xs"></i> Ask MedX AI</Link></li>
                            <li><Link to="/doctors" className="hover:text-[#19A7CE] transition-colors">Find a Doctor</Link></li>
                            <li><Link to="/prescriptions" className="hover:text-[#19A7CE] transition-colors">Digital Prescriptions</Link></li>
                            <li><Link to="/services/search/pharmacies" className="hover:text-[#19A7CE] transition-colors">E-Pharmacy</Link></li>
                            <li><Link to="/services/search/Laboratories" className="hover:text-[#19A7CE] transition-colors">Diagnostic Labs</Link></li>
                            <li><Link to="/services/search/radiologies" className="hover:text-[#19A7CE] transition-colors">Radiology Centers</Link></li>
                        </ul>
                    </div>
 
                    {/* Smart Patient Tools */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">Patient Tools</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link to="/report-explainer" className="hover:text-[#19A7CE] transition-colors">Medical Report Explainer</Link></li>
                            <li><Link to="/dashboard" className="hover:text-[#19A7CE] transition-colors">Patient Dashboard</Link></li>
                            <li><Link to="/contact" className="hover:text-[#19A7CE] transition-colors">Contact Support</Link></li>
                            <li><Link to="/about" className="hover:text-[#19A7CE] transition-colors">About MedX</Link></li>
                        </ul>
                    </div>
 
                    {/* Trust & Safety */}
                    <div>
                        <h3 className="text-white font-bold text-base mb-4">Trust & Compliance</h3>
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-center gap-2 text-xs text-slate-400"><i className="fa-solid fa-shield-halved text-emerald-400"></i> HIPAA Standard Alignment</li>
                            <li className="flex items-center gap-2 text-xs text-slate-400"><i className="fa-solid fa-lock text-cyan-400"></i> 256-bit Encrypted Platform</li>
                            <li className="flex items-center gap-2 text-xs text-slate-400"><i className="fa-solid fa-user-check text-blue-400"></i> Licensed Doctors Only</li>
                            <li className="flex items-center gap-2 text-xs text-slate-400"><i className="fa-solid fa-heart-pulse text-rose-400"></i> Huawei AI Innovation</li>
                        </ul>
                    </div>
                </div>
 
                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} MedX Health Platform. All rights reserved. Designed for Huawei AI Healthcare Innovation.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
                        <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
                        <span className="hover:text-slate-400 transition-colors">Medical Disclaimer</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
