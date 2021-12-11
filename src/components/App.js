import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Navbar from "./navbar/Navbar"

import { AuthContextComponent } from "../contexts/authContext";


function App() {
  return (
    <div style={{height: '100%'}}>
      <AuthContextComponent>
        <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      <Navbar />
      </AuthContextComponent>
    </div>
  );
}

export default App;
