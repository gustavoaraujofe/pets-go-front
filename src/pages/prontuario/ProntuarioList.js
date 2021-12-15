import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import ProntuarioCard from "./ProntuarioCard";
import addIcon from "../../assets/add-icon.png";




function ProntuarioList() {
  return (
    <>
      <h1 className="mt-10 pl-5">Prontuário</h1>

      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg} />
      </div>

      <ProntuarioCard/>

      <Link to="/prontuario/new-record">
                <div className="card-container">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <div className="img-radio">
                          <img src={addIcon} />
                        </div>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">Adicionar Registro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

      <div className="flex items-center justify-center">
            <img
              alt="imagem inferior"
              className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
              src={telaBegeAzul}
            />
          </div>
          <Navbar/>
    </>
  );
}

export default ProntuarioList;
