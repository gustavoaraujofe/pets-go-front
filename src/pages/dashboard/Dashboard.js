import { Link } from "react-router-dom";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import addIcon from "../../assets/add-icon.png";
import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";

function Dashboard() {
  const [userData, setUserData] = useState({
    name: "",
    role: "",
    avatarUrl: "",
  });

  //   const [animalData, setAnimalData] = useState({
  //     name: "",
  //     age: 0,
  //     weight: 0,
  //     avatarUrl: "",
  //   });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/profile`);

        setUserData({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  //   useEffect(() => {
  //     async function fetchAnimal() {
  //       try {
  //         const response = await api.get(`/animal/create`);

  //         setAnimalData({ ...response.data });
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //     fetchAnimal();
  //   }, []);

  return (
    <div>
      <section className="mt-4 flex items-center justify-between mr-8 ml-8">
        <h1>Olá, {userData.name}</h1>
        <div className="flex-shrink-0">
          <img className="h-20 w-20 rounded-full" src={userData.avatarUrl} alt="Avatar usuario"/>
        </div>
      </section>

      {userData.role === "user" ? (
        <>
          <h2 className="mt-8 ml-8">Meus Pets</h2>

          <div className="ml-12 paw-container-right">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>

          <div className="card-container mb-4">
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <div className="flex-shrink-0">
                    <img className="h-20 w-20 rounded-full" src="" />
                  </div>
                </div>
                <div className="media-content">
                  <p className="title is-4">Nome do Pet</p>
                  <p className="subtitle is-6 mb-2">Idade:</p>
                  <p className="subtitle is-6">Peso:</p>
                </div>
              </div>
            </div>
          </div>

          <Link to="/animal-create">
            <div className="card-container">
              <div className="card-content">
                <div className="media">
                  <div className="media-left">
                    <div className="img-radio">
                      <img src={addIcon} />
                    </div>
                  </div>
                  <div className="media-content">
                    <p className="title is-4">Adicionar Pet</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className="ml-5 pt-5 paw-container-left">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>

          <div className="max-w-md w-full is-flex is-justify-content-center">
            <Link to="/vets-specialties">
              <button className="btn salmon-btn">Agendar</button>
            </Link>
          </div>
        </>
      ) : (
        <h2 className="mt-8 ml-8">Meus Agendamentos</h2>
      )}

      <div className="flex items-center justify-center">
        <img
          alt="imagem inferior"
          className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
          src={telaBegeAzul}
        />
      </div>
      <Navbar/>
    </div>
  );
}

export default Dashboard;
