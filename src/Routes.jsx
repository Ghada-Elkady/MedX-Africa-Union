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
import Pharmacies from "./Pages/Services/Pharmacies/Pharmacies";
import PharmacyDetails from "./Pages/Services/Pharmacies/PharmacyDetails";
import About from "./Pages/About/About";

// New Feature Imports
import ConsultationRoom from "./Pages/Consultation/ConsultationRoom";
import PrescriptionView from "./Pages/Prescriptions/PrescriptionView";
import ReportExplainer from "./Pages/ReportExplainer/ReportExplainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<RefreshToken />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctor/:id" element={<DoctorDetails />} />
        <Route path="/consultation/:id" element={<ConsultationRoom />} />
        <Route path="/prescriptions" element={<PrescriptionView />} />
        <Route path="/report-explainer" element={<ReportExplainer />} />
        <Route path="/ask" element={<AskAI />} />
        <Route path="/contact" element={<ContactUs />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="doctors" element={<DoctorsDashboard />} />
          <Route path="add-doctor" element={<AddDoctor />} />
          <Route path="pharmacies" element={<PharmaciesDashboard />} />
          <Route path="add-pharmacy" element={<AddPharmacy />} />
          <Route path="laboratories" element={<LaboratoriesDashboard />} />
          <Route path="add-laboratory" element={<AddLaboratory />} />
          <Route path="radiology" element={<RadiologiesDashboard />} />
          <Route path="add-radiology" element={<AddRadiology />} />
          <Route path="reservations" element={<ReservationsDashboard />} />
        </Route>
      </Route>

      {/* Services & Facilities */}
      <Route path="/services" element={<Services />} />
      <Route path="/services/search/Laboratories" element={<Services />} />
      <Route path="/services/search/radiologies" element={<Services />} />
      <Route path="/services/search/pharmacies" element={<Pharmacies />} />
      <Route path="/pharmacies/:id" element={<PharmacyDetails />} />

      <Route path="/about/search/team" element={<DeveloperTeam />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
