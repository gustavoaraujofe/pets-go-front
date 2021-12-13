import telaRosaAzul from "../../assets/tela-rosa-azul.png";
import pawImg from "../../assets/pata.png";
import { Link } from "react-router-dom";

function VetsSpecialties() {
  return (
    <div className="mt-16">
      <h1 className="mt-5 ml-5">Escolha a Especialidade</h1>
      <form>
        <div className="mt-5 ml-5 flex items-center">
          <input className="w-5" type="radio" id="clinico" name="specialties" />
          <label className="ml-2 mt-0" htmlFor="clinico">
            Clínico Geral
          </label>
        </div>
        <div className="mt-5 ml-5 flex items-center">
          <input
            className="w-5"
            type="radio"
            id="oftalmologia"
            name="specialties"
          />
          <label className="ml-2 mt-0" htmlFor="oftalmologia">
            Oftalmologia
          </label>
        </div>
        <div className="mt-5 ml-5 flex items-center">
          <input
            className="w-5"
            type="radio"
            id="cardiologia"
            name="specialties"
          />
          <label className="ml-2 mt-0" htmlFor="cardiologia">
            Cardiologia
          </label>
        </div>
        <div className="mt-5 ml-5 flex items-center">
          <input
            className="w-5"
            type="radio"
            id="dermatologia"
            name="specialties"
          />
          <label className="ml-2 mt-0" htmlFor="dermatologia">
            Dermatologia
          </label>
        </div>
        <div className="mt-5 ml-5 flex items-center">
          <input
            className="w-5"
            type="radio"
            id="silvestres"
            name="specialties"
          />
          <label className="ml-2 mt-0" htmlFor="silvestres">
            Silvestres
          </label>
        </div>

        <div className="flex items-center justify-center">
          <img
            alt="imagem inferior"
            className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
            src={telaRosaAzul}
          />
        </div>
        <div className="paw-container-right">
          <img alt="pata" className="paw-medium" src={pawImg} />
        </div>
        <div className="mt-10 max-w-md w-full is-flex is-justify-content-center">
          <Link to="/vets-list">
            <button className="btn blue-btn">Escolher</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default VetsSpecialties;

//   <input
//     required
//     id="description"
//     value={newGifts.description}
//     type="text "
//     onChange={handleChange}
//     name="description"
//     placeholder="Brief Description"
//     maxLength="80"
//   />
