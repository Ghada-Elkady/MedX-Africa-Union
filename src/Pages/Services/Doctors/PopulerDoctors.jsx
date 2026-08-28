import { Link, useOutletContext } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import doctor_1 from "../../../assets/Home/doctors/doctor-1.webp";
import ElementBox from "../../../Components/Element/ElementBox";
import PlaceholderCard from "../../../Components/Element/PlaceholderCard";

const PopulerDoctors = () => {
  let [doctors] = useOutletContext();

  return (
    <>
      <div className="populer-doctors bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto pt-20 px-5 overflow-hidden">
          <div className="title bg-white p-5 shadow-lg rounded-3xl mb-10">
            <h2
              className="text-3xl font-bold"
              style={{
                textShadow: "0 15px 10px currentColor, 0 0 20px currentColor",
              }}>
              <i className="fa-solid fa-user-doctor mr-2"></i>Popular Doctors
            </h2>
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
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            className="mySwiper flex">
            {doctors.length === 0 ? (
              <>
                <SwiperSlide>
                  <PlaceholderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PlaceholderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PlaceholderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PlaceholderCard />
                </SwiperSlide>
                <SwiperSlide>
                  <PlaceholderCard />
                </SwiperSlide>
              </>
            ) : null}
            {doctors.slice(0, 10).map((doctor) => (
              <SwiperSlide key={doctor.id}>
                <ElementBox
                  id={doctor.id}
                  name={doctor.name.toLowerCase()}
                  specialties={doctor.specialties}
                  location={
                    doctor.address.city.toLowerCase() +
                    ", " +
                    doctor.address.country.toLowerCase()
                  }
                  image={doctor_1}
                  link={
                    "/doctor/" +
                    doctor.id +
                    "?name=" +
                    doctor.name.toLowerCase() +
                    "&specialties=" +
                    doctor.specialties.join(", ") +
                    "&location=" +
                    doctor.address.city.toLowerCase() +
                    ", " +
                    doctor.address.country.toLowerCase()
                  }
                  icon="👨‍⚕️"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="other-doctors container mx-auto mb-20 p-5">
          <div className="title bg-white p-5 shadow-lg rounded-3xl mb-10">
            <h2
              className="text-3xl font-bold"
              style={{
                textShadow: "0 15px 10px currentColor, 0 0 20px currentColor",
              }}>
              <i className="fa-solid fa-user-doctor mr-2"></i>Other Doctors
            </h2>
          </div>
          <div className="doctors grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {doctors.length === 0 ? (
              <>
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
                <PlaceholderCard />
              </>
            ) : null}
            {doctors.map((doctor) => (
              <ElementBox
                id={doctor.id}
                name={doctor.name.toLowerCase()}
                specialties={doctor.specialties}
                location={
                  doctor.address.city.toLowerCase() +
                  ", " +
                  doctor.address.country.toLowerCase()
                }
                image={doctor_1}
                link={
                  "/doctor/" +
                  doctor.id +
                  "?name=" +
                  doctor.name.toLowerCase() +
                  "&specialties=" +
                  doctor.specialties.join(", ") +
                  "&location=" +
                  doctor.address.city.toLowerCase() +
                  ", " +
                  doctor.address.country.toLowerCase()
                }
                icon="👨‍⚕️"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default PopulerDoctors;
