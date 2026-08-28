import { useParams, Link } from "react-router-dom";
// import "../PagesStyle.css";

const LaboratoryDetails = () => {
  const { id } = useParams();

  // في الواقع، ستجلب البيانات من API حسب الـ id
  const laboratory = {
    id: 1,
    name: "Al-Mokhtabar Laboratory",
    nameAr: "معامل المختبر",
    icon: "🔬",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    location: "123 Main Street, Downtown, Cairo",
    locationAr: "123 شارع رئيسي، وسط البلد، القاهرة",
    rating: 4.8,
    reviews: 245,
    phone: "+20 123 456 7890",
    email: "info@almokhtabar.com",
    website: "www.almokhtabar.com",
    openTime: "8:00 AM",
    closeTime: "10:00 PM",
    workingDays: "Saturday - Thursday",
    workingDaysAr: "السبت - الخميس",
    emergency: true,
    description:
      "Al-Mokhtabar Laboratory is one of the leading medical laboratories in Egypt, providing comprehensive diagnostic services with state-of-the-art equipment and highly qualified staff.",
    descriptionAr:
      "معامل المختبر هي واحدة من المعامل الطبية الرائدة في مصر، توفر خدمات تشخيصية شاملة بأحدث المعدات وطاقم عمل مؤهل تأهيلاً عالياً.",
    services: [
      {
        name: "Complete Blood Count",
        nameAr: "صورة دم كاملة",
        price: "150 EGP",
        duration: "24 hours",
      },
      {
        name: "Blood Sugar",
        nameAr: "سكر الدم",
        price: "80 EGP",
        duration: "Same day",
      },
      {
        name: "Lipid Profile",
        nameAr: "دهون الدم",
        price: "250 EGP",
        duration: "24 hours",
      },
      {
        name: "Thyroid Function",
        nameAr: "وظائف الغدة الدرقية",
        price: "350 EGP",
        duration: "48 hours",
      },
      {
        name: "Liver Function",
        nameAr: "وظائف الكبد",
        price: "280 EGP",
        duration: "24 hours",
      },
      {
        name: "Kidney Function",
        nameAr: "وظائف الكلى",
        price: "300 EGP",
        duration: "24 hours",
      },
      {
        name: "Vitamin D",
        nameAr: "فيتامين د",
        price: "300 EGP",
        duration: "48 hours",
      },
      {
        name: "PCR COVID-19",
        nameAr: "فحص كورونا",
        price: "600 EGP",
        duration: "24 hours",
      },
    ],
    facilities: [
      { icon: "🅿️", name: "Free Parking", nameAr: "موقف مجاني" },
      {
        icon: "♿",
        name: "Wheelchair Access",
        nameAr: "دخول للكراسي المتحركة",
      },
      { icon: "🏥", name: "Waiting Area", nameAr: "صالة انتظار" },
      { icon: "💳", name: "Card Payment", nameAr: "دفع بالبطاقة" },
      { icon: "🚑", name: "Emergency Services", nameAr: "خدمات طوارئ" },
      { icon: "📱", name: "Online Results", nameAr: "نتائج أونلاين" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400",
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
    ],
  };

  return (
    <div className="laboratory-details-page">
      {/* Header with Image */}
      <section className="header-section relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60 "></div>

        <img
          src={laboratory.image}
          alt={laboratory.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <Link
              to="/services/search/laboratories"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors">
              <i className="fa-solid fa-arrow-left"></i>
              Back to Laboratories
            </Link>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                <span className="text-5xl">{laboratory.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {laboratory.name}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <i className="fa-solid fa-star text-yellow-400"></i>
                <span className="font-bold">{laboratory.rating}</span>
                <span className="text-white/80">
                  ({laboratory.reviews} reviews)
                </span>
              </div>
              {laboratory.emergency && (
                <div className="bg-red-500 px-3 py-1 rounded-full text-sm font-bold">
                  24/7 Emergency
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
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  About Us
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {laboratory.description}
                </p>
              </div>

              {/* Services */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-indigo-600 bg-clip-text text-transparent">
                  Available Tests
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {laboratory.services.map((service, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-100 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all">
                      <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 font-bold">
                          {service.price}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          <i className="fa-solid fa-clock mr-1"></i>
                          {service.duration}
                        </span>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {laboratory.facilities.map((facility, index) => (
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {laboratory.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-xl hover:scale-105 transition-transform cursor-pointer"
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
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
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
                        {laboratory.workingDays}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600"></div>
                    <div className="text-center text-2xl font-bold text-blue-600 mt-3">
                      {laboratory.openTime} - {laboratory.closeTime}
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-4 mb-6">
                  <a
                    href={`tel:${laboratory.phone}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-phone text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold">{laboratory.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${laboratory.email}`}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-envelope text-blue-600"></i>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-sm">
                        {laboratory.email}
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
                        {laboratory.location}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaboratoryDetails;
