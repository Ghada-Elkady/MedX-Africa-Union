import { Link } from "react-router-dom";
import ElementBox from "../../../Components/Element/ElementBox";
import landingImg from "../../../assets/Services/medical-banner-with-doctor-wearing-face-mask.jpg";

const Laboratories = () => {
  const laboratories = [
    {
      id: 1,
      name: "Al-Mokhtabar Laboratory",
      nameAr: "معامل المختبر",
      icon: "🔬",
      image:
        "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500",
      location: "Downtown, Cairo",
      locationAr: "وسط البلد، القاهرة",
      rating: 4.8,
      reviews: 245,
      specialties: ["Blood Tests", "Hormones", "PCR"],
      openTime: "8:00 AM",
      closeTime: "10:00 PM",
      emergency: true,
    },
    {
      id: 2,
      name: "Alpha Laboratory",
      nameAr: "معامل ألفا",
      icon: "🧬",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500",
      location: "Nasr City, Cairo",
      locationAr: "مدينة نصر، القاهرة",
      rating: 4.9,
      reviews: 312,
      specialties: ["Genetics", "Pathology", "Microbiology"],
      openTime: "7:00 AM",
      closeTime: "11:00 PM",
      emergency: true,
    },
    {
      id: 3,
      name: "Beta Medical Lab",
      nameAr: "معامل بيتا الطبية",
      icon: "🧪",
      image:
        "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500",
      location: "Heliopolis, Cairo",
      locationAr: "مصر الجديدة، القاهرة",
      rating: 4.7,
      reviews: 198,
      specialties: ["Clinical Chemistry", "Immunology", "Serology"],
      openTime: "8:30 AM",
      closeTime: "9:00 PM",
      emergency: false,
    },
    {
      id: 4,
      name: "Gamma Diagnostics",
      nameAr: "معامل جاما للتشخيص",
      icon: "💉",
      image:
        "https://images.unsplash.com/photo-1581595220892-b0739db3ba8c?w=500",
      location: "Maadi, Cairo",
      locationAr: "المعادي، القاهرة",
      rating: 4.6,
      reviews: 167,
      specialties: ["Hematology", "Coagulation", "Tumor Markers"],
      openTime: "9:00 AM",
      closeTime: "8:00 PM",
      emergency: false,
    },
    {
      id: 5,
      name: "Delta Medical Laboratory",
      nameAr: "معامل دلتا الطبية",
      icon: "🩸",
      image:
        "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=500",
      location: "6th October City",
      locationAr: "مدينة 6 أكتوبر",
      rating: 4.8,
      reviews: 221,
      specialties: ["Diabetes", "Thyroid", "Vitamins"],
      openTime: "7:30 AM",
      closeTime: "10:30 PM",
      emergency: true,
    },
    {
      id: 6,
      name: "Omega Lab Center",
      nameAr: "مركز أوميجا للتحاليل",
      icon: "🦠",
      image:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500",
      location: "Zamalek, Cairo",
      locationAr: "الزمالك، القاهرة",
      rating: 4.9,
      reviews: 289,
      specialties: ["Molecular Biology", "Genetics", "Advanced Diagnostics"],
      openTime: "8:00 AM",
      closeTime: "11:00 PM",
      emergency: true,
    },
    {
      id: 7,
      name: "Sigma Laboratory",
      nameAr: "معامل سيجما",
      icon: "🔬",
      image:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500",
      location: "Mohandessin, Giza",
      locationAr: "المهندسين، الجيزة",
      rating: 4.7,
      reviews: 203,
      specialties: [
        "Complete Blood Count",
        "Liver Function",
        "Kidney Function",
      ],
      openTime: "8:00 AM",
      closeTime: "9:30 PM",
      emergency: false,
    },
    {
      id: 8,
      name: "Zeta Diagnostic Center",
      nameAr: "مركز زيتا للتشخيص",
      icon: "🧫",
      image:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500",
      location: "New Cairo",
      locationAr: "القاهرة الجديدة",
      rating: 4.8,
      reviews: 256,
      specialties: ["Allergy Testing", "Autoimmune", "Infectious Diseases"],
      openTime: "7:00 AM",
      closeTime: "10:00 PM",
      emergency: true,
    },
  ];

  return (
    <div className="laboratories-page">
      {/* Landing Section */}
      <section
        className="landing min-h-[500px] relative overflow-hidden z-0 pt-20 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${landingImg})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-indigo-900/70 z-0"></div>

        <div className="container mx-auto px-5 text-center text-white z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
            Our Laboratories
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
              Browse our network of trusted medical laboratories and select the
              one that best fits your needs
            </p>
          </div>

          {/* Laboratories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {laboratories.map((lab) => (
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
                link={`/laboratories/${lab.id}`}
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
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-flask-vial text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">500+ Tests</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive testing menu
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-gauge-high text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Results</h3>
              <p className="text-gray-600 text-sm">24-48 hours turnaround</p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-certificate text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Certified Labs</h3>
              <p className="text-gray-600 text-sm">
                Internationally accredited
              </p>
            </div>
            <div className="feature-item text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-shield-halved text-4xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Confidential</h3>
              <p className="text-gray-600 text-sm">100% privacy guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Laboratories;
