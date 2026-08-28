import { Link } from "react-router-dom";
import serviceLanding from "../../assets/Services/medical-banner-with-doctor-wearing-face-mask.jpg";
const Services = () => {
  const services = [
    {
      icon: "🩺",
      title: "Radiologies",
      titleAr: "الأشعة",
      description:
        "Advanced imaging services including X-ray, CT scan, MRI, and ultrasound diagnostics",
      link: "/services/search/radiologies",
    },
    {
      icon: "🧪",
      title: "Laboratories",
      titleAr: "المعامل",
      description:
        "Comprehensive laboratory testing and diagnostic services with accurate results",
      link: "/services/search/laboratories",
    },
    {
      icon: "💊",
      title: "Pharmacies",
      titleAr: "صيدلية",
      description:
        "Full-service pharmacy providing medications and pharmaceutical care",
      link: "/services/search/pharmacies",
    },
    {
      icon: "❤️",
      title: "Cardiology",
      titleAr: "قلب",
      description: "Advanced heart care and cardiovascular disease management",
      link: "/doctors/search/Cardiology%20Physician",
    },
    {
      icon: "🧠",
      title: "Neurology",
      titleAr: "مخ واعصاب",
      description: "Expert diagnosis and treatment of neurological conditions",
      link: "/doctors/search/Neurology%20Physician",
    },
    {
      icon: "🦴",
      title: "Orthopedics",
      titleAr: "عظام",
      description: "Treatment for bone, joint, and muscle conditions",
      link: "/doctors/search/Orthopedics%20Physician",
    },
    {
      icon: "👶",
      title: "Pediatrics",
      titleAr: "اطفال",
      description:
        "Specialized medical care for infants, children, and adolescents",
      link: "/doctors/search/Pediatrics%20Physician",
    },
    {
      icon: "✨",
      title: "Dermatology",
      titleAr: "جلدية",
      description:
        "Expert skin care and treatment for dermatological conditions",
      link: "/doctors/search/Dermatology%20Physician",
    },
    {
      icon: "🤰",
      title: "Gynecology",
      titleAr: "نساء وتوليد",
      description: "Comprehensive women's health care and obstetrics services",
      link: "/doctors/search/Gynecology%20Physician",
    },
    {
      icon: "🧘",
      title: "Psychiatry",
      titleAr: "نفسي",
      description: "Mental health care and psychiatric treatment services",
      link: "/doctors/search/Psychiatry%20Physician",
    },
    {
      icon: "👁️",
      title: "Ophthalmology",
      titleAr: "عيون",
      description: "Complete eye care services and vision correction",
      link: "/doctors/search/Ophthalmology%20Physician",
    },
    {
      icon: "🦷",
      title: "Dental",
      titleAr: "اسنان",
      description: "Comprehensive dental care and oral health services",
      link: "/doctors/search/Dental%20Physician",
    },
  ];
  return (
    <div className="page min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="landing relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/60 z-10"></div>
        <img
          src={serviceLanding}
          alt="Healthcare Services"
          className="h-[500px] w-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Comprehensive healthcare solutions tailored to your needs
          </p>
        </div>
        {/* Decorative wave */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" className="w-full md:w-3/4 h-fit mx-auto">
            <path
              fill="#fbfcfd"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Can Help You
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our range of specialized medical services designed to
            provide exceptional care and support for you and your family
          </p>
        </div>

        {/* Services Grid */}
        <div className="services grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card Template - Add your actual services here */}
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <Link
                  to={service.link}
                  className="text-blue-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
              <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Personalized Care?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Take the first step towards a healthier you with our personalized
            care services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/doctors"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Book Appointment
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
