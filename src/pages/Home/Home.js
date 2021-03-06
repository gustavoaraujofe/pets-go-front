import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import pawImg from "../../assets/pata.png";
import BottomPink from "../../components/bottom/BottomPink";

function Home() {
  return (
    <>
    <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8 is-flex-direction-column" style={{height: "70%"}}>
      
      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg}/>
      </div>


      <h2 className="title-home">Cadastrar</h2>
      <Link to="/signup/vet">
        <button type="button" className="mb-2 mt-2 lightgreen-btn btn-global">Sou Vet</button>
      </Link>
      <Link to="/signup/user">
        <button type="button" className="mb-8 purple-btn btn-global">Sou Tutor</button>
      </Link>

      <div className="paw-container-left">
        <img alt="pata" className="paw-small" src={pawImg}/>
      </div>

      <p>Já tenho uma conta</p>
      <Link to="/login">
        <button type="button" className="mt-2 enter-btn btn-global">Entrar</button>
      </Link>
    
      <BottomPink/>
    </div>
    </>
  );
}

export default Home;