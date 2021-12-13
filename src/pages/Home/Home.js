import React from "react";
import { Link } from "react-router-dom";
import telaRosaAzul from "../../assets/tela-rosa-azul.png";
import "./Home.css";
import pawImg from "../../assets/pata.png";

function Home() {
  return (

    <div className="home-container min-h-full flex items-center justify-start mt-20 pt-0 pb-20 px-4 sm:px-6 lg:px-8 is-flex-direction-column">
      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg}/>
      </div>

      <p className="title-home">Cadastrar</p>
      <Link to="/signup/vet">
        <button type="button" className="mb-2 mt-2 lightgreen-btn btn">Sou Vet</button>
      </Link>
      <Link to="/signup/user">
        <button type="button" className="mb-8 purple-btn btn">Sou Tutor</button>
      </Link>

      <div className="paw-container-left">
        <img alt="pata" className="paw-small" src={pawImg}/>
      </div>

      <p>Já tenho uma conta</p>
      <Link to="/login">
        <button type="button" className="mt-2 enter-btn btn">Entrar</button>
      </Link>
      <div className="flex items-center justify-center">
        <img alt="imagem inferior" className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8" src={telaRosaAzul} />
      </div>
    </div>

  );
}

export default Home;
