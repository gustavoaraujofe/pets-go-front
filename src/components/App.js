import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Navbar from "./navbar/Navbar"
import ForgotPassword from "../pages/auth/recoveryPassword/ForgotPassword"
import NewPassword from "../pages/auth/recoveryPassword/NewPassword"

import { AuthContextComponent } from "../contexts/authContext";


function App() {
  return (
    <div style={{height: '100%'}}>
      <AuthContextComponent>
        <Routes>
          {/* <Route path="/" element={<ProtectedRoute component={Home} />} /> */}
          <Route path="/signup/:type" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/new-password/:token" element={<NewPassword />} /> 
        </Routes>
      <Navbar />
      </AuthContextComponent>
    </div>
  );
}

export default App;
