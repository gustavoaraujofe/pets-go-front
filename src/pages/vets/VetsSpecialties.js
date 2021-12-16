// import telaRosaAzul from "../../assets/tela-rosa-azul.png";
import pawImg from "../../assets/pata.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import BottomPink from "../../components/bottom/BottomPink";

function VetsSpecialties() {
  const [specialtiesData, setSpecialtiesData] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!specialtiesData) {
      toast.error("Por favor, selecione uma especialidade");
      return;
    }
  }

  return (
    <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8">
      <div>
        <div>
          <h1 className="mt-6 text-center">Escolha a Especialidade</h1>
        </div>

        <form>
          <div className="mt-5 ml-5 flex items-center">
            <input
              className="w-5"
              type="radio"
              id="clinico"
              value="clinico"
              name="specialties"
              onChange={(event) => setSpecialtiesData(event.target.value)}
            />
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
              value="oftalmologia"
              onChange={(event) => setSpecialtiesData(event.target.value)}
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
              value="cardiologia"
              onChange={(event) => setSpecialtiesData(event.target.value)}
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
              value="dermatologia"
              onChange={(event) => setSpecialtiesData(event.target.value)}
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
              value="silvestres"
              onChange={(event) => setSpecialtiesData(event.target.value)}
            />
            <label className="ml-2 mt-0" htmlFor="silvestres">
              Silvestres
            </label>
          </div>

          <div className="paw-container-right">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>
          <div className="mt-10 max-w-md w-full is-flex is-justify-content-center">
            {!specialtiesData ? (
              <button onClick={handleSubmit} className="btn blue-btn">
                Escolher
              </button>
            ) : (
              <Link to={`/vets-list/${specialtiesData}`}>
                <button className="btn blue-btn">Escolher</button>
              </Link>
            )}
          </div>
        </form>
        <BottomPink />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: "",
            duration: 5000,
            style: {
              background: "#fff",
              color: "#000",
            },

            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default VetsSpecialties;
