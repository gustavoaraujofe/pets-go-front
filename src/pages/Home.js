import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8 is-flex-direction-column">
      <p>Cadastrar</p>
      <Link to="/signup/vet">
        <button>Sou Vet</button>
        </Link>
        <Link to="/signup/user">
        <button>Sou Tutor</button>
        </Link>


      <p>Já tenho uma conta</p>
      <Link to="/login">
        <button>Entrar</button>
      </Link>
    </div>
  );
}

export default Home;
