import { useParams, Link } from "react-router-dom";

const PharmacyDetails = () => {
  const { id } = useParams();

  // في الواقع، ستجلب البيانات من API حسب الـ id
  const pharmacy = {
    id: parseInt(id),
    name: "Care Plus Pharmacy",
    nameAr: "صيدلية كير بلس",
    icon: "💊",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=800",
    location: "123 Medical Street, Downtown, Cairo, Egypt",
    locationAr: "123 شارع الطبي، وسط البلد، القاهرة، مصر",
    rating: 4.9,
    reviews: 456,
    phone: "+20 123 456 7890",
    email: "info@carepluspharmacy.com",
    website: "www.carepluspharmacy.com",
    openTime: "24 Hours",
    closeTime: "",
    workingDays: "Open Daily",
    workingDaysAr: "مفتوح يومياً",
    emergency: true,
    description:
      "Care Plus Pharmacy is a leading healthcare provider offering comprehensive pharmaceutical services with a focus on quality and customer care. Our experienced pharmacists are dedicated to providing expert advice and ensuring the best health outcomes for our patients.",
    descriptionAr:
      "صيدلية كير بلس هي مزود رعاية صحية رائد يقدم خدمات صيدلانية شاملة مع التركيز على الجودة ورعاية العملاء. صيادلتنا ذوو الخبرة ملتزمون بتقديم المشورة المتخصصة وضمان أفضل النتائج الصحية لمرضانا.",
    services: [
      {
        category: "Prescription Medications",
        categoryAr: "الأدوية بوصفة طبية",
        items: [
          {
            name: "Antibiotics",
            nameAr: "المضادات الحيوية",
            price: "50-300 EGP",
            duration: "Immediate",
          },
          {
            name: "Cardiovascular Drugs",
            nameAr: "أدوية القلب والأوعية",
            price: "100-500 EGP",
            duration: "Immediate",
          },
          {
            name: "Diabetes Medications",
            nameAr: "أدوية السكري",
            price: "150-600 EGP",
            duration: "Immediate",
          },
          {
            name: "Hormone Therapy",
            nameAr: "العلاج الهرموني",
            price: "200-800 EGP",
            duration: "Immediate",
          },
        ],
      },
      {
        category: "OTC Medications",
        categoryAr: "الأدوية بدون وصفة",
        items: [
          {
            name: "Pain Relief",
            nameAr: "مسكنات الألم",
            price: "20-100 EGP",
            duration: "Immediate",
          },
          {
            name: "Cold & Flu",
            nameAr: "أدوية البرد والإنفلونزا",
            price: "30-150 EGP",
            duration: "Immediate",
          },
          {
            name: "Digestive Health",
            nameAr: "صحة الجهاز الهضمي",
            price: "25-120 EGP",
            duration: "Immediate",
          },
          {
            name: "Allergy Relief",
            nameAr: "علاج الحساسية",
            price: "40-180 EGP",
            duration: "Immediate",
          },
        ],
      },
      {
        category: "Vitamins & Supplements",
        categoryAr: "الفيتامينات والمكملات",
        items: [
          {
            name: "Multivitamins",
            nameAr: "الفيتامينات المتعددة",
            price: "80-400 EGP",
            duration: "Immediate",
          },
          {
            name: "Omega-3",
            nameAr: "أوميجا 3",
            price: "120-500 EGP",
            duration: "Immediate",
          },
          {
            name: "Calcium & Vitamin D",
            nameAr: "الكالسيوم وفيتامين د",
            price: "60-250 EGP",
            duration: "Immediate",
          },
          {
            name: "Probiotics",
            nameAr: "البروبيوتيك",
            price: "150-600 EGP",
            duration: "Immediate",
          },
        ],
      },
      {
        category: "Personal Care",
        categoryAr: "العناية الشخصية",
        items: [
          {
            name: "Skin Care Products",
            nameAr: "منتجات العناية بالبشرة",
            price: "100-800 EGP",
            duration: "Immediate",
          },
          {
            name: "Hair Care",
            nameAr: "العناية بالشعر",
            price: "80-500 EGP",
            duration: "Immediate",
          },
          {
            name: "Oral Care",
            nameAr: "العناية بالفم",
            price: "30-200 EGP",
            duration: "Immediate",
          },
          {
            name: "Sunscreen",
            nameAr: "واقي الشمس",
            price: "120-600 EGP",
            duration: "Immediate",
          },
        ],
      },
      {
        category: "Medical Supplies",
        categoryAr: "المستلزمات الطبية",
        items: [
          {
            name: "Blood Glucose Monitors",
            nameAr: "أجهزة قياس السكر",
            price: "300-1500 EGP",
            duration: "Immediate",
          },
          {
            name: "Blood Pressure Monitors",
            nameAr: "أجهزة قياس الضغط",
            price: "400-2000 EGP",
            duration: "Immediate",
          },
          {
            name: "First Aid Kits",
            nameAr: "شنط الإسعافات الأولية",
            price: "100-500 EGP",
            duration: "Immediate",
          },
          {
            name: "Thermometers",
            nameAr: "موازين الحرارة",
            price: "50-300 EGP",
            duration: "Immediate",
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
      { icon: "📱", name: "Online Ordering", nameAr: "طلب أونلاين" },
      { icon: "🚚", name: "Home Delivery", nameAr: "توصيل منزلي" },
      { icon: "☕", name: "Free WiFi", nameAr: "واي فاي مجاني" },
    ],
    equipment: [
      {
        name: "Automated Dispensing System",
        nameAr: "نظام صرف آلي",
        description: "Fast and accurate",
      },
      {
        name: "Cold Storage Units",
        nameAr: "وحدات تبريد",
        description: "Temperature controlled",
      },
      {
        name: "Prescription Management System",
        nameAr: "نظام إدارة الروشتات",
        description: "Digital tracking",
      },
      {
        name: "Health Screening Devices",
        nameAr: "أجهزة الفحص الصحي",
        description: "Blood pressure & glucose",
      },
      {
        name: "Compounding Lab",
        nameAr: "معمل تحضير الأدوية",
        description: "Custom medications",
      },
      {
        name: "Medication Verification",
        nameAr: "نظام التحقق من الأدوية",
        description: "Safety first",
      },
    ],
    pharmacists: [
      {
        name: "Dr. Ahmed Hassan",
        nameAr: "د. أحمد حسن",
        specialty: "Clinical Pharmacist",
        specialtyAr: "صيدلي إكلينيكي",
        experience: "15 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
      {
        name: "Dr. Sarah Mohamed",
        nameAr: "د. سارة محمد",
        specialty: "Oncology Pharmacist",
        specialtyAr: "صيدلي أورام",
        experience: "12 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
      {
        name: "Dr. Omar Ali",
        nameAr: "د. عمر علي",
        specialty: "Pediatric Pharmacist",
        specialtyAr: "صيدلي أطفال",
        experience: "10 years",
        image: "https://i.ibb.co/0j3y2vY/doctor-1.webp",
      },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
      "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400",
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
      "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400",
    ],
  };

  return (
    <div className="pharmacy-details-page">
      {/* Header with Image */}
      <section className="header-section relative h-[400px] overflow-hidden">
        <img
          src={pharmacy.image}
          alt={pharmacy.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/60"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Link
              to="/services/search/pharmacies"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Pharmacies
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <span className="text-5xl">{pharmacy.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {pharmacy.name}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="font-bold">{pharmacy.rating}</span>
                <span className="text-white/80">
                  ({pharmacy.reviews} reviews)
                </span>
              </div>
              {pharmacy.emergency && (
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
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  About Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {pharmacy.description}
                </p>
              </div>

              {/* Services by Category */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Products & Services
                </h2>
                <div className="space-y-6">
                  {pharmacy.services.map((category, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-gray-100 rounded-xl p-6 hover:border-green-200 transition-all">
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span className="w-2 h-8 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full"></span>
                        {category.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="bg-gray-50 rounded-lg p-4 hover:bg-green-50 transition-colors">
                            <h4 className="font-bold mb-1">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-green-600 font-bold text-lg">
                                {item.price}
                              </span>
                              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">
                                <i className="fa-solid fa-clock mr-1"></i>
                                {item.duration}
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
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Equipment & Technology
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pharmacy.equipment.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 border-2 border-gray-100 rounded-xl p-4 hover:border-green-200 hover:shadow-md transition-all">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-flask text-green-600 text-xl"></i>
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

              {/* Pharmacists */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Our Pharmacists
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {pharmacy.pharmacists.map((pharmacist, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-100 rounded-xl p-5 text-center hover:border-green-200 hover:shadow-lg transition-all">
                      <img
                        src={pharmacist.image}
                        alt={pharmacist.name}
                        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
                      />
                      <h3 className="font-bold text-lg mb-1">
                        {pharmacist.name}
                      </h3>
                      <p className="text-sm font-semibold text-green-600 mb-1">
                        {pharmacist.specialty}
                      </p>
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                        <i className="fa-solid fa-briefcase text-green-600"></i>
                        <span>{pharmacist.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Facilities */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Facilities & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {pharmacy.facilities.map((facility, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <span className="text-4xl mb-2">{facility.icon}</span>
                      <p className="font-semibold text-sm">{facility.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Gallery
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {pharmacy.gallery.map((img, index) => (
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
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-900 to-emerald-600 bg-clip-text text-transparent">
                  Contact Information
                </h3>

                {/* Working Hours */}
                <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-clock text-white text-xl"></i>
                    </div>
                    <div>
                      <p className="font-bold text-lg">Working Hours</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {pharmacy.workingDays}
                      </span>
                    </div>
                    <div className="text-center text-2xl font-bold text-green-600 mt-3 bg-white rounded-lg py-2">
                      {pharmacy.openTime === "24 Hours"
                        ? "24 Hours"
                        : `${pharmacy.openTime} - ${pharmacy.closeTime}`}
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 mb-6">
                  <a
                    href={`tel:${pharmacy.phone}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-phone text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">{pharmacy.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${pharmacy.email}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-envelope text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-sm">{pharmacy.email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-location-dot text-red-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-sm">
                        {pharmacy.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all">
                    <i className="fa-solid fa-shopping-cart mr-2"></i>
                    Order Now
                  </button>
                  <button className="w-full border-2 border-green-600 text-green-600 py-4 rounded-xl font-bold hover:bg-green-50 transition-all">
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

export default PharmacyDetails;
