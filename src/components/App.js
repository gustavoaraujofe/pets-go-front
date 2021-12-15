import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Topbar from "../components/topbar/Topbar";

import ForgotPassword from "../pages/auth/recoveryPassword/ForgotPassword";
import NewPassword from "../pages/auth/recoveryPassword/NewPassword";
import AnimalCreate from "../pages/animal/AnimalCreate";
import VetsList from "../pages/vets/VetsList";
import VetsSpecialties from "../pages/vets/VetsSpecialties";
import EditAccount from "../pages/auth/EditAccount";
import Schedule from "../pages/schedule/Schedule";
import ScheduleVets from "../pages/schedule/ScheduleVets"

import { AuthContextComponent } from "../contexts/authContext";
import Dashboard from "../pages/dashboard/Dashboard";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <AuthContextComponent>
        <Topbar />
        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedRoute component={Dashboard} />}
          />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/edit-account/:type" element={<EditAccount />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password/:token" element={<NewPassword />} />
          <Route path="/animal-create" element={<AnimalCreate />} />
          <Route path="/vets-list/:specialties" element={<VetsList />} />
          <Route path="/vets-specialties" element={<VetsSpecialties />} />
          <Route path="/user/schedule/" element={<Schedule />} />
          <Route path="/vet/schedule-edit" element={<ScheduleVets />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
