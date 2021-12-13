import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/login/Login";
// import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Navbar from "./navbar/Navbar"
import AnimalCreate from '../pages/animal/AnimalCreate'

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
          <Route path="/animal-create" element={<AnimalCreate/>}/>
        </Routes>
      <Navbar />
      </AuthContextComponent>
    </div>
  );
}

export default App;
