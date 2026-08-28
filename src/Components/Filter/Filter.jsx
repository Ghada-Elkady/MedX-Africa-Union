import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import '../Buttons/Swiper-Button-Style/Swiper-Buttons-Style.css'
import { useState, useRef, use } from 'react';
import searchIcon from "../../assets/Filter/icons8-search-64.png"
import filtersOptions from './FiltersOptions';
import locationImg from "../../assets/Filter/icons8-location-64.png";
import { useNavigate } from 'react-router-dom';


const Filter = ({setCurrentPage}) => {
    const nav = useNavigate();
    // filter for desktop and tablet screen
    const [filterIsOpen, setFilterIsOpen] = useState(null);
    // filter for mobile screen 
    const [openFilterMobile, setOpenFilterMobile] = useState(null);
    // active filter for mobile screen
    const [activeFilterMobile, setActiveFilterMobile] = useState(false);
    // active filter for desktop and tablet screen 
    const [activeFilter, setActiveFilter] = useState({
        speciality: false,
        location: false,
        area: false

    });
    // filter inputs references
    const specialtiesInputRef = useRef(null);
    const citiesInputRef = useRef(null);
    const areaInputRef = useRef(null);
    // filter options titles
    const filtersTitles = [
        {
            title: "Specialties",
            icon: "fa-solid fa-user-doctor",
            about: "Search by speciality",
            ref: specialtiesInputRef

        },
        {
            title: "Cities",
            icon: "fa-solid fa-location-dot",
            about: "Search by city",
            ref: citiesInputRef

        }, {
            title: "Area",
            icon: "fa-solid fa-location-dot",
            about: "Search by area",
            ref: areaInputRef
        }
    ];

    // get filter data from local storage
    const data = JSON.parse(localStorage.getItem('filterChosen'));
    const [filterChosen, setFilterChosen] = useState({
        specialties: data ? data.specialties : filtersTitles[0].title,
        cities: data ? data.cities : filtersTitles[1].title,
        area: data ? data.area : filtersTitles[2].title,
        doctorName: data ? data.doctorName : null
    });
    // handle filter click on mobile screen
    const handleFilterClick = (filter, option) => {
        setFilterChosen({
            ...filterChosen,
            [filter]: option
        });
        // go to next input after click on filter option
        const currentIndex = filtersTitles.findIndex(f => f.title.toLowerCase() === filter);
        if (currentIndex !== -1 && currentIndex < filtersTitles.length - 1) {
            const nextInput = filtersTitles[currentIndex + 1].ref;
            setTimeout(() => {
                nextInput?.current?.focus();
                console.log(filter)
                setOpenFilterMobile(filtersTitles[currentIndex + 1].title.toLowerCase());
            }, 100);
        } else {
            setActiveFilterMobile(false);
            localStorage.setItem('filterChosen', JSON.stringify(filterChosen));
            setCurrentPage(1);
            nav(`search/${filterChosen.specialties}&${filterChosen.cities}&${filterChosen.area}&${filterChosen.doctorName || ""}`);
        }
    }
    // split array into chunks
    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };
    // open filter for desktop and tablet screen
    function HandleToOpenFilter({ filter }) {
        const [currentPage, setCurrentPage] = useState(1);
        let optionsChunks = [];
        let city = filterChosen.cities;
        // check city exists in filtersOptions or not
        if (filter === "area") {
            const cityArea = ["cairo", "giza", "alexandria", "beheira", "dakahlia", "menoufia", "sharqia", "faiyum", "gharbia", "Qalyubia", "all governorates"]
            if (city === null || cityArea.includes(city.toLowerCase()) === false) {
                city = "cairo"
            }
            console.log(city, filtersOptions["areas"][city.toLowerCase()]);

            optionsChunks = chunkArray(filtersOptions["areas"][city.toLowerCase()], 16);

        } else {
            optionsChunks = chunkArray(filtersOptions[filter], 16);
        }

        return (
            <>
                {/* filter options on tablet and desktop screen*/}
                <p className="text-gray-400 text-sm mb-5 text-center capitalize">Select {filter}</p>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={100}
                    initialSlide={0}
                    modules={[Navigation]}
                    navigation={true}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 30 },
                        640: { slidesPerView: 1 },
                        1024: { slidesPerView: 1 },
                    }}
                    onSlideChangeTransitionEnd={(swiper) => setCurrentPage(swiper.activeIndex + 1)}
                    className="mySwiper flex gap-5 h-[400px] w-full"
                    style={{ padding: "0px 50px 10px", zIndex: 1 }}
                >
                    {optionsChunks && optionsChunks.map((chunk, idx) => (
                        <SwiperSlide key={idx} className="slideContent">
                            <ul className="list text-gray-500 flex flex-col flex-wrap h-full w-full">
                                {/* filter options on desktop and tablet screen */}
                                {chunk.map((option, i) => (
                                    <li
                                        key={i}
                                        className="text-blue-600 text-lg cursor-pointer hover:bg-gray-100 duration-300 p-2 w-1/2 overflow-hidden whitespace-nowrap text-ellipsis"
                                        onClick={() => {
                                            handleFilterClick(filter, option.en);
                                            setActiveFilter({
                                                ...activeFilter,
                                                [filter]: false
                                            });
                                            setFilterIsOpen(null);
                                        }
                                        }
                                    >
                                        {option.en}
                                    </li>
                                ))}
                            </ul>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <p className="text-gray-400 text-sm text-right mb-3 mr-3">
                    {currentPage}/{optionsChunks.length === 0 ? 1 : optionsChunks.length} Pages
                </p>
            </>
        );
    }

    // open filter for desktop and tablet screen
    const openFilter = (title) => {
        setFilterIsOpen(title.toLowerCase())

    };

    //show list of filter for mobile screen when click on edite button 
    function HandleListMobileMedia({ filter }) {
        let options = [];
        let city = filterChosen.cities;
        console.log(city)
        if (filter === "area") {
            const cityArea = ["cairo", "giza", "alexandria", "beheira", "dakahlia", "menoufia", "sharqia", "faiyum", "gharbia", "Qalyubia", "all governorates"]
            if (city === null || cityArea.includes(city.toLowerCase()) === false) {
                city = "cairo"
            }
            options = filtersOptions["areas"][city.toLowerCase()];
        } else {
            options = filtersOptions[filter];
        }

        console.log(filter)
        return (
            <ul className="list text-gray-500 flex flex-col flex-wrap">
                {options.filter((option) => option.en.toLowerCase().includes(filterChosen[filter]?.toLowerCase()) || filterChosen[filter] === null)
                    .map((option, i) => (
                        <li
                            key={i}
                            className="text-blue-600 text-lg cursor-pointer flex items-center hover:bg-gray-100 duration-300 p-2 w-full border-b border-gray-200"
                            onClick={() => {
                                handleFilterClick(filter, option.en);
                                setActiveFilter({
                                    ...activeFilter,
                                    [filter]: false
                                });
                                setFilterIsOpen(null);
                                setOpenFilterMobile(null);
                            }
                            }
                        >
                            <img src={filter !== "specialties" ? locationImg : option.img} className="w-10 h-10 mr-3 object-contain p-1.5 rounded-lg bg-blue-100" alt="" />
                            {option.en}
                        </li>
                    ))}
            </ul>
        );
    }
    function handleSearch() {
        localStorage.setItem('filterChosen', JSON.stringify(filterChosen));
        setCurrentPage(1);
        nav(`search/${filterChosen.specialties}&${filterChosen.cities}&${filterChosen.area}&${filterChosen.doctorName || ""}`);
    }

    return (
        <>
            {/* filter for desktop and tablet screen */}
            <div className="filters hidden md:block">
                <div className="selection flex relative rounded-3xl border border-gray-300 pl-2 m-2 lg:m-5 ">
                    {/* map filters titles */}
                    {filtersTitles.map((filter, idx) => (
                        <div
                            key={idx}
                            className="filter-title flex items-center gap-5 justify-between border-r-2 border-gray-300 p-3  w-1/5 cursor-pointer"
                            onClick={() => {
                                openFilter(filter.title);
                                setActiveFilter({
                                    [filter.title.toLowerCase()]: !activeFilter[filter.title.toLowerCase()],
                                });
                            }}
                        >
                            <div className="title min-w-0">
                                <p className="text-gray-400 text-xs lg:text-sm mb-2 overflow-hidden whitespace-nowrap text-ellipsis ">{filter.about}</p>
                                <h3 className="text-sm lg:text-lg text-blue-600 flex items-center w-full overflow-hidden">
                                    <i className={`${filter.icon} mr-2 `}></i>
                                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">
                                        {filterChosen[filter.title.toLowerCase()] || filter.title}
                                    </span>
                                </h3>
                            </div>
                            <i
                                className={`fa-solid fa-angle-${activeFilter[filter.title.toLowerCase()] ? "up" : "down"
                                    } text-sm lg:text-lg text-gray-500 `}
                            ></i>
                        </div>

                    ))
                    }
                    <div className="filter-title  border-gray-300 p-3 w-1/5 cursor-pointer">
                        <p className="text-gray-400 text-xs lg:text-sm mb-2 overflow-hidden whitespace-nowrap text-ellipsis">Search by Name</p>
                        <h3 className=" text-sm lg:text-md text-blue-600 flex items-center "><i className="fa-solid fa-user mr-2 text-sm lg:text-lg"></i><input className="placeholder:text-blue-600 text-sm lg:text-lg outline-none border-none focus:placeholder:opacity-0 w-full" type="text" placeholder='Doctor Name'
                            onChange={(e) => setFilterChosen({ ...filterChosen, doctorName: e.target.value })}
                            value={filterChosen.doctorName || ""}
                        /></h3>
                    </div>
                    <button className="bg-red-600 text-white flex items-center p-2 lg:p-5 rounded-r-3xl text-xl lg:text-2xl  w-1/5 cursor-pointer hover:bg-red-700 duration-300" onClick={handleSearch}><img src={searchIcon} alt="search icon" className="lg:w-10 lg:h-10 w-8 h-8" /> Search</button>
                    {/* menu for desktop and tablet screen*/}
                    <div className={`menu bg-white shadow-2xl p-3 rounded-2xl overflow-hidden z-10 w-[650px] h-[480px] absolute top-full right-auto ${activeFilter[filterIsOpen] ? "block" : "hidden"}`}>

                        {filterIsOpen && <HandleToOpenFilter filter={filterIsOpen} />}

                    </div>
                </div>
            </div>
            {/* filter for mobile screen */}
            <div className="fiters md:hidden">
                <div className="search flex items-center p-5 w-full shadow-2xl rounded-3xl cursor-pointer" onClick={() => { setActiveFilterMobile(true); setOpenFilterMobile("specialties") }}>
                    <img src={searchIcon} className="w-10 h-10 mr-3" alt=" search icon" />
                    <div className="info">
                        <h1 className="text-xl font-semibold text-blue-600">{filterChosen.specialties || "Specialties"}</h1>
                        <p className="text-gray-400 text-sm">{filterChosen.cities || "Choose City"},{filterChosen.area || "Choose Area"}</p>
                    </div>
                    <button className=" text-blue-400  text-lg ml-auto font-semibold hover:text-blue-200 duration-300">Edite</button>
                </div>
                <div className={`selectionListInMobile_media fixed ${activeFilterMobile ? "top-0" : "-top-full"} left-0 w-full h-screen bg-white z-50 overflow-y-scroll duration-500`} >
                    <div className="closeList flex items-center justify-between p-5 mb-3 bg-blue-600 text-white text-2xl font-semibold">
                        <h3 className='w-full text-center'>Search</h3>
                        <i className="fa-solid fa-xmark text-2xl cursor-pointer" onClick={() => setActiveFilterMobile(false)}></i>
                    </div>
                    <div className="searchInputs">
                        {filtersTitles.map((filter, idx) => (

                            <input
                                key={idx}
                                ref={filter.ref}
                                type="text"
                                className="w-full border-2 outline-none border-gray-300 text-lg px-5 py-2 mb-3 rounded-2xl bg-blue-50 focus:border-blue-500 focus:shadow-blue focus:placeholder:opacity-0 duration-300 placeholder:duration-300"
                                placeholder={filter.about}
                                onChange={(e) => setFilterChosen({ ...filterChosen, [filter.title.toLowerCase()]: e.target.value })}
                                value={filterChosen[filter.title.toLowerCase()] || ""}
                                onClick={() => {
                                    setActiveFilter({ ...activeFilter, [filter.title.toLowerCase()]: true });
                                    setOpenFilterMobile(filter.title.toLowerCase())
                                }}
                            />
                        ))}
                        {openFilterMobile && <HandleListMobileMedia filter={openFilterMobile} />}
                    </div>

                </div>

            </div>
        </>
    )
}
export default Filter;