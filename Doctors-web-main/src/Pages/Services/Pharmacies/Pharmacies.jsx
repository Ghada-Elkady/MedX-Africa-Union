import { Link } from "react-router-dom";
import ElementBox from "../../../Components/Element/ElementBox";
import landingImg from "../../../assets/Services/medical-banner-with-doctor-wearing-face-mask.jpg";

const Pharmacies = () => {
  const Pharmacies = [
    {
      id: 1,
      name: "Care Plus Pharmacy",
      nameAr: "صيدلية كير بلس",
      icon: "💊",
      image:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
      location: "Downtown, Cairo",
      locationAr: "وسط البلد، القاهرة",
      rating: 4.9,
      reviews: 456,
      specialties: [
        "Prescription Drugs",
        "OTC Medications",
        "Health Consultation",
      ],
      openTime: "24 Hours",
      closeTime: "",
      emergency: true,
    },
    {
      id: 2,
      name: "HealthCare Pharmacy",
      nameAr: "صيدلية هيلث كير",
      icon: "🏥",
      image:
        "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=500",
      location: "Nasr City, Cairo",
      locationAr: "مدينة نصر، القاهرة",
      rating: 4.8,
      reviews: 389,
      specialties: ["Medical Supplies", "Baby Care", "Diabetic Care"],
      openTime: "8:00 AM",
      closeTime: "12:00 AM",
      emergency: true,
    },
    {
      id: 3,
      name: "Green Cross Pharmacy",
      nameAr: "صيدلية الصليب الأخضر",
      icon: "✚",
      image:
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=500",
      location: "Heliopolis, Cairo",
      locationAr: "مصر الجديدة، القاهرة",
      rating: 4.7,
      reviews: 312,
      specialties: ["Herbal Products", "Vitamins", "Supplements"],
      openTime: "7:00 AM",
      closeTime: "11:00 PM",
      emergency: false,
    },
    {
      id: 4,
      name: "Elite Medical Pharmacy",
      nameAr: "صيدلية النخبة الطبية",
      icon: "⚕️",
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500",
      location: "Maadi, Cairo",
      locationAr: "المعادي، القاهرة",
      rating: 4.9,
      reviews: 521,
      specialties: ["Oncology Drugs", "Rare Medications", "Compounding"],
      openTime: "24 Hours",
      closeTime: "",
      emergency: true,
    },
    {
      id: 5,
      name: "Wellness Pharmacy",
      nameAr: "صيدلية ويلنس",
      icon: "🌿",
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500",
      location: "6th October City",
      locationAr: "مدينة 6 أكتوبر",
      rating: 4.6,
      reviews: 267,
      specialties: ["Natural Products", "Skin Care", "Beauty Products"],
      openTime: "8:30 AM",
      closeTime: "10:00 PM",
      emergency: false,
    },
    {
      id: 6,
      name: "Express Pharmacy",
      nameAr: "صيدلية إكسبرس",
      icon: "🚀",
      image:
        "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=500",
      location: "Zamalek, Cairo",
      locationAr: "الزمالك، القاهرة",
      rating: 4.8,
      reviews: 445,
      specialties: ["Fast Delivery", "Online Orders", "Home Service"],
      openTime: "24 Hours",
      closeTime: "",
      emergency: true,
    },
    {
      id: 7,
      name: "Family Care Pharmacy",
      nameAr: "صيدلية العائلة",
      icon: "👨‍👩‍👧‍👦",
      image:
        "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=500",
      location: "Mohandessin, Giza",
      locationAr: "المهندسين، الجيزة",
      rating: 4.7,
      reviews: 356,
      specialties: ["Pediatric Care", "Family Planning", "Vaccinations"],
      openTime: "7:30 AM",
      closeTime: "11:30 PM",
      emergency: false,
    },
    {
      id: 8,
      name: "Modern Pharmacy Center",
      nameAr: "مركز الصيدلية الحديثة",
      icon: "🔬",
      image:
        "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500",
      location: "New Cairo",
      locationAr: "القاهرة الجديدة",
      rating: 4.9,
      reviews: 498,
      specialties: ["Clinical Services", "Health Screening", "Immunizations"],
      openTime: "8:00 AM",
      closeTime: "12:00 AM",
      emergency: true,
    },
  ];

  return (
    <div className="Pharmacies-page">
      {/* Landing Section */}
      <section
        className="landing min-h-[500px] relative overflow-hidden z-0 pt-20 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-indigo-900/70 z-0"></div>

        <div className="container mx-auto px-5 text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
            Our Pharmacies
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-2">
            Find the best pharmacy near you
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
              Choose Your Pharmacy
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Browse our network of trusted pharmacies and select the one that
              best fits your needs
            </p>
          </div>

          {/* Pharmacies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Pharmacies.map((pharmacy) => (
              <ElementBox
                key={pharmacy.id}
                id={pharmacy.id}
                name={pharmacy.name}
                nameAr={pharmacy.nameAr}
                icon={pharmacy.icon}
                image={pharmacy.image}
                location={pharmacy.location}
                locationAr={pharmacy.locationAr}
                rating={pharmacy.rating}
                reviews={pharmacy.reviews}
                specialties={pharmacy.specialties}
                openTime={pharmacy.openTime}
                closeTime={pharmacy.closeTime}
                emergency={pharmacy.emergency}
                link={`/pharmacies/${pharmacy.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-20 bg-white">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-prescription-bottle-medical text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Medications</h3>
              <p className="text-gray-600 text-sm">
                Certified and approved drugs
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-user-nurse text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Pharmacists</h3>
              <p className="text-gray-600 text-sm">
                Licensed healthcare professionals
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-truck-fast text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">Same day home delivery</p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-clock text-4xl text-green-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Available</h3>
              <p className="text-gray-600 text-sm">Round-the-clock service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Services */}
      <section className="services-types py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
              Pharmacy Services
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💊",
                name: "Prescription Filling",
                nameAr: "صرف الروشتات",
              },
              {
                icon: "🩺",
                name: "Health Consultation",
                nameAr: "استشارات صحية",
              },
              { icon: "💉", name: "Vaccinations", nameAr: "التطعيمات" },
              {
                icon: "🌡️",
                name: "Health Screening",
                nameAr: "الفحوصات الصحية",
              },
              {
                icon: "👶",
                name: "Baby Care Products",
                nameAr: "منتجات العناية بالأطفال",
              },
              {
                icon: "💪",
                name: "Sports Nutrition",
                nameAr: "التغذية الرياضية",
              },
              { icon: "🧴", name: "Skin Care", nameAr: "العناية بالبشرة" },
              { icon: "🦷", name: "Dental Care", nameAr: "العناية بالأسنان" },
              {
                icon: "🩹",
                name: "Medical Supplies",
                nameAr: "المستلزمات الطبية",
              },
            ].map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white border-2 border-gray-100 p-6 rounded-xl hover:border-green-300 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
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

export default Pharmacies;
