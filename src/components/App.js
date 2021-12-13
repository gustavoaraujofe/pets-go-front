import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";

import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Topbar from "../components/topbar/Topbar";

import Navbar from "./navbar/Navbar"
import ForgotPassword from "../pages/auth/recoveryPassword/ForgotPassword"
import NewPassword from "../pages/auth/recoveryPassword/NewPassword"
import AnimalCreate from '../pages/animal/AnimalCreate'


import { AuthContextComponent } from "../contexts/authContext";
import Dashboard from "../pages/dashboard/Dashboard";


function App() {
  return (
    <div style={{height: '100%'}}>
      <AuthContextComponent>
        <Topbar/>
        <Routes>
          <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password/:token" element={<NewPassword />} /> 
          <Route path="/animal-create" element={<AnimalCreate/>}/>
        </Routes>
      <Navbar />
      </AuthContextComponent>
    </div>
  );
}

export default App;
