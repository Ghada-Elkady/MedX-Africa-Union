import { useParams, Link } from "react-router-dom";
import { getRadiologyById } from "../../../services/apiService";

const EXTRA_STATIC = {
  phone: "+20 123 456 7890",
  email: "info@medx-imaging.com",
  website: "www.medx-imaging.com",
  workingDays: "Open Daily",
  workingDaysAr: "مفتوح يومياً",
  description:
    "A leading radiology facility within the MedX network, equipped with the latest imaging technology including high-field MRI, multi-slice CT scanners, and digital X-ray systems. Board-certified radiologists provide accurate and timely diagnostic reports.",
  descriptionAr:
    "مرفق رائد للأشعة ضمن شبكة ميديكس، مجهز بأحدث تقنيات التصوير بما في ذلك الرنين المغناطيسي عالي المجال، والأشعة المقطعية متعددة الشرائح، وأنظمة الأشعة السينية الرقمية." ,
    services: [
      {
        category: "MRI Scans",
        categoryAr: "الرنين المغناطيسي",
        tests: [
          {
            name: "Brain MRI",
            nameAr: "رنين مغناطيسي على المخ",
            price: "2500 EGP",
            duration: "Same day",
          },
          {
            name: "Spine MRI",
            nameAr: "رنين مغناطيسي على العمود الفقري",
            price: "2800 EGP",
            duration: "Same day",
          },
          {
            name: "Joint MRI",
            nameAr: "رنين مغناطيسي على المفاصل",
            price: "2200 EGP",
            duration: "Same day",
          },
          {
            name: "Cardiac MRI",
            nameAr: "رنين مغناطيسي على القلب",
            price: "3500 EGP",
            duration: "Same day",
          },
        ],
      },
      {
        category: "CT Scans",
        categoryAr: "الأشعة المقطعية",
        tests: [
          {
            name: "Brain CT",
            nameAr: "أشعة مقطعية على المخ",
            price: "1500 EGP",
            duration: "2 hours",
          },
          {
            name: "Chest CT",
            nameAr: "أشعة مقطعية على الصدر",
            price: "1800 EGP",
            duration: "2 hours",
          },
          {
            name: "Abdominal CT",
            nameAr: "أشعة مقطعية على البطن",
            price: "2000 EGP",
            duration: "2 hours",
          },
          {
            name: "CT Angiography",
            nameAr: "أشعة مقطعية على الأوعية",
            price: "2500 EGP",
            duration: "3 hours",
          },
        ],
      },
      {
        category: "X-Ray",
        categoryAr: "الأشعة السينية",
        tests: [
          {
            name: "Chest X-Ray",
            nameAr: "أشعة سينية على الصدر",
            price: "200 EGP",
            duration: "1 hour",
          },
          {
            name: "Spine X-Ray",
            nameAr: "أشعة سينية على العمود الفقري",
            price: "250 EGP",
            duration: "1 hour",
          },
          {
            name: "Bone X-Ray",
            nameAr: "أشعة سينية على العظام",
            price: "200 EGP",
            duration: "1 hour",
          },
          {
            name: "Dental X-Ray",
            nameAr: "أشعة سينية على الأسنان",
            price: "150 EGP",
            duration: "30 minutes",
          },
        ],
      },
      {
        category: "Ultrasound",
        categoryAr: "الموجات فوق الصوتية",
        tests: [
          {
            name: "Abdominal Ultrasound",
            nameAr: "سونار على البطن",
            price: "400 EGP",
            duration: "Same day",
          },
          {
            name: "Pelvic Ultrasound",
            nameAr: "سونار على الحوض",
            price: "450 EGP",
            duration: "Same day",
          },
          {
            name: "Thyroid Ultrasound",
            nameAr: "سونار على الغدة الدرقية",
            price: "350 EGP",
            duration: "Same day",
          },
          {
            name: "4D Ultrasound",
            nameAr: "سونار رباعي الأبعاد",
            price: "800 EGP",
            duration: "Same day",
          },
        ],
      },
      {
        category: "Specialized Imaging",
        categoryAr: "تصوير متخصص",
        tests: [
          {
            name: "Mammography",
            nameAr: "ماموجرام",
            price: "600 EGP",
            duration: "Same day",
          },
          {
            name: "Bone Density Scan",
            nameAr: "قياس كثافة العظام",
            price: "500 EGP",
            duration: "Same day",
          },
          {
            name: "PET Scan",
            nameAr: "مسح بالإصدار البوزيتروني",
            price: "8000 EGP",
            duration: "24 hours",
          },
          {
            name: "Fluoroscopy",
            nameAr: "تنظير بالأشعة",
            price: "1200 EGP",
            duration: "2 hours",
          },
        ],
      },
    ],
    facilities: [
      { icon: "🅿️", name: "Free Parking", nameAr: "موقف مجاني" },
      {
        icon: "♿",
        name: "Wheelchair Access",
        nameAr: "دخول للكراسي المتحركة",
      },
      {
        icon: "🏥",
        name: "Comfortable Waiting Area",
        nameAr: "صالة انتظار مريحة",
      },
      { icon: "💳", name: "All Payment Methods", nameAr: "جميع طرق الدفع" },
      { icon: "🚑", name: "24/7 Emergency", nameAr: "طوارئ 24 ساعة" },
      { icon: "📱", name: "Online Reports", nameAr: "تقارير أونلاين" },
      { icon: "🔒", name: "Private Rooms", nameAr: "غرف خاصة" },
      { icon: "☕", name: "Refreshments", nameAr: "مشروبات مجانية" },
    ],
    equipment: [
      {
        name: "3 Tesla MRI Scanner",
        nameAr: "رنين مغناطيسي 3 تسلا",
        description: "High-resolution imaging",
      },
      {
        name: "256-Slice CT Scanner",
        nameAr: "أشعة مقطعية 256 شريحة",
        description: "Ultra-fast scanning",
      },
      {
        name: "Digital X-Ray System",
        nameAr: "نظام أشعة رقمي",
        description: "Low radiation dose",
      },
      {
        name: "4D Ultrasound",
        nameAr: "سونار رباعي الأبعاد",
        description: "Real-time 3D imaging",
      },
      {
        name: "Mammography Unit",
        nameAr: "جهاز ماموجرام",
        description: "Digital breast imaging",
      },
      {
        name: "DEXA Scanner",
        nameAr: "جهاز قياس كثافة العظام",
        description: "Bone density assessment",
      },
    ],
    radiologists: [
      {
        name: "Dr. Ahmed Hassan",
        nameAr: "د. أحمد حسن",
        specialty: "Neuroradiology",
        specialtyAr: "أشعة المخ والأعصاب",
        experience: "15 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
      {
        name: "Dr. Sarah Mohamed",
        nameAr: "د. سارة محمد",
        specialty: "Breast Imaging",
        specialtyAr: "أشعة الثدي",
        experience: "12 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
      {
        name: "Dr. Khaled Ali",
        nameAr: "د. خالد علي",
        specialty: "Cardiac Imaging",
        specialtyAr: "أشعة القلب",
        experience: "18 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400",
      "https://images.unsplash.com/photo-1581093458791-9d42f2c4e1a9?w=400",
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
      "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=400",
      "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
    ],
  };

const RadiologyDetails = () => {
  const { id } = useParams();
  const base = getRadiologyById(id);

  if (!base) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center max-w-md">
          <i className="fa-solid fa-x-ray text-5xl text-slate-300 mb-4"></i>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Radiology Center Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">The radiology center you are looking for does not exist.</p>
          <Link to="/radiologies" className="inline-flex items-center gap-2 bg-[#19A7CE] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#148AA1] transition-colors">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Radiology Centers
          </Link>
        </div>
      </div>
    );
  }

  const radiologyCenter = {
    ...base,
    image: base.image.replace("w=500", "w=800"),
    ...EXTRA_STATIC,
  };

  return (
    <div className="radiology-details-page">
      {/* Header with Image */}
      <section className="header-section relative h-[400px] overflow-hidden">
        <img
          src={radiologyCenter.image}
          alt={radiologyCenter.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Link
              to="/radiologies"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Radiology Centers
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <span className="text-5xl">{radiologyCenter.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {radiologyCenter.name}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="font-bold">{radiologyCenter.rating}</span>
                <span className="text-white/80">
                  ({radiologyCenter.reviews} reviews)
                </span>
              </div>
              {radiologyCenter.emergency && (
                <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">
                  24/7 Emergency Available
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-content py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  About Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {radiologyCenter.description}
                </p>
              </div>

              {/* Services by Category */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Imaging Services
                </h2>
                <div className="space-y-6">
                  {radiologyCenter.services.map((category, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-100 rounded-xl p-6 hover:border-blue-200 transition-all">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                        {category.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.tests.map((test, testIdx) => (
                          <div
                            key={testIdx}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-blue-50 transition-colors">
                            <h4 className="font-bold mb-1">{test.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-blue-600 font-bold text-lg">
                                {test.price}
                              </span>
                              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                <i className="fa-solid fa-clock mr-1"></i>
                                {test.duration}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Medical Equipment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {radiologyCenter.equipment.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-2 border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-microscope text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <h3 className="font-bold mb-1">{item.name}</h3>
                        <p className="text-xs text-gray-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radiologists */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Our Radiologists
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {radiologyCenter.radiologists.map((doctor, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-100 rounded-xl p-5 text-center hover:border-blue-200 hover:shadow-lg transition-all">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100"
                      />
                      <h3 className="font-bold text-lg mb-1">{doctor.name}</h3>
                      <p className="text-sm font-semibold text-blue-600 mb-1">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                        <i className="fa-solid fa-briefcase text-blue-600"></i>
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Facilities & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {radiologyCenter.facilities.map((facility, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <span className="text-4xl mb-2">{facility.icon}</span>
                      <p className="font-semibold text-sm">{facility.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {radiologyCenter.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-40 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer shadow-md"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Contact & Hours */}
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg sticky top-24">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Contact Information
                </h3>

                {/* Working Hours */}
                <div className="mb-6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-clock text-white text-xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Working Hours</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {radiologyCenter.workingDays}
                      </span>
                    </div>
                    <div className="text-center text-2xl font-bold text-blue-600 mt-3 bg-white rounded-lg py-2">
                      {radiologyCenter.openTime === "24 Hours"
                        ? "24 Hours"
                        : `${radiologyCenter.openTime} - ${radiologyCenter.closeTime}`}
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 mb-6">
                  <a
                    href={`tel:${radiologyCenter.phone}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-phone text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">{radiologyCenter.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${radiologyCenter.email}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-envelope text-blue-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-sm">
                        {radiologyCenter.email}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-location-dot text-red-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-sm">
                        {radiologyCenter.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                    <i className="fa-solid fa-calendar-check mr-2"></i>
                    Book Appointment
                  </button>
                  <button className="w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all">
                    <i className="fa-solid fa-phone mr-2"></i>
                    Call Now
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    <i className="fa-solid fa-map-location-dot mr-2"></i>
                    Get Directions
                  </button>
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all">
                    <i className="fa-solid fa-download mr-2"></i>
                    Download Price List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RadiologyDetails;
