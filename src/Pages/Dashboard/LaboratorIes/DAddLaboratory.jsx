import { useState } from "react";

const AddLaboratory = () => {
    const [info, setInfo] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        image: "",
        laboratoryLicense: "",
        openingTime: "09:00",
        closingTime: "22:00",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Laboratory Data:", info);
        alert("Laboratory added successfully!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Add New Laboratory
                    </h1>
                    <p className="text-gray-600">
                        Complete the form below to register a medical laboratory
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Basic Info Section */}
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
                                Laboratory Information
                            </h2>

                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Laboratory Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 transition-all"
                                    placeholder="Alpha Labs"
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
                                    placeholder="lab@example.com"
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
                                    Laboratory Image URL
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                                    placeholder="https://example.com/lab.jpg"
                                    value={info.image}
                                    onChange={(e) => setInfo({ ...info, image: e.target.value })}
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
                                    Laboratory License Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                                    placeholder="LAB12345"
                                    value={info.laboratoryLicense}
                                    onChange={(e) =>
                                        setInfo({ ...info, laboratoryLicense: e.target.value })
                                    }
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
                                        onChange={(e) =>
                                            setInfo({ ...info, openingTime: e.target.value })
                                        }
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
                                        onChange={(e) =>
                                            setInfo({ ...info, closingTime: e.target.value })
                                        }
                                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Laboratory Description
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 resize-none"
                                    placeholder="Describe the laboratory services..."
                                    value={info.description}
                                    onChange={(e) =>
                                        setInfo({ ...info, description: e.target.value })
                                    }
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all shadow-lg"
                            >
                                Add Laboratory
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLaboratory;
