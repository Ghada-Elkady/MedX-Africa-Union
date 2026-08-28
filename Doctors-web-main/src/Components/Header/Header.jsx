import './Header.css'
import { Link} from "react-router-dom";
import Button from "../Buttons/Button";
import logo from '../../assets/logo.png';
import { useContext, useEffect, useRef, useState } from 'react';
import { User } from '../Context/Context';
import UserSetting from './Setting';

const Header = () => {
    // User context
    const userContext = useContext(User);
    // Menu state
    const [openMenu, setOpenMenu] = useState(false);
    // Active Link
    const [active, setActive] = useState(window.location.pathname === '/' ? 'home' : window.location.pathname.slice(1));
    const navLinks = [
        { to: "/", label: "Home", id: "home" },
        {
            to: "/about", label: "About", id: "about"
        },
        {
            to: "/services", label: "Services", id: "services", sections: [
                { value: "الأشعة", en: "Radiologies" },
                { value: "المعامل", en: "Laboratories" },
                { value: "صيدلية", en: "Pharmacies" }
            ]
        },
        {
            to: "/doctors", label: "Doctors", id: "doctors", sections: [
                { value: "قلب", en: "Cardiology Physician" },
                { value: "مخ واعصاب", en: "Neurology Physician" },
                { value: "عظام", en: "Orthopedics Physician" },
                { value: "اطفال", en: "Pediatrics Physician" },
                { value: "جلدية", en: "Dermatology Physician" },
                { value: "نساء وتوليد", en: "Gynecology Physician" },
                { value: "نفسي", en: "Psychiatry Physician" },
                { value: "عيون", en: "Ophthalmology Physician" }
            ]
        },
        // { to: "/appointments", label: "Appointments", id: "appointments" },
        { to: "/contact", label: "Contact Us", id: "contact" },
    ];

    // Header scroll effect
    const headerRef = useRef(null);
    useEffect(() => {
        const header = headerRef.current;
        let current = 0;
        const handleScroll = () => {
            if (window.scrollY == 0 || current == 0) {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
                header.style.transform = 'translateY(0)';
                header.classList.remove('backdrop-blur-md');
                current = window.scrollY;
            } else {
                if (window.scrollY > current) {
                    header.style.backgroundColor = 'rgb(238 238 238 / 64 %)';
                    header.style.boxShadow = '0 5px 10px #00000078';
                    header.style.transform = 'translateY(0)';
                    header.classList.add('backdrop-blur-md');
                    current = window.scrollY;
                } else if (window.scrollY < current) {
                    header.style.backgroundColor = 'rgb(238 238 238 / 64 %)';
                    header.style.backgroundColor = 'transparent';
                    header.style.boxShadow = '0 5px 10px #00000078';
                    header.style.transform = 'translateY(-150%)';
                    current = window.scrollY;
                } else {
                    header.style.backgroundColor = 'transparent';
                    header.style.boxShadow = '0 5px 10px #00000078';
                    header.style.transform = 'translateY(0)';
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <header id="header" ref={headerRef} className="py-4 px-8 mx-4 md:mx-8 lg:mx-12 top-0 rounded-4xl my-4 fixed z-40 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] lg:w-[calc(100%-6rem)] transition-all duration-500 ease-in-out">
            <div className="container mx-auto">
                {/* Mobile header */}
                <nav className="lg:hidden flex items-center justify-between">
                    <div className="menu-bar">
                        <i className="fas fa-bars text-3xl cursor-pointer" onClick={() => setOpenMenu(!openMenu)}></i>
                        </div>
                    <Link to="/" className="logo">
                        <img src={logo} alt="Logo" className="w-[50px] min-w-10" />
                    </Link>
                    {userContext.auth.accessToken && <UserSetting />}
                </nav>
                {/* Desktop & Mobile Menu */}
                <nav className={`nav overflow-y-scroll lg:overflow-y-visible py-20 px-8 flex-col -m-4 md:-mx-8 lg:m-0 bg-blue-100 lg:bg-transparent absolute top-0 right-0 h-screen w-md max-w-full rounded-0 space-y-15 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4 lg:relative lg:top-0 lg:right-0 lg:p-0 lg:h-auto lg:w-auto ${openMenu ? 'flex' : 'hidden'} lg:flex`}>
                    <div className="list-options flex items-center justify-between mb-10 lg:mb-0 lg:justify-start">
                        <Link to="/">
                            <img src={logo} alt="Logo" className="w-[50px] min-w-10" />
                        </Link>
                        <div className="close-bar lg:hidden">
                            <i className="fas fa-times text-3xl cursor-pointer" onClick={() => setOpenMenu(!openMenu)}></i>
                        </div>
                    </div>
                    <ul className="nav-links space-y-6 text-lg font-semibold flex flex-col items-start  lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-6 lg:px-0">
                        {(navLinks).map((link) => (
                            <li key={link.id} className={`${link.sections && "have-submenu"} w-full`}>
                                {/* If link has sections*/}
                                <Link to={link.to}
                                    id={link.id}
                                    onClick={() => { setActive(link.id); setOpenMenu(false); }}
                                    className={`${active === link.id ? 'active' : ''} hover:text-blue-300 relative transition-all duration-500 ease-in-out flex items-center rounded-2xl px-4 py-2 lg:px-0 lg:py-0 hover:bg-blue-200 lg:hover:bg-transparent text-nowrap`}>{link.label}{!link.sections ? '' : <i className="fas fa-chevron-down ml-2 text-sm"></i>}</Link>


                                {/* Map sections if link has sections*/}
                                {link.sections && <ul className={"sub-menu mt-2 ml-4 border-l-4 border-blue-300 p-4 lg:absolute bg-white rounded-lg shadow-lg lg:opacity-0 lg:invisible lg:translate-y-20 duration-300 ease-in-out "}>
                                    {link.sections.map((section) => (
                                        <li key={section.en} className="">
                                            <Link to={`${link.to}/search/${section.en}`}
                                                onClick={() => { setActive(link.id); setOpenMenu(false); }}
                                                className="text-sm hover:text-gray-500  transition-all duration-500 ease-in-out block rounded-2xl p-3 lg:px-5 hover:bg-blue-200 lg:hover:bg-transparent">{section.en}</Link>
                                        </li>
                                    ))}
                                </ul>}
                            </li>
                        ))}
                    </ul>

                    {/* Buttons for login and signup */}
                    {userContext.auth.accessToken ?
                        <div className="hidden lg:block">
                            <UserSetting/>
                        </div>
                        :
                        <div className="buttons flex space-y-4 text-lg font-semibold flex-col px-2 lg:flex-row lg:items-center lg:justify-between lg:mt-0 lg:px-0 lg:space-y-0 lg:space-x-2">
                            <Link to="/signup" className="w-full"><Button text="Sign Up" buttonStyle="emp-button" /></Link>
                            <Link to="/login" className="w-full"><Button text="Login" buttonStyle="neu-button w-full" /></Link>
                        </div>
                    }
                </nav>
            </div>
        </header>
    )
}
export default Header;
