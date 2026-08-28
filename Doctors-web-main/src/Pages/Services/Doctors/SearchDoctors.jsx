import { useLocation, useOutletContext } from "react-router-dom";
import doctor_1 from "../../../assets/Home/doctors/doctor-1.webp";
import ElementBox from "../../../Components/Element/ElementBox";
import PlaceholderCard from "../../../Components/Element/PlaceholderCard";

const SearchDoctors = () => {
  const [doctors] = useOutletContext();
  const location = useLocation();
  console.log(
    location.pathname.split("/").pop().replaceAll("%20", " ").split("&"),
  );
  const filterChosen = {
    specialties:
      location.pathname.split("/").pop().replaceAll("%20", " ").split("&")[0] ||
      "",
    city:
      location.pathname.split("/").pop().replaceAll("%20", " ").split("&")[1] ||
      "",
    country:
      location.pathname.split("/").pop().replaceAll("%20", " ").split("&")[2] ||
      "",
    doctorName:
      location.pathname.split("/").pop().replaceAll("%20", " ").split("&")[3] ||
      "",
  };
  console.log(filterChosen);
  const filteredDoctors = doctors.filter((doctor) => {
    // If no filter is chosen, return all doctors
    if (
      !filterChosen ||
      (!filterChosen.specialties && !filterChosen.city && !filterChosen.country)
    ) {
      return true;
    }

    // Filter by specialty
    if (filterChosen.specialties) {
      const hasSpecialty = doctor.specialties
        .map((s) => s.toLowerCase())
        .includes(filterChosen.specialties.toLowerCase());
      if (!hasSpecialty) return false;
    }

    // // Filter by city
    // if (filterChosen.city) {
    //     if (doctor.address.city.toLowerCase() !== filterChosen.city.toLowerCase()) {
    //         return false;
    //     }
    // }

    // // Filter by country
    // if (filterChosen.country) {
    //     if (doctor.address.country.toLowerCase() !== filterChosen.country.toLowerCase()) {
    //         return false;
    //     }
    // }

    return true;
  });
  console.log(filteredDoctors);
  return (
    <div className="search-doctors-page container mx-auto mb-20 p-5 pt-20">
      <div className="doctors grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredDoctors.length === 0 ? (
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
          </>
        ) : null}
        {filteredDoctors.map((doctor) => (
          <ElementBox
            key={doctor.id}
            id={doctor.id}
            name={doctor.name.toLowerCase()}
            specialty={doctor.specialties
              .map((s) => s.toLowerCase())
              .join(", ")}
            location={`${doctor.address.city.toLowerCase()}, ${doctor.address.country.toLowerCase()}`}
            img={doctor_1}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchDoctors;
