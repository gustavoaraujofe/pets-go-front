import logo from "../../assets/logo.png";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="topbar-container flex items-center justify-center">
      <img className="logo-img" src={logo} alt="logo" />
    </div>
  );
}

export default Topbar;
