import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Topbar from "../components/topbar/Topbar";

import ForgotPassword from "../pages/auth/recoveryPassword/ForgotPassword";
import NewPassword from "../pages/auth/recoveryPassword/NewPassword";
import AnimalCreate from "../pages/animal/AnimalCreate";
import VetsList from '../pages/vets/VetsList';
import VetsSpecialties from '../pages/vets/VetsSpecialties';
import EditAccount from "../pages/auth/EditAccount"
import AnimalEdit from "../pages/animal/AnimalEdit"
import ProntuarioList from "../pages/prontuario/ProntuarioList"
import ProntuarioCreate from "../pages/prontuario/ProntuarioCreate"

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
          <Route path="/animal-create" element={<AnimalCreate/>}/>
          <Route path="/vets-list/:specialties" element={<VetsList/>}/>
          <Route path="/vets-specialties" element={<VetsSpecialties/>}/>
          <Route path="/animal-edit" element={<AnimalEdit/>}/>
          <Route path="/prontuario/new-record" element={<ProntuarioCreate/>}/>
          <Route path="/prontuario" element={<ProntuarioList/>}/>
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
