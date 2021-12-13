import "./navbar.css";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/home.png";
import calendarIcon from "../../assets/agendamento.png";
import medicalRecordIcon from "../../assets/prontuario.png";

function Navbar() {
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
      <Link to="user/agendamentos">
        <div
          className="icon-nav flex is-flex-direction-column
 direction-column items-center justify-center"
        >
          <img src={calendarIcon} alt="calendário" />
          <span>Agendamentos</span>
        </div>
      </Link>
      <Link to="user/prontuario">
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
