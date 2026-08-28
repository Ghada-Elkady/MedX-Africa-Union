import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

// Mock data for demonstration
const mockSpecializations = [
  { id: 1, name: "Cardiology" },
  { id: 2, name: "Neurology" },
  { id: 3, name: "Pediatrics" },
  { id: 4, name: "Orthopedics" },
  { id: 5, name: "Dermatology" }
];

const AddDoctor = () => {
  const cookie = new Cookies()
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [specializations, setSpecializations] = useState(mockSpecializations);

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fee: "",
    description: "",
    image: "",
    licenseNumber: ""
  });

  const [availabilities, setAvailabilities] = useState([
    { day: "Saturday", start_time: "09:00", end_time: "17:00", is_active: true }
  ]);

  const daysOfWeek = [
    { value: 0, label: "Monday" },
    { value: 1, label: "Tuesday" },
    { value: 2, label: "Wednesday" },
    { value: 3, label: "Thursday" },
    { value: 4, label: "Friday" },
    { value: 5, label: "Saturday" },
    { value: 6, label: "Sunday" }
  ];

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!info.firstName.trim()) newErrors.firstName = "First Name is required";
    else if (info.firstName.trim().length < 3) newErrors.firstName = "First Name must be at least 3 characters";

    if (!info.lastName.trim()) newErrors.lastName = "Last Name is required";
    else if (info.lastName.trim().length < 3) newErrors.lastName = "Last Name must be at least 3 characters";
    
    if (!info.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(info.email)) newErrors.email = "Email is not valid";
    
    if (!info.phone.trim()) newErrors.phone = "Phone number is required";
    else if (info.phone.length < 11) newErrors.phone = "Phone number must be at least 11 digits";
    
    if (!info.address.trim()) newErrors.address = "Address is required";
    
    if (!info.specialization) newErrors.specialization = "Specialization is required";
    
    if (!info.experience) newErrors.experience = "Experience is required";
    else if (parseInt(info.experience) < 0) newErrors.experience = "Experience cannot be negative";
    
    if (!info.fee) newErrors.fee = "Consultation fee is required";
    else if (parseFloat(info.fee) <= 0) newErrors.fee = "Fee must be greater than 0";
    
    if (!info.licenseNumber.trim()) newErrors.licenseNumber = "License number is required";

    if (!info.password) newErrors.password = "Password is required";
    else if (info.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!passwordRegex.test(info.password)) newErrors.password = "Password must contain uppercase, lowercase, number, and special character";
    
    if (!info.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (info.password !== info.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    
    if (availabilities.length === 0) newErrors.availabilities = "At least one working hour slot is required";
    else {
      availabilities.forEach((slot, index) => {
        if (slot.start_time >= slot.end_time) {
          newErrors[`availability_${index}`] = "End time must be after start time";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = cookie.get("Bearer");
    
    
    if (!validateForm()) {
      const firstErrorElement = document.querySelector('.border-red-500');
      if (firstErrorElement) firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      console.error("Please fix the errors before submitting.");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/doctors/", {
        first_name: info.firstName,
        last_name: info.lastName,
        email: info.email,
        password: info.password,
        phone: info.phone,
        address: info.address,
        specialization_name: info.specialization,
        experience: info.experience,
        fee: info.fee,
        description: info.description,
        license_number: info.licenseNumber,
        profile_picture: info.image
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Doctor added successfully:", response.data);
      setDoctorId(response.data.id);
      setInfo({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        specialization: "",
        experience: "",
        fee: "",
        description: "",
        image: "",
        licenseNumber: ""
      });
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Error adding doctor:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!doctorId) return;
    const token = cookie.get("Bearer")
    const addAvailabilities = async () => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/api/admin/doctors/${doctorId}/availabilities/`,
          [...availabilities]
          , {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setAvailabilities([{ day: "Saturday", start_time: "09:00", end_time: "17:00", is_active: true }]);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setErrors({ submit: "An error occurred. Please try again." });
        setTimeout(() => {
          setErrors({});
        })
      }
    }
    addAvailabilities();
}, [doctorId]);
  return (
    <>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-screen bg-white  rounded-lg shadow-md p-6 flex items-center justify-center">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">Add New Doctor...</p>
          </div>
        </div>
      </div>):(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Doctor</h1>
          <p className="text-gray-600">Complete the form below to register a new doctor</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="John"
                    value={info.firstName}
                    onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Smith"
                    value={info.lastName}
                    onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="doctor@example.com"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="01012345678"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Cairo, Nasr City"
                    value={info.address}
                    onChange={(e) => setInfo({ ...info, address: e.target.value })}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                  value={info.image}
                  onChange={(e) => setInfo({ ...info, image: e.target.value })}
                />
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Professional Information Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Professional Information
              </h2>

              {/* Specialization & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
                    value={info.specialization}
                    onChange={(e) => setInfo({ ...info, specialization: e.target.value })}
                  >
                    <option value="">Select Specialization</option>
                    {specializations.map((spec) => (
                      <option key={spec.id} value={spec.name}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                  {errors.specialization && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.specialization}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (years) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="5"
                    value={info.experience}
                    onChange={(e) => setInfo({ ...info, experience: e.target.value })}
                  />
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
                  )}
                </div>
              </div>

              {/* Fee & License */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee (EGP) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="200"
                    value={info.fee}
                    onChange={(e) => setInfo({ ...info, fee: e.target.value })}
                  />
                  {errors.fee && (
                    <p className="text-red-500 text-xs mt-1">{errors.fee}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical License Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="LIC123456"
                    value={info.licenseNumber}
                    onChange={(e) => setInfo({ ...info, licenseNumber: e.target.value })}
                  />
                  {errors.licenseNumber && (
                    <p className="text-red-500 text-xs mt-1">{errors.licenseNumber}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio / Description
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                  placeholder="Tell us about yourself..."
                  value={info.description}
                  onChange={(e) => setInfo({ ...info, description: e.target.value })}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Working Hours Section */}
            <div>
              <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-blue-500">
                <h2 className="text-2xl font-semibold text-gray-800">Working Hours</h2>
                <button
                  type="button"
                  onClick={() => setAvailabilities([...availabilities, {
                    day: "Saturday",
                    start_time: "09:00",
                    end_time: "17:00",
                    is_active: true
                  }])}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Time Slot
                </button>
              </div>

              <div className="space-y-3">
                {availabilities.map((availability, index) => (
                  <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 rounded-xl border-2 border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                        <select
                          value={availability.day}
                          onChange={(e) => {
                            const newAvailabilities = [...availabilities];
                            newAvailabilities[index].day = e.target.value;
                            setAvailabilities(newAvailabilities);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none bg-white"
                        >
                          {daysOfWeek.map(day => (
                            <option key={day.value} value={day.label}>{day.label}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                        <input
                          type="time"
                          value={availability.start_time}
                          onChange={(e) => {
                            const newAvailabilities = [...availabilities];
                            newAvailabilities[index].start_time = e.target.value;
                            setAvailabilities(newAvailabilities);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                        <input
                          type="time"
                          value={availability.end_time}
                          onChange={(e) => {
                            const newAvailabilities = [...availabilities];
                            newAvailabilities[index].end_time = e.target.value;
                            setAvailabilities(newAvailabilities);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none bg-white"
                        />
                      </div>

                      <div className="flex gap-2 items-center">
                        <label className="flex items-center gap-2 cursor-pointer bg-white px-3 py-2 rounded-lg border-2 border-gray-200">
                          <input
                            type="checkbox"
                            checked={availability.is_active}
                            onChange={(e) => {
                              const newAvailabilities = [...availabilities];
                              newAvailabilities[index].is_active = e.target.checked;
                              setAvailabilities(newAvailabilities);
                            }}
                            className="w-4 h-4 accent-blue-500"
                          />
                          <span className="text-sm font-medium">Active</span>
                        </label>

                        {availabilities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setAvailabilities(availabilities.filter((_, i) => i !== index))}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                            title="Remove"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}

                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Security Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Security
              </h2>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                      placeholder="••••••••"
                      value={info.password}
                      onChange={(e) => setInfo({ ...info, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, password: !showPassword.password })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.password ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all pr-12"
                      placeholder="••••••••"
                      value={info.confirmPassword}
                      onChange={(e) => setInfo({ ...info, confirmPassword: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword.confirmPassword ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>

      )}

    </>
  );
};

export default AddDoctor;