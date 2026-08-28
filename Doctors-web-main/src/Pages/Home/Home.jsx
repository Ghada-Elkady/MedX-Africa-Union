import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "../PagesStyle.css";
import "../../Components/Buttons/Swiper-Button-Style/Swiper-Buttons-Style.css";
import landingImage from "../../assets/Home/landing.png";
import googlePlayIcon from "../../assets/Home/icons8-google-play-store-96.png";
import appStoreIcon from "../../assets/Home/icons8-ios-100.png";
import doctors from "../../assets/Home/doctors/doctor-nurse-special-equipment.jpg";
import doctor_1 from "../../assets/Home/doctors/doctor-1.webp";
import doctor_2 from "../../assets/Home/doctors/woman-nurse-doxcbox.png";
import mobileApp from "../../assets/Home/FuturHealth-Review-4.jpg";
const Home = () => {
  return (
    <div className="home-page">
      <section className="landing min-h-screen h-full main-bg relative overflow-hidden z-0 pt-20 pb-10 flex items-end justify-center px-5">
        <div className="container mx-auto h-full flex items-center justify-between gap-10 flex-col-reverse lg:flex-row">
          <div className="left-side h-full flex flex-col justify-end items-center lg:items-start text-center lg:text-left gap-6 w-full lg:w-lg">
            <h1 className="text-4xl font-bold md:text-5xl ">
              Wellcare Nuturing Health, Inspiring Life
            </h1>
            <p className="text-lg text-gray-500">
              Empowering wellness through comprehensive care Discover the
              journey to vibrant health and an inspired life with wellcare
              health.
            </p>
            <div className="buttons flex gap-5 w-full md:flex-nowrap flex-wrap">
              <button
                className="neu-button min-w-[200px] w-full"
                style={{ border: "none" }}>
                Book Appointment
              </button>
              <button
                className="emp-button bg-white  min-w-[200px] w-full"
                style={{ border: "none" }}>
                Contact Us <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
            <div className="patients-records mt-5">
              <div className="images">
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Patient 1"
                  className="-ml-6 border-4 border-white rounded-full w-12 h-12 object-cover inline-block"
                />
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Patient 2"
                  className="-ml-6 border-4 border-white rounded-full w-12 h-12 object-cover inline-block"
                />
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Patient 3"
                  className="-ml-6 border-4 border-white rounded-full w-12 h-12 object-cover inline-block"
                />
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Patient 4"
                  className="-ml-6 border-4 border-white rounded-full w-12 h-12 object-cover inline-block"
                />
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Patient 5"
                  className="-ml-6 border-4 border-white rounded-full w-12 h-12 object-cover inline-block"
                />
              </div>

              <p className="font-semibold text-lg">150K Happy Patients</p>
            </div>
            <div className="info-of-website flex gap-10 mt-5">
              <div className="experts mr-10">
                <h2 className="text-4xl font-bold block">250+</h2>
                <p className="font-semibold text-lg"> Expert Doctors</p>
              </div>
              <div className="patients">
                <h2 className="text-4xl font-bold block">10+</h2>
                <p className="font-semibold text-lg">Operation Specialist</p>
              </div>
            </div>
          </div>
          <div className="right-side relative lg:absolute bottom-0 right-0 md:block w-full md:w-auto h-auto -z-10 ">
            <div className="img">
              <img
                src={landingImage}
                alt=""
                className=" lg:h-[calc(100vh-100px)] object-cover mix-blend-darken mx-auto"
              />
            </div>
            <div className="best-doctor">
              <div className="content bg-white rounded-2xl shadow-lg py-3 px-5 flex items-center gap-4 w-fit absolute top-1/2 -left-15 transform ml-5">
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Best Doctor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text">
                  <h3 className="font-bold text-sm">120+</h3>
                  <h3 className="font-semibold text-sm text-gray-500">
                    Best Doctor
                  </h3>
                </div>
              </div>
              <div className="content bg-white rounded-2xl shadow-lg py-3 px-5 md:flex items-center gap-4 hidden  w-fit absolute bottom-5 right-1/4 transform ml-5">
                <img
                  src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                  alt="Best Doctor"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text">
                  <h3 className="font-bold text-sm">jone Doe</h3>
                  <h3 className="font-semibold text-sm text-gray-500">
                    Specialist Nurse
                  </h3>
                </div>
                <div className="addtional-info ">
                  <h3 className="font-bold text-sm text-end mb-1.5">good</h3>
                  <h3 className="font-semibold text-sm border px-5 rounded-2xl">
                    5k Patients
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="additional-info py-20">
        <div className="container mx-auto flex flex-col items-center text-center px-5 md:flex-row md:items-center md:text-left md:justify-between gap-10">
          <h2 className="text-4xl font-bold mb-5 w-full md:w-1/2 text-center">
            We provide a wide range of medical services
          </h2>
          <p className="text-lg text-gray-600 w-full md:w-1/2">
            We treat you like family, providing compassionate and comprehensive
            healthcare services tailored to your individual needs.
          </p>
        </div>
      </section>
      <section className="sections">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="section-item bg-blue-50 p-10 rounded-xl text-center flex flex-col items-center gap-5">
              <i className="fa-solid fa-hospital-user text-5xl text-blue-500"></i>
              <h3 className="text-2xl font-bold">Quality Care</h3>
              <p className="text-gray-500">
                We are committed to providing the highest quality care to our
                patients, ensuring their health and well-being.
              </p>
            </div>
            <div className="section-item bg-blue-50 p-10 rounded-xl text-center flex flex-col items-center gap-5">
              <i className="fa-solid fa-user-doctor text-5xl text-blue-500"></i>
              <h3 className="text-2xl font-bold">Expert Doctors</h3>
              <p className="text-gray-500">
                Our team of experienced doctors is dedicated to providing
                compassionate and personalized care to our patients.
              </p>
            </div>
            <div className="section-item bg-blue-50 p-10 rounded-xl text-center flex flex-col items-center gap-5">
              <i className="fa-solid fa-briefcase-medical text-5xl text-blue-500"></i>
              <h3 className="text-2xl font-bold">Advanced Technology</h3>
              <p className="text-gray-500">
                We utilize the latest medical technology and equipment to ensure
                accurate diagnoses and effective treatments for our patients.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="preparing-your-future py-20">
        <div className="container mx-auto flex flex-col items-center text-center px-5 md:flex-row md:items-center md:text-left md:justify-between gap-10">
          <div className="image w-full md:w-2/3 relative">
            <img
              src={doctors}
              alt="Preparing for your future"
              className="w-full h-[500px] object-cover rounded-xl shadow-lg"
            />
            <div className="content bg-white rounded-2xl shadow-lg py-3 px-5 flex items-center gap-4  w-fit absolute bottom-5 -left-10 md:left-10 transform ml-5">
              <img
                src="https://i.ibb.co/0j3y2vY/doctor-1.webp"
                alt="Best Doctor"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="text">
                <h3 className="font-bold text-sm">jone Doe</h3>
                <h3 className="font-semibold text-sm text-gray-500">
                  Specialist Nurse
                </h3>
              </div>
              <div className="addtional-info ">
                <h3 className="font-bold text-sm text-end mb-1.5">good</h3>
                <h3 className="font-semibold text-sm border px-5 rounded-2xl">
                  5k Patients
                </h3>
              </div>
            </div>
          </div>
          <div className="text-content w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-5  md:h-[500px] justify-around bg-blue-50 p-10 rounded-xl">
            <h2 className="text-xl font-bold border px-5 py-3 rounded-2xl w-full md:w-2/3 text-center border-gray-400">
              Preparing your future
            </h2>
            <h2 className="text-4xl font-bold w-full md:w-2/3">
              Achieving Your Vision
            </h2>
            <p className="text-lg text-gray-400">
              Planning for retirement is essential to 5:41 your long-term
              financial well-being, At Finovote, our exporionced team
              collaborates with you to identity your retirement goals
            </p>
          </div>
        </div>
      </section>
      <section className="specialties">
        <div className="container mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="specialty-item bg-blue-50 p-10 rounded-xl flex flex-col items-center gap-5 justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300  min-h-[200px]">
              <div className="icon-and-title flex flex-col items-center gap-3  duration-300  mt-10">
                <i className="fa-solid fa-eye text-4xl text-blue-500"></i>
                <h2 className="text-2xl font-bold">Eye Care</h2>
              </div>
              <p className="text-gray-500 text-center  opacity-0 invisible  duration-300">
                Comprehensive eye exams and personalized care for all ages.
              </p>
            </div>
            <div className="specialty-item bg-blue-50 p-10 rounded-xl flex flex-col items-center gap-5 justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300  min-h-[200px]">
              <div className="icon-and-title flex flex-col items-center gap-3  duration-300  mt-10">
                <i className="fa-solid fa-heart-pulse text-4xl text-blue-500"></i>
                <h2 className="text-2xl font-bold">Cardiology</h2>
              </div>
              <p className="text-gray-500 text-center  opacity-0 invisible  duration-300">
                Expert diagnosis and treatment for heart-related conditions.
              </p>
            </div>
            <div className="specialty-item bg-blue-50 p-10 rounded-xl flex flex-col items-center justify-center gap-5 hover:shadow-lg hover:scale-105 transition-transform duration-300 min-h-[200px]">
              <div className="icon-and-title flex flex-col items-center gap-3  duration-300 mt-10">
                <i className="fa-solid fa-brain text-4xl text-blue-500"></i>
                <h2 className="text-2xl font-bold">Neurology</h2>
              </div>
              <p className="text-gray-500 text-center opacity-0 collapse duration-300">
                Comprehensive care for neurological disorders and conditions.
              </p>
            </div>
          </div>
          <div className="button">
            <button
              className="mt-10 ml-auto mr-5 block underline duration-300 text-lg font-semibold text-blue-700 hover:text-red-600"
              style={{ border: "none" }}>
              Explore More <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>
      <section className="doctors py-20">
        <div className="container mx-auto px-5 overflow-x-hidden">
          <div className="title">
            <h2 className="text-5xl font-bold text-center mb-4">
              Highly Qualified Team
            </h2>
            <p className="text-center text-gray-500 max-w-lg mx-auto">
              Meet our highly qualified doctors and nurses, who are dedicated to
              providing exceptional care to our patients.
            </p>
          </div>

          <Swiper
            slidesPerView={3}
            spaceBetween={20}
            initialSlide={0}
            modules={[Navigation]}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="mySwiper flex gap-5 mt-10">
            <SwiperSlide className="slideContent">
              <div className="doctor-item p-5 bg-blue-50 rounded-xl text-center flex flex-col items-center gap-5 overflow-hidden">
                <img
                  src={doctor_1}
                  alt="Doctor 1"
                  className="w-full object-cover"
                />
                <div className="info flex lg:items-start items-center gap-3 bg-white p-5 rounded-xl shadow-lg -mt-10 w-full justify-between">
                  <div className="text">
                    <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                    <p className="text-gray-400">Cardiologist</p>
                  </div>
                  <div className="contacts flex justify-center flex-row gap-0">
                    <Link
                      to="#"
                      className="bg-green-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-green-500 text-xl hover:bg-green-600 transition-all duration-300">
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-yellow-500 text-xl hover:bg-yellow-600 transition-all duration-300">
                      <i className="fa-solid fa-business-time"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slideContent  min-w-[250px]">
              <div className="doctor-item p-5 bg-blue-50 rounded-xl text-center flex flex-col items-center gap-5 overflow-hidden">
                <img
                  src={doctor_1}
                  alt="Doctor 1"
                  className="w-full object-cover"
                />
                <div className="info flex lg:items-start items-center gap-3 bg-white p-5 rounded-xl shadow-lg -mt-10 w-full justify-between">
                  <div className="text">
                    <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                    <p className="text-gray-400">Cardiologist</p>
                  </div>
                  <div className="contacts flex justify-center flex-row gap-0">
                    <Link
                      to="#"
                      className="bg-green-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-green-500 text-xl hover:bg-green-600 transition-all duration-300">
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-yellow-500 text-xl hover:bg-yellow-600 transition-all duration-300">
                      <i className="fa-solid fa-business-time"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slideContent  min-w-[250px]">
              <div className="doctor-item p-5 bg-blue-50 rounded-xl text-center flex flex-col items-center gap-5 overflow-hidden">
                <img
                  src={doctor_1}
                  alt="Doctor 1"
                  className="w-full object-cover"
                />
                <div className="info flex lg:items-start items-center gap-3 bg-white p-5 rounded-xl shadow-lg -mt-10 w-full justify-between">
                  <div className="text">
                    <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                    <p className="text-gray-400">Cardiologist</p>
                  </div>
                  <div className="contacts flex justify-center flex-row gap-0">
                    <Link
                      to="#"
                      className="bg-green-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-green-500 text-xl hover:bg-green-600 transition-all duration-300">
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-yellow-500 text-xl hover:bg-yellow-600 transition-all duration-300">
                      <i className="fa-solid fa-business-time"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slideContent  min-w-[250px]">
              <div className="doctor-item p-5 bg-blue-50 rounded-xl text-center flex flex-col items-center gap-5 overflow-hidden">
                <img
                  src={doctor_1}
                  alt="Doctor 1"
                  className="w-full object-cover"
                />
                <div className="info flex lg:items-start items-center gap-3 bg-white p-5 rounded-xl shadow-lg -mt-10 w-full justify-between">
                  <div className="text">
                    <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                    <p className="text-gray-400">Cardiologist</p>
                  </div>
                  <div className="contacts flex justify-center flex-row gap-0">
                    <Link
                      to="#"
                      className="bg-green-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-green-500 text-xl hover:bg-green-600 transition-all duration-300">
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-yellow-500 text-xl hover:bg-yellow-600 transition-all duration-300">
                      <i className="fa-solid fa-business-time"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slideContent  min-w-[250px]">
              <div className="doctor-item p-5 bg-blue-50 rounded-xl text-center flex flex-col items-center gap-5 overflow-hidden">
                <img
                  src={doctor_1}
                  alt="Doctor 1"
                  className="w-full object-cover"
                />
                <div className="info flex lg:items-start items-center gap-3 bg-white p-5 rounded-xl shadow-lg -mt-10 w-full justify-between">
                  <div className="text">
                    <h3 className="text-lg font-semibold">Dr. John Smith</h3>
                    <p className="text-gray-400">Cardiologist</p>
                  </div>
                  <div className="contacts flex justify-center flex-row gap-0">
                    <Link
                      to="#"
                      className="bg-green-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-green-500 text-xl hover:bg-green-600 transition-all duration-300">
                      <i className="fa-solid fa-phone"></i>
                    </Link>
                    <Link
                      to="#"
                      className="bg-yellow-50 mr-3 p-3 w-13 h-13 flex justify-center items-center rounded-full text-yellow-500 text-xl hover:bg-yellow-600 transition-all duration-300">
                      <i className="fa-solid fa-business-time"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
      <section className="info-about-staffs main-bg mb-20">
        <div className="container mx-auto px-5 flex flex-col md:flex-row gap-10">
          <div className="text-content w-full md:w-1/2 text-center md:text-left py-20">
            <h2 className="text-3xl font-semibold mb-3">Modern Instrument</h2>
            <p className="text-gray-400 mb-10">
              Embrace the joy of a radiant smilel Our artistic leam crafts
              dazzling grins with cutting-edge care ...
            </p>
            <h2 className="text-3xl font-semibold mb-3">Easy Billing System</h2>
            <p className="text-gray-400 mb-10">
              Embrace the joy of a radiant smilel Our arlistic leam crafts
              dazzling grins wilh and comprehensive healthcare services tailored
              to cutting edge care.
            </p>
            <h2 className="text-3xl font-semibold mb-3">
              Qualified Nurses & Staff
            </h2>
            <p className="text-gray-400">
              Embrace lhe jay of a radiont smile! Our artistic team crafts
              dazzling grins with cutting edge core ...
            </p>
          </div>
          <div className="image w-full md:w-1/2 relative">
            <img
              src={doctor_2}
              alt="About Our Staffs"
              className=" h-full object-cover mx-auto"
            />
            <div className="overlay absolute bottom-5 right-0 bg-white flex items-center justify-between rounded-xl p-5">
              <div className="experts mr-10  flex items-start gap-2">
                <i className="fa-solid fa-heart-pulse text-3xl text-blue-500"></i>
                <div className="text">
                  <h2 className="text-3xl font-semibold block">250+</h2>
                  <p className="font-semibold text-md text-gray-400">
                    {" "}
                    Expert Doctors
                  </p>
                </div>
              </div>
              <div className="patients flex items-start gap-2">
                <i className="fa-solid fa-smile text-3xl text-blue-500"></i>
                <div className="text">
                  <h2 className="text-3xl font-semibold block">90%</h2>
                  <p className="font-semibold text-md text-gray-400">
                    Operation Specialist
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="app-info">
        <div className="container mx-auto px-5 py-20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-5 lg:gap-10">
          <div className="image w-full md:w-1/2">
            <img
              src={mobileApp}
              alt="Mobile App"
              className="w-full h-auto object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="text-content w-full md:w-1/2">
            <h2 className="text-4xl lg:text-5xl text-center md:text-left font-bold mb-10 md:mb-5 lg:mb-10">
              Treatment is Easy with Medifye
            </h2>
            <p className="text-lg text-gray-600 mb-10 md:mb-5 lg:mb-20 text-center md:text-left">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, Nunc eget
              libero velit. Duis lacinia nisl odio, sit amet commodo massa
              tempor De. Charollette Baker pellentesque.
            </p>
            <div className="buttons flex gap-5 w-full lg:flex-nowrap flex-wrap">
              <button
                className="neu-button bg-white  min-w-[200px] w-3/4 items-center justify-center gap-3 text-2xl "
                style={{ display: "flex" }}>
                {" "}
                <img src={appStoreIcon} alt="" className="w-10 h-10" />
                App Store
              </button>
              <button
                className="neu-button min-w-[200px] w-3/4  items-center justify-center gap-3 text-2xl "
                style={{ display: "flex" }}>
                {" "}
                <img src={googlePlayIcon} alt="" className="w-10 h-10" />
                Google Play
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
