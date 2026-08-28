import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../Context/Context";
import avatar from "../../assets/Home/avatar.png"

const UserSetting = () => {
    const cookie = new Cookies();
    const userContext = useContext(User);
    const nav = useNavigate();
    const [openDropdown, setOpenDropdown] = useState(false);
    
    // Handle Logout
    function HandleLogout() {
        console.log(userContext)
            userContext.setAuth({ accessToken: null, refreshToken: null });
            cookie.remove("Bearer", { path: '/' });
            cookie.remove("refresh", { path: '/' });
            cookie.remove("user", { path: '/' });
            nav("/login");
        };
    return (
        <div className="user-setting relative">
            <button className="user-info flex items-center gap-2 cursor-pointer" onClick={() => setOpenDropdown(!openDropdown)}>
                    <img src={userContext.auth.user.profile_picture || avatar} alt="User Avatar" className="rounded-full w-12 h-12 oblect-cover border-2 border-white" />
                <div className="user-details hidden  md:flex items-center gap-2">
                    <h3 className="text-md font-semibold">{userContext.auth.user.username}</h3>
                    <i className="fas fa-angle-down"></i>
                </div>
            </button>
            <ul className={`dropdown-menu ${openDropdown ? 'block' : 'hidden'} w-[300px] bg-white py-5 rounded-2xl shadow-lg absolute top-14 right-0 z-10`}>
                <div className="info p-4 text-center border-b border-gray-300">
                    <img src={userContext.auth.user.profile_picture || avatar} alt="User Avatar" className="rounded-full w-12 h-12 oblect-cover border-2 border-white mx-auto mb-4" />
                    <h3 className="text-md font-semibold">{userContext.auth.user.username}</h3>
                    <p className="text-sm">{userContext.auth.user.email}</p>
                </div>
                <li><Link to="/profile" className="block px-5 py-3 border-b border-gray-300 hover:text-gray-100 hover:bg-black duration-300">Profile</Link></li>
                <li><Link to="/dashboard" className="block px-5 py-3 border-b border-gray-300 hover:text-gray-100 hover:bg-black duration-300">Dashboard</Link></li>
                <li><button onClick={HandleLogout} className="block cursor-pointer w-full text-start px-5 py-3 hover:text-gray-100 hover:bg-black duration-300">Logout</button></li>
            </ul>
        </div>
    )
}

export default UserSetting;