import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import signup from "../../assets/Forms/medical-banner-with-stethoscope.jpg";
import { useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();
    const [info, setInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
        let hasError = false;

        if (!info.firstName) {
            newErrors.firstName = "First Name is required";
            hasError = true;
        } else if (info.firstName.length < 3) {
            newErrors.firstName = "First Name must be at least 3 characters";
            hasError = true;
        }

        if (!info.lastName) {
            newErrors.lastName = "Last Name is required";
            hasError = true;
        } else if (info.lastName.length < 3) {
            newErrors.lastName = "Last Name must be at least 3 characters";
            hasError = true;
        }

        if (!info.email) {
            newErrors.email = "Email is required";
            hasError = true;
        } else if (!emailRegex.test(info.email)) {
            newErrors.email = "Email is not valid";
            hasError = true;
        }

        if (!info.password) {
            newErrors.password = "Password is required";
            hasError = true;
        } else if (info.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            hasError = true;
        } else if (!passwordRegex.test(info.password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
            hasError = true;
        }

        if (info.password !== info.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            hasError = true;
        }

        setError(newErrors);

        if (hasError) return;

        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/register/patient/", {
                first_name: info.firstName,
                last_name: info.lastName,
                email: info.email,
                password: info.password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Registration successful:", response.data);
            nav("/login");
        } catch (err) {
            console.error("Registration failed:", err.response?.data || err.message);
            if (err.response?.status === 500) {
                setError(prev => ({ ...prev, email: "Email already exists" }));
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
            <div className="w-full md:w-1/2 ">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <img src={logo} alt="Logo" className="w-20 h-20 mx-auto mb-6" />
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Sign Up</h1>
                    <p className="text-gray-600">Create your account to get started.</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information Section */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                                Personal Information
                            </h2>

                            {/* First Name & Last Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        name="firstname"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="First Name"
                                        value={info.firstName}
                                        onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                                    />
                                    {error.firstName && <p className="text-red-500 text-sm mt-1">{error.firstName}</p>}
                                </div>
                                <div>
                                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                        placeholder="Last Name"
                                        value={info.lastName}
                                        onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                                    />
                                    {error.lastName && <p className="text-red-500 text-sm mt-1">{error.lastName}</p>}
                                </div>
                            </div>

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

                            {/* Passwords */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.password ? "text" : "password"}
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
                                            onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            <i className={`fa-regular ${showPassword.password ? "fa-eye-slash" : "fa-eye"} text-lg`}></i>
                                        </button>
                                    </div>
                                    {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword.confirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            required
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                                            placeholder="Confirm Password"
                                            value={info.confirmPassword}
                                            onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            <i className={`fa-regular ${showPassword.confirmPassword ? "fa-eye-slash" : "fa-eye"} text-lg`}></i>
                                        </button>
                                    </div>
                                    {error.confirmPassword && <p className="text-red-500 text-sm mt-1">{error.confirmPassword}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    {/* Links */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Login</Link>
                        </p>
                    </div>
                    <div className="text-center mt-4 text-xs text-gray-500">
                        <p>
                            By signing up, you agree to our <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link> and{" "}
                            <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>.
                        </p>
                    </div>
                </div>
                </div>
            </div>
            <img src={signup} alt="" className="min-h-screen h-full hidden md:block absolute top-0 -right-10 w-1/2 object-cover -z-1" />

        </div>
    );
};

export default Signup;