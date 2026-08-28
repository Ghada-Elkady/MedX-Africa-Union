import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import login from "../../assets/Forms/medical-banner-with-stethoscope.jpg";
import { useContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Loading from "../../Components/Loading/Loading";
import { User } from "../../Components/Context/Context";

const Login = () => {
    const user = useContext(User);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const cookie = new Cookies();
    const [info, setInfo] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        login: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({ email: "", password: "", login: "" });

        let hasError = false;
        if (!info.email) {
            setError((prev) => ({ ...prev, email: "Email is required" }));
            hasError = true;
        } else if (!emailRegex.test(info.email)) {
            setError((prev) => ({ ...prev, email: "Email is not valid" }));
            hasError = true;
        }
        if (!info.password) {
            setError((prev) => ({ ...prev, password: "Password is required" }));
            hasError = true;
        } else if (info.password.length < 8) {
            setError((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
            hasError = true;
        }

        if (hasError) return;

        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
                username:info.email.split("@")[0],
                password: info.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            console.log("Login successful:", response.data);
            user.setAuth({ accessToken: response.data.access, refreshToken: response.data.refresh, user: { email: response.data.email, id: response.data.id, role: response.data.role, username: response.data.profile.username, profile_picture: response.data.profile.profile_picture } });
            cookie.set("Bearer", response.data.access);
            cookie.set("refresh", response.data.refresh);
            cookie.set("user", JSON.stringify({ email: response.data.email, id: response.data.id, role: response.data.role , username: response.data.profile.username , profile_picture: response.data.profile.profile_picture}));
            nav("/");
        } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
            if (err.response?.status === 401) {
                setError((prev) => ({ ...prev, login: "Email or password is not correct" }));
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 relative z-0">
            <div className="w-full md:w-1/2">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Log In</h1>
                    <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Login Credentials Section */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                                Login Credentials
                            </h2>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    placeholder="Email"
                                    value={info.email}
                                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                                />
                                {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                                        placeholder="Password"
                                        value={info.password}
                                        onChange={(e) => setInfo({ ...info, password: e.target.value })}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        <i className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"} text-lg`}></i>
                                    </button>
                                </div>
                                {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                                {error.login && <p className="text-red-500 text-sm mt-1">{error.login}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            <img src={login} alt="" className="min-h-screen h-full hidden md:block absolute top-0 -right-10 w-1/2 object-cover -z-1" />

        </div>
    );
};

export default Login;
