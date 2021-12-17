import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
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
import ScheduleUser from "../pages/schedule/ScheduleUser";
import ScheduleVets from "../pages/schedule/ScheduleVets"
import AnimalEdit from "../pages/animal/AnimalEdit"

import ScheduleVetId from "../pages/schedule/ScheduleVetId"
import Prontuario from "../pages/prontuario/Prontuario"
import NewRecord from "../pages/prontuario/NewRecord"
import RecordDetail from "../pages/prontuario/RecordDetail"
import RecordEdit from "../pages/prontuario/RecordEdit"
import AppointmentUser from "../pages/appointment/AppointmentUser"
import AppointmentVet from "../pages/appointment/AppointmentVet"

import AnimalDetail from "../pages/animal/AnimalDetail"

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
          <Route path="/edit-account/:type" element={<ProtectedRoute component={EditAccount} />} />
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password/:token" element={<NewPassword />} /> 
          <Route path="/animal-create" element={<ProtectedRoute component={AnimalCreate} />}/>
          <Route path="/vets-list/:specialties" element={<ProtectedRoute component={VetsList}/>}/>
          <Route path="/vets-specialties" element={<ProtectedRoute component={VetsSpecialties}/>}/>
          <Route path="/user/schedule/" element={<ProtectedRoute component={ScheduleUser} />} />
          <Route path="/vet/schedule/:idVet" element={<ProtectedRoute component={ScheduleVetId} />} />
          <Route path="/prontuario/new-record/:animalId" element={<ProtectedRoute component={NewRecord}/>}/>
          <Route path="/user/prontuario" element={<ProtectedRoute component={Prontuario}/>}/>
          <Route path="/vet/prontuario/:idAnimal" element={<ProtectedRoute component={Prontuario}/>}/>
          <Route path="/vet/schedule-edit" element={<ProtectedRoute component={ScheduleVets} />} />
          <Route path="/prontuario/record-detail/:id" element={<ProtectedRoute component={RecordDetail}/>}/>
          <Route path="/prontuario/record-edit/:id" element={<ProtectedRoute component={RecordEdit}/>}/>
          <Route path="/animal/edit/:id" element={<ProtectedRoute component={AnimalEdit}/>}/>
          <Route path="/user/agendamentos" element={<ProtectedRoute component={AppointmentUser}/>}/>
          <Route path="/vet/agendamentos/:vetId" element={<ProtectedRoute component={AppointmentVet} />}/>

          <Route path="/animal/detail/:id" element={<ProtectedRoute component={AnimalDetail}/>} />

        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;