import logo from "../../assets/logo1.png";
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
    if (loggedInUser.user.id) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    setToggle(false);
  }, [loggedInUser, params]);

  return (
    <>
      <nav className="navbar topbar-container" aria-label="main navigation">
        <div className="navbar-brand">
          <div
            className="container-logo flex items-center justify-center m-auto"
            style={{ position: !login ? "absolute" : null }}
          >
            <Link to={login ? "/dashboard" : "/"}>
              <img className="logo-img" src={logo} alt="logo" />
            </Link>
          </div>

          <button
            className={`navbar-burger  ${!login ? "is-hidden" : null}`}
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
          <div
            className={`navbar-start bg-white ${!login ? "is-hidden" : null}`}
          >
            <Link to="/dashboard" className="navbar-item">
              <p>Home</p>
            </Link>

            <Link
              to={`/edit-account/${loggedInUser.user.role}`}
              className="navbar-item"
            >
              <p>Editar cadastro</p>
            </Link>
            {loggedInUser.user.role === "vet" ? (
              <Link to={`/vet/schedule-edit`} className="navbar-item">
                <p>Criar agenda</p>
              </Link>
            ) : null}
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
                  className={`button noto-medium salmon-btn hora-btn is-size-6 ${
                    !login ? "is-hidden" : null
                  }`}
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
