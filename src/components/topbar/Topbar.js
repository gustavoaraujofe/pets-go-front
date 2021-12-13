import logo from "../../assets/logo.png";
import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import "./Topbar.css";

function Topbar() {
  const [toggle, setToggle] = useState(false);
  const [login, setLogin] = useState(false);
  const { logout, loggedInUser } = useContext(AuthContext);

  const params = useLocation();

  useEffect(() => {
    console.log(loggedInUser);
    if (loggedInUser.user.id) {
      setLogin(true);
    }
  }, [loggedInUser, params]);

  return (
    <>
      <nav className="navbar topbar-container" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="container-logo flex items-center justify-center m-auto ">
            <img className="logo-img" src={logo} alt="logo" />
          </div>

          <button
            className={`navbar-burger ${!login ? "is-hidden" : null}`}
            onClick={() => setToggle(!toggle)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          id="navbarBasicExample"
          className={`${toggle ? null : "navbar-menu"}`}
        >
          <div className="navbar-start bg-white">
            <Link to="/" className="navbar-item">
              <strong>Home</strong>
            </Link>

            <Link to="/" className="navbar-item">
              <strong>Editar cadastro</strong>
            </Link>
            <Link to="/" className="navbar-item">
              <strong>Meus pets</strong>
            </Link>
          </div>

          <div className="navbar-end bg-white">
            <div className="navbar-item">
              <div className="buttons">
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                    setLogin(false);
                    setToggle(false);
                  }}
                  className="button salmon-btn is-size-7"
                >
                  Sair
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Topbar;
