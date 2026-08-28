import '../../PagesStyle.css'
import Filter from "../../../Components/Filter/Filter";
import landingImg_2 from "../../../assets/Doctors/landing-img-2.png";
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PaginatedItems from '../../../Components/Pagination/pagination';

const Doctors = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);
    useEffect(() => {
        const HandleData = async () => {
            try {
                const response = await axios.get('https://doctorsapi.com/api/doctors', {
                    headers: {
                        'api-key': 'hk_mip354zdecc022a6f4303b8779ccb377a05e888272a9d52ac561bf419656c66994411d58' // استبدلها بمفتاحك الحقيقي
                    },
                    params: {
                        limit: 25,
                        page: currentPage
                    }
                });
                console.log(response.data);
                setDoctors(response.data.doctors);
            } catch (error) {
                console.error("Error setting document title:", error);
            }
        };
        HandleData();
    }, [currentPage]);
    console.log(currentPage)

    return (
      <div className="doctors-page">
        <div
          className="landing h-[50vh] md:h-[calc(100vh-50px)] flex flex-col justify-between"
          style={{
            backgroundImage: `url(${landingImg_2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}>
          <div className="title">
            <div className="container mx-auto px-5 pt-40 pb-20">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-50">
                Healthcare for a better life for you
              </h2>
              <p className="text-gray-200 text-xl mt-1">
                Book online or call{" "}
                <i className="fa-solid fa-phone text-red-500"></i>{" "}
                <span className=" font-semibold">123-456-789</span>
              </p>
            </div>
          </div>
          <div className="doctors-filter px-5 mb-20 ">
            <div className="container mx-auto rounded-3xl pb-1 bg-white shadow-md">
              <div className="title items-center justify-center mb-5 border-b-4 border-blue-500 p-5 hidden md:flex rounded-t-3xl overflow-hidden">
                <i className="fa-solid fa-business-time text-4xl text-blue-500 mr-3"></i>
                <div className="text">
                  <h1 className="text-xl font-semibold text-blue-600">
                    appointment with a doctor
                  </h1>
                  <p className="text-gray-400 text-sm">Check or procedure</p>
                </div>
              </div>
              <Filter setCurrentPage={setCurrentPage} />
            </div>
          </div>
          <a href="#element" className="hidden md:block text-center">
            <i className="fa-solid fa-arrow-down text-3xl text-white animate-bounce text-center cursor-pointer"></i>
          </a>
        </div>
        <div className="elements" id="element">
          <Outlet
            context={[doctors, setDoctors, currentPage, setCurrentPage]}
          />
          <PaginatedItems
            pageCount={10}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
};

export default Doctors;