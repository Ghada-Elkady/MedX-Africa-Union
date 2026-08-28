import React from "react";
import farag from "../../../assets/Team/farag-1.png";
import ommar from "../../../assets/Team/ommer.png";
import amira from "../../../assets/Team/amira.png";
import mohammed from "../../../assets/Team/mohammed.png";
import moatasem from "../../../assets/Team/moatasem.png";
import medx from "../../../assets/Team/MedX.png";

const DeveloperTeam = () => {
  const teamMembers = [
    {
      name: "Ommar Tammam",
      designation: "Full Stack Developer",
      role: "Backend & API Development",
      Contact: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://wa.me/",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
      },
      image: ommar,
    },
    {
      name: "Amira Ragab",
      designation: "UI/UX Designer",
      role: "User Interface & Experience",
      Contact: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://wa.me/",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
      },
      image: amira,
    },
    {
      name: "Farag Sherif",
      designation: "Frontend Developer",
      role: "React & Interface Development",
      Contact: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://wa.me/",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
      },
      image: farag,
    },
    {
      name: "Mohammed Atta",
      designation: "Full Stack Developer",
      role: "System Architecture",
      Contact: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://wa.me/",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
      },
      image: mohammed,
    },
    {
      name: "Moatasem",
      designation: "Backend Developer",
      role: "Database & Server Management",
      Contact: {
        facebook: "https://www.facebook.com/",
        whatsapp: "https://wa.me/",
        github: "https://github.com/",
        linkedin: "https://www.linkedin.com/",
      },
      image: moatasem,
    },
  ];

  const stats = [
    { icon: "💻", label: "Lines of Code", value: "50,000+" },
    { icon: "🎨", label: "Design Hours", value: "500+" },
    { icon: "☕", label: "Cups of Coffee", value: "1,000+" },
    { icon: "🚀", label: "Features Built", value: "100+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 to-blue-900 py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Meet the Developers
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            The passionate team behind MedX, building the future of healthcare
            technology
          </p>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition-all duration-300 border border-gray-100">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Development Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A diverse group of talented developers, designers, and engineers
            committed to creating innovative healthcare solutions that make a
            difference in people's lives.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2">
              {/* Background Logo */}
              <div className="absolute inset-0 opacity-5 z-0">
                <img
                  src={medx}
                  className="w-full h-full object-contain"
                  alt="MedX Logo"
                />
              </div>

              {/* Member Image */}
              <div className="relative z-10">
                <div className="aspect-square overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-indigo-600 font-semibold mb-1 text-sm">
                    {member.designation}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{member.role}</p>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a
                      href={member.Contact.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center text-indigo-600 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fa-brands fa-facebook text-lg"></i>
                    </a>
                    <a
                      href={member.Contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center text-indigo-600 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fa-brands fa-whatsapp text-lg"></i>
                    </a>
                    <a
                      href={member.Contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center text-indigo-600 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fa-brands fa-github text-lg"></i>
                    </a>
                    <a
                      href={member.Contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center text-indigo-600 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                      <i className="fa-brands fa-linkedin text-lg"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="h-1 bg-gradient-to-r from-indigo-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Tech Stack
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies to ensure performance, scalability,
              and reliability
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">⚛️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Frontend</h3>
              <p className="text-gray-600 mb-4">
                React.js, Tailwind CSS, React Router
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
                  React
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                  Tailwind
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm font-medium">
                  Vite
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Backend</h3>
              <p className="text-gray-600 mb-4">
                Node.js, Express, RESTful APIs
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-sm font-medium">
                  Express
                </span>
                <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium">
                  REST API
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-3xl">🗄️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Database</h3>
              <p className="text-gray-600 mb-4">
                MongoDB, PostgreSQL, Redis Cache
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                  MongoDB
                </span>
                <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-sm font-medium">
                  PostgreSQL
                </span>
                <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-sm font-medium">
                  Redis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Process Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Development Process
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Planning</h3>
            <p className="text-gray-600 text-sm">
              Analyzing requirements and designing architecture
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-3xl">🎨</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Design</h3>
            <p className="text-gray-600 text-sm">
              Creating intuitive and beautiful interfaces
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-3xl">💻</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Development
            </h3>
            <p className="text-gray-600 text-sm">
              Building robust and scalable solutions
            </p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Deploy</h3>
            <p className="text-gray-600 text-sm">
              Testing and launching with confidence
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-12 text-center text-white shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-xl mb-8 text-indigo-50 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team and
            help us build the future of healthcare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:team@medx.com"
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 inline-block">
              Get In Touch
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all inline-block">
              View Our GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTeam;
