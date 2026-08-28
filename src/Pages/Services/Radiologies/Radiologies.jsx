import { Link } from "react-router-dom";
import ElementBox from "../../../Components/Element/ElementBox";
import landingImg from "../../../assets/Services/medical-banner-with-doctor-wearing-face-mask.jpg";

const Radiologies = () => {
const Radiologies = [
  {
    id: 1,
    name: "Advanced Imaging Center",
    nameAr: "مركز التصوير المتقدم",
    icon: "📡",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500",
    location: "Downtown, Cairo",
    locationAr: "وسط البلد، القاهرة",
    rating: 4.9,
    reviews: 328,
    specialties: ["MRI", "CT Scan", "Ultrasound"],
    openTime: "24 Hours",
    closeTime: "",
    emergency: true,
  },
  {
    id: 2,
    name: "Scan Diagnostic Center",
    nameAr: "مركز سكان للتشخيص",
    icon: "🔬",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=500",
    location: "Nasr City, Cairo",
    locationAr: "مدينة نصر، القاهرة",
    rating: 4.8,
    reviews: 289,
    specialties: ["X-Ray", "Mammography", "Bone Density"],
    openTime: "8:00 AM",
    closeTime: "11:00 PM",
    emergency: true,
  },
  {
    id: 3,
    name: "Digital Radiologies Hub",
    nameAr: "مركز الأشعة الرقمية",
    icon: "💻",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=500",
    location: "Heliopolis, Cairo",
    locationAr: "مصر الجديدة، القاهرة",
    rating: 4.7,
    reviews: 245,
    specialties: ["Digital X-Ray", "Fluoroscopy", "Angiography"],
    openTime: "7:00 AM",
    closeTime: "10:00 PM",
    emergency: false,
  },
  {
    id: 4,
    name: "Elite Diagnostic Imaging",
    nameAr: "النخبة للتصوير التشخيصي",
    icon: "🏥",
    image: "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500",
    location: "Maadi, Cairo",
    locationAr: "المعادي، القاهرة",
    rating: 4.9,
    reviews: 412,
    specialties: ["PET Scan", "Nuclear Medicine", "3D Imaging"],
    openTime: "6:00 AM",
    closeTime: "12:00 AM",
    emergency: true,
  },
  {
    id: 5,
    name: "Crystal Clear Radiologies",
    nameAr: "كريستال للأشعة",
    icon: "💎",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=500",
    location: "6th October City",
    locationAr: "مدينة 6 أكتوبر",
    rating: 4.6,
    reviews: 198,
    specialties: ["Cardiac CT", "Dental X-Ray", "Chest X-Ray"],
    openTime: "8:30 AM",
    closeTime: "9:00 PM",
    emergency: false,
  },
  {
    id: 6,
    name: "Precision Scan Center",
    nameAr: "مركز بريسيجن للأشعة",
    icon: "🎯",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500",
    location: "Zamalek, Cairo",
    locationAr: "الزمالك، القاهرة",
    rating: 4.8,
    reviews: 356,
    specialties: ["Brain MRI", "Spine Imaging", "Joint Scan"],
    openTime: "24 Hours",
    closeTime: "",
    emergency: true,
  },
  {
    id: 7,
    name: "Metro Imaging Solutions",
    nameAr: "ميترو للتصوير الطبي",
    icon: "🚇",
    image: "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?w=500",
    location: "Mohandessin, Giza",
    locationAr: "المهندسين، الجيزة",
    rating: 4.7,
    reviews: 267,
    specialties: ["Abdominal Ultrasound", "Pelvic Scan", "Doppler"],
    openTime: "7:30 AM",
    closeTime: "10:30 PM",
    emergency: false,
  },
  {
    id: 8,
    name: "Vision Radiologies Center",
    nameAr: "مركز فيجن للأشعة",
    icon: "👁️",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500",
    location: "New Cairo",
    locationAr: "القاهرة الجديدة",
    rating: 4.9,
    reviews: 389,
    specialties: ["4D Ultrasound", "Prenatal Imaging", "Women's Health"],
    openTime: "8:00 AM",
    closeTime: "11:00 PM",
    emergency: true,
  },
];

  return (
    <div className="Radiologies-page">
      {/* Landing Section */}
      <section
        className="landing min-h-[500px] relative overflow-hidden z-0 pt-20 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/80 to-indigo-900/70 z-0"></div>

        <div className="container mx-auto px-5 text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
            Our Radiologies
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-2">
            Find the best medical laboratory near you
          </p>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full h-16 md:h-24">
            <path
              fill="#ffffff"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
              Choose Your Laboratory
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our network of trusted medical Radiologies and select the
              one that best fits your needs
            </p>
          </div>

          {/* Radiologies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Radiologies.map((lab) => (
              <ElementBox
                key={lab.id}
                id={lab.id}
                name={lab.name}
                nameAr={lab.nameAr}
                icon={lab.icon}
                image={lab.image}
                location={lab.location}
                locationAr={lab.locationAr}
                rating={lab.rating}
                reviews={lab.reviews}
                specialties={lab.specialties}
                openTime={lab.openTime}
                closeTime={lab.closeTime}
                emergency={lab.emergency}
                link={`/radiologies/${lab.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features py-20 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-x-ray text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Equipment</h3>
              <p className="text-gray-600 text-sm">Latest imaging technology</p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-user-doctor text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Radiologists</h3>
              <p className="text-gray-600 text-sm">
                Board-certified specialists
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-bolt text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Results</h3>
              <p className="text-gray-600 text-sm">
                Same day reports available
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-shield-halved text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">
                Radiation safety protocols
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Imaging */}
      <section className="imaging-types py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
              Types of Imaging Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🧲", name: "MRI Scan", nameAr: "الرنين المغناطيسي" },
              { icon: "💿", name: "CT Scan", nameAr: "الأشعة المقطعية" },
              { icon: "📻", name: "X-Ray", nameAr: "الأشعة السينية" },
              { icon: "🔊", name: "Ultrasound", nameAr: "الموجات فوق الصوتية" },
              { icon: "🎗️", name: "Mammography", nameAr: "ماموجرام" },
              { icon: "🦴", name: "Bone Density", nameAr: "كثافة العظام" },
              { icon: "💓", name: "Cardiac Imaging", nameAr: "أشعة القلب" },
              { icon: "🧠", name: "Brain Scan", nameAr: "أشعة المخ" },
              { icon: "🫁", name: "Chest X-Ray", nameAr: "أشعة الصدر" },
            ].map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white border-2 border-gray-100 p-6 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">{type.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{type.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Radiologies;
