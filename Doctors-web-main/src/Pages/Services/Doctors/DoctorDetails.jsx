import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import doctor_1 from "../../../assets/Home/doctors/doctor-1.webp";
import axios from "axios";
import PlaceholderDetails from "../../../Components/Element/PlaceholderDetails";

const DoctorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (doctors && doctors.length > 0) {
      const foundDoctor = doctors.find((doc) => doc.id === id);
      setDoctor(foundDoctor);
    }
  }, [id, doctors]);
  useEffect(() => {
    const HandleData = async () => {
      try {
        const response = await axios.get("https://doctorsapi.com/api/doctors", {
          headers: {
            "api-key":
              "hk_mijbtdyh2d98c87f71807efe31e9f6c0446f6b6bc36270dbd0599ee7c6df89c0299239fe", // استبدلها بمفتاحك الحقيقي
          },
          params: {
            limit: 25,
            id: id,
          },
        });
        setDoctors(response.data.doctors);
        console.log(response.data);
      } catch (error) {
        console.error("Error setting document title:", error);
      }
    };
    HandleData();
  }, [id]);

  if (!doctor) {
    return <PlaceholderDetails />;
  }

  return (
    <div className="doctor-details-page min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-5 py-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition">
          <i className="fa-solid fa-arrow-left"></i>
          <span className="font-semibold">Back to Doctors</span>
        </button>

        {/* Doctor Header Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Doctor Image */}
            <div className="">
              <img
                src={doctor_1}
                alt={doctor.name}
                className="w-48 h-48 rounded-2xl object-contain shadow-md"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2 capitalize">
                    {doctor.name.toLowerCase()}
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold mb-3 capitalize">
                    {doctor.specialties?.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-100 px-4 py-2 rounded-full">
                  <i className="fa-solid fa-star text-yellow-500"></i>
                  <span className="font-bold text-gray-800">4.8</span>
                  <span className="text-gray-600 text-sm">(245 reviews)</span>
                </div>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-location-dot text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold capitalize">
                      {doctor.address?.line1.toLowerCase()},{" "}
                      {doctor.address?.city.toLowerCase()},{" "}
                      {doctor.address?.state.toLowerCase()},{" "}
                      {doctor.address?.country.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-graduation-cap text-green-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold">15+ Years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-users text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Patients</p>
                    <p className="font-semibold">1,200+ Treated</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-clock text-orange-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-semibold">Mon - Fri, 9AM - 5PM</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowBooking(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
                  <i className="fa-solid fa-calendar-check"></i>
                  Book Appointment
                </button>
                <a
                  href={`tel:${doctor.phone}`}
                  className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
                  <i className="fa-solid fa-phone"></i>
                  Call Now
                </a>
                <button className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
                  <i className="fa-solid fa-share-nodes"></i>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="flex border-b overflow-x-auto">
            {["overview", "reviews", "availability"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-semibold capitalize transition whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-600 border-b-4 border-blue-600 bg-blue-50"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    About Doctor
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. {doctor.name} is a highly experienced{" "}
                    {doctor.specialties?.[0]} with over 15 years of practice.
                    Known for exceptional patient care and advanced medical
                    expertise, Dr. {doctor.name} has successfully treated
                    thousands of patients and maintains a stellar reputation in
                    the medical community.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold capitalize">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Education
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-graduation-cap text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-semibold">
                          MD in {doctor.specialties?.[0]}
                        </p>
                        <p className="text-gray-600">
                          Harvard Medical School, 2008
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <i className="fa-solid fa-graduation-cap text-blue-600 mt-1"></i>
                      <div>
                        <p className="font-semibold">
                          Residency in Internal Medicine
                        </p>
                        <p className="text-gray-600">
                          Johns Hopkins Hospital, 2012
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Consultation",
                      "Diagnosis",
                      "Treatment Plans",
                      "Follow-up Care",
                      "Emergency Services",
                      "Telemedicine",
                    ].map((service, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <i className="fa-solid fa-check-circle text-green-600"></i>
                        <span className="font-semibold text-gray-700">
                          {service}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Patient Reviews
                  </h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Write a Review
                  </button>
                </div>

                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border-b pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <i className="fa-solid fa-user text-gray-600"></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-800">
                            Patient {index + 1}
                          </h4>
                          <span className="text-sm text-gray-500">
                            2 weeks ago
                          </span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className="fa-solid fa-star text-yellow-500 text-sm"></i>
                          ))}
                        </div>
                        <p className="text-gray-600">
                          Excellent doctor! Very professional and caring. Took
                          time to explain everything clearly and made me feel
                          comfortable throughout the consultation.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Availability Tab */}
            {activeTab === "availability" && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Available Time Slots
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                    (day, index) => (
                      <div
                        key={index}
                        className="border rounded-xl p-4 hover:border-blue-600 transition cursor-pointer">
                        <h4 className="font-bold text-gray-800 mb-2">{day}</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Morning</span>
                            <span className="font-semibold">
                              9:00 AM - 12:00 PM
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Afternoon</span>
                            <span className="font-semibold">
                              2:00 PM - 5:00 PM
                            </span>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Book Appointment
              </h3>
              <button
                onClick={() => setShowBooking(false)}
                className="text-gray-500 hover:text-gray-700">
                <i className="fa-solid fa-times text-2xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Time
                </label>
                <select className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-600 outline-none">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  rows="3"
                  className="w-full border-2 border-gray-300 rounded-xl p-3 focus:border-blue-600 outline-none"
                  placeholder="Briefly describe your symptoms or reason..."></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
