import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Signup from "./Pages/Forms/Signup";
import Login from "./Pages/Forms/Login";
import Doctors from "./Pages/Services/Doctors/Doctors";
import PopulerDoctors from "./Pages/Services/Doctors/PopulerDoctors";
import AskAI from "./Pages/AskAI/AskAI";
import DoctorDetails from "./Pages/Services/Doctors/DoctorDetails";
import SearchDoctors from "./Pages/Services/Doctors/SearchDoctors";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Dashboard from "./Pages/Dashboard/Dashboard";
import RequireAuth from "./Components/Requir/RequireAuth";
import RefreshToken from "./Components/Requir/RefreshToken";
import DoctorsDashboard from "./Pages/Dashboard/Doctors/DDoctors";
import AddDoctor from "./Pages/Dashboard/Doctors/DAddDoctor";
import PharmaciesDashboard from "./Pages/Dashboard/Pharmacies/DPharmacies";
import AddPharmacy from "./Pages/Dashboard/Pharmacies/DAddPharmacy";
import LaboratoriesDashboard from "./Pages/Dashboard/LaboratorIes/DLaboratories";
import AddLaboratory from "./Pages/Dashboard/LaboratorIes/DAddLaboratory";
import ReservationsDashboard from "./Pages/Dashboard/Reservations/DReservations";
import DeveloperTeam from "./Pages/About/Team/Team";
import AddRadiology from "./Pages/Dashboard/Radiology/DAddRadiology";
import RadiologiesDashboard from "./Pages/Dashboard/Radiology/DRadiologies";
import Services from "./Pages/Services/Services";
import Laboratories from "./Pages/Services/Laboratory/Laboratories";
import LaboratoryDetails from "./Pages/Services/Laboratory/LaboratoryDetails";
import Radiologies from "./Pages/Services/Radiologies/Radiologies";
import RadiologyDetails from "./Pages/Services/Radiologies/RadiologyDetails";
import Pharmacies from "./Pages/Services/Pharmacies/Pharmacies";
import PharmacyDetails from "./Pages/Services/Pharmacies/PharmacyDetails";
import About from "./Pages/About/About";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Your route components go here */}
      <Route element={<RefreshToken />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />}>
          <Route path="" element={<PopulerDoctors />} />
          <Route path="search/:filters" element={<SearchDoctors />} />
        </Route>
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* doctors routes */}
            <Route path="doctors" element={<DoctorsDashboard />} />
            <Route path="add-doctor" element={<AddDoctor />} />
            {/* pharmacy routes */}
            <Route path="pharmacies" element={<PharmaciesDashboard />} />
            <Route path="add-pharmacy" element={<AddPharmacy />} />
            {/* laboratory routes */}
            <Route path="laboratories" element={<LaboratoriesDashboard />} />
            <Route path="add-laboratory" element={<AddLaboratory />} />
            {/* radiology routes */}
            <Route path="radiology" element={<RadiologiesDashboard />} />
            <Route path="add-radiology" element={<AddRadiology />} />
            {/* reservation routes */}
            <Route path="reservations" element={<ReservationsDashboard />} />
          </Route>
        </Route>
      </Route>
      <Route path="/services" element={<Services />} />
      <Route path="/services/search/Laboratories" element={<Laboratories />} />
      <Route path="laboratories/:id" element={<LaboratoryDetails />} />
      <Route path="/services/search/radiologies" element={<Radiologies />} />
      <Route path="radiologies/:id" element={<RadiologyDetails />} />
      <Route path="/services/search/pharmacies" element={<Pharmacies />} />
          <Route path="pharmacies/:id" element={<PharmacyDetails />} />
          
      <Route path="/about/search/team" element={<DeveloperTeam />} />
      <Route path="/about" element={<About />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};
export default AppRoutes;
