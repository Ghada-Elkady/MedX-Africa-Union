import axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";

export default function AddPharmacy() {
  // const [loading, setLoading] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("Bearer");
  console.log(token);
  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    image: "",
    pharmacyLicense: "",
    openingTime: "09:00",
    closingTime: "22:00",
    description: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/admin/pharmacies/", 
       {
          username: info.email.split("@")[0],
         pharmacy_name: info.name,
          email: info.email,
          password: passwords.password,
          phone: info.phone,
          address: info.address,
          license_number: info.pharmacyLicense,
          profile_picture: info.image,
          opening_hours: [
            {
              start_time: info.openingTime,
              end_time: info.closingTime
            }
          ]
        }, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
       }
      );
      console.log(response);
      // alert("Pharmacy added successfully!");
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Add New Pharmacy</h1>
          <p className="text-gray-600">Complete the form below to register a pharmacy</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Basic Info Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Pharmacy Information
              </h2>

              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all"
                  placeholder="PharmaPlus"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  placeholder="pharmacy@example.com"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    placeholder="01012345678"
                    value={info.phone}
                    onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                    placeholder="Cairo, Nasr City"
                    value={info.address}
                    onChange={(e) => setInfo({ ...info, address: e.target.value })}
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  onChange={(e) =>
                    setInfo({ ...info, image: e.target.files[0] })
                  }
                />
              </div>
            </div>

            {/* License Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Legal Information
              </h2>

              {/* License Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacy License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                  placeholder="PHARM12345"
                  value={info.pharmacyLicense}
                  onChange={(e) => setInfo({ ...info, pharmacyLicense: e.target.value })}
                />
              </div>

              {/* Working Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opening Time
                  </label>
                  <input
                    type="time"
                    value={info.openingTime}
                    onChange={(e) => setInfo({ ...info, openingTime: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Closing Time
                  </label>
                  <input
                    type="time"
                    value={info.closingTime}
                    onChange={(e) => setInfo({ ...info, closingTime: e.target.value })}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 resize-none"
                  placeholder="Describe the pharmacy services..."
                  value={info.description}
                  onChange={(e) => setInfo({ ...info, description: e.target.value })}
                />
              </div>
            </div>

            {/* Security Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                Security
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg pr-12"
                      placeholder="••••••••"
                      value={passwords.password}
                      onChange={(e) => setPasswords({ ...passwords, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({ ...showPassword, password: !showPassword.password })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      👁
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg pr-12"
                      placeholder="••••••••"
                      value={passwords.confirmPassword}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirmPassword: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword({
                          ...showPassword,
                          confirmPassword: !showPassword.confirmPassword,
                        })
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      👁
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg"
              >
                Add Pharmacy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
