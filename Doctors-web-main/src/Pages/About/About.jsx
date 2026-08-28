import { Link } from "react-router-dom";
import aboutLandingfrom "../../assets/Services/medical-banner-with-doctor-wearing-face-mask.jpg"; // Update with your image path

const About = () => {
  const stats = [
    { number: "50+", label: "Medical Specialists" },
    { number: "10,000+", label: "Happy Patients" },
    { number: "15+", label: "Years Experience" },
    { number: "24/7", label: "Emergency Care" },
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description:
        "We strive for the highest standards in medical care, continuously improving our services and expertise.",
    },
    {
      icon: "🤝",
      title: "Compassion",
      description:
        "Every patient receives personalized attention with empathy and understanding at the heart of our care.",
    },
    {
      icon: "🔬",
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and advanced medical techniques to provide superior healthcare.",
    },
    {
      icon: "🛡️",
      title: "Integrity",
      description:
        "Trust and transparency guide every interaction, ensuring ethical and honest healthcare delivery.",
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      specialty: "Cardiology",
      image: "👩‍⚕️",
    },
    {
      name: "Dr. Ahmed Hassan",
      role: "Head of Surgery",
      specialty: "General Surgery",
      image: "👨‍⚕️",
    },
    {
      name: "Dr. Emily Chen",
      role: "Director of Pediatrics",
      specialty: "Pediatrics",
      image: "👩‍⚕️",
    },
    {
      name: "Dr. Mohamed Ali",
      role: "Head of Radiology",
      specialty: "Diagnostic Imaging",
      image: "👨‍⚕️",
    },
  ];

  return (
    <div className="page min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-900 h-[400px] md:h-[500px]">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        {/* Replace with actual image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/50 to-indigo-800/50"></div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Dedicated to providing exceptional healthcare services with
              compassion, expertise, and cutting-edge technology.
            </p>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" className="w-full h-fit">
            <path
              fill="#fbfcfd"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6"></div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded with a vision to revolutionize healthcare delivery, our
                platform connects patients with top medical professionals and
                facilities across the region. We believe that quality healthcare
                should be accessible, efficient, and patient-centered.
              </p>
              <p>
                Over the years, we've built a comprehensive network of
                specialists, diagnostic centers, pharmacies, and healthcare
                facilities, all united by a common goal: to provide exceptional
                care when you need it most.
              </p>
              <p>
                Our commitment extends beyond medical treatment. We focus on
                preventive care, health education, and creating lasting
                relationships with our patients and their families.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-2xl overflow-hidden">
              {/* Replace with actual image */}
              <div className="w-full h-full flex items-center justify-center text-8xl">
                🏥
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl -z-10"></div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver comprehensive, patient-centered healthcare services
                that combine medical excellence with compassion. We strive to
                make quality healthcare accessible to all, leveraging technology
                to connect patients with the right specialists and facilities at
                the right time.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-4xl">🌟</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To be the leading healthcare platform that transforms the way
                people access and experience medical care. We envision a future
                where every individual has seamless access to world-class
                healthcare services, empowered by innovation and guided by
                compassion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <span className="text-5xl">{value.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Team */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experienced professionals dedicated to your health and well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 group">
                <div className="aspect-square bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-8xl">
                  {member.image}
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.specialty}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-4xl">⚕️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Expert Medical Team
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Access to board-certified specialists and experienced healthcare
              professionals across all medical disciplines.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-4xl">🏥</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              State-of-the-Art Facilities
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Modern diagnostic equipment and treatment facilities that meet
              international healthcare standards.
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-4xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Easy Online Booking
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Seamless appointment scheduling and access to your medical records
              through our user-friendly platform.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl mb-8 text-blue-50 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust us with their health
            and well-being.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/doctors"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
              Find a Doctor
            </Link>
            <Link
              to="/services"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all">
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
