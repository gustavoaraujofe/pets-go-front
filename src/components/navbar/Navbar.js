import "./navbar.css";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.png";
import calendarIcon from "../../assets/agendamento.png";
import medicalRecordIcon from "../../assets/prontuario.png";
import {useContext} from "react"
import { AuthContext } from "../../contexts/authContext";

function Navbar() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <div className="navbar-container flex items-center justify-around navbar-color">
      <Link to="/dashboard">
        <div
          className="icon-nav flex is-flex-direction-column
 direction-column items-center justify-center"
        >
          <img src={homeIcon} alt="home" />
          <span>Home</span>
        </div>
      </Link>
      <Link to={loggedInUser.user.role === "vet" ? "/vet/agendamentos" : "/user/agendamentos"}>
        <div
          className="icon-nav flex is-flex-direction-column
 direction-column items-center justify-center"
        >
          <img src={calendarIcon} alt="calendário" />
          <span>Agendamentos</span>
        </div>
      </Link>
      <Link to={loggedInUser.user.role === "vet" ? "/vet/prontuario" : "/dashboard"}>
        <div
          className="icon-nav flex is-flex-direction-column
 direction-column items-center justify-center"
        >
          <img src={medicalRecordIcon} alt="prontuário" />
          <span>Prontuário</span>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
