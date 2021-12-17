import telaRosaAzul from "../../assets/tela-rosa-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import addIcon from "../../assets/add-icon.png";
import api from "../../apis/api";
import { useEffect, useState, useContext } from "react";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import { AuthContext } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import { ControlPointSharp, PanoramaSharp } from "@material-ui/icons";

function Prontuario() {
  const params = useParams();
  const { loggedInUser } = useContext(AuthContext);
  const [prontuarioData, setProntuarioData] = useState([]);
  const [userData, setUserData] = useState({});
  const [animalData, setAnimalData] = useState([]);
  const [idAnimalSelect, setIdAnimalSelect] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        //if (loggedInUser.user.role === "vet") {
        // const response = await api.get(`/vet/profile`);
        // setUserData({ ...response.data });
        // }

        if (loggedInUser.user.role === "user") {
          const response = await api.get(`/vet/profile`);
          setUserData({ ...response.data });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await api.get(`/medical-appointment/list`);

        let appointmentFilter;
        if (loggedInUser.user.role === "vet") {
          appointmentFilter = await response.data.filter(
            (currentAppointment) => {
              return currentAppointment.animalId === params.idAnimal;
            }
          );
        }

        if (loggedInUser.user.role === "user") {
          appointmentFilter = await response.data.filter(
            (currentAppointment) => {
              return currentAppointment.animalId === idAnimalSelect;
            }
          );
        }

        setProntuarioData(appointmentFilter);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAppointment();
  }, [idAnimalSelect, animalData]);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        if (loggedInUser.user.role === "user") {
          const response = await api.get("animal/list");
          const animalsFiltered = response.data.filter((currentAnimal) => {
            return currentAnimal.userId === userData._id;
          });
          setAnimalData([animalsFiltered]);
        }

        if (loggedInUser.user.role === "vet") {
          const response = await api.get(`animal/search/${params.idAnimal}`);
          setAnimalData([response.data]);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimals();
  }, [userData._id]);

  function handleChangeSelect(e) {
    console.log(e.target.value);
    setIdAnimalSelect(e.target.value);
  }

  return (
    <>
      <h1 className="mt-8 ml-8">Prontuário</h1>
      <div className="flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div className="paw-container-right ml-5">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>

          {/* Dados do animal */}
          {loggedInUser.user.role === "user" ? (
            <select onChange={handleChangeSelect} className="select" required>
              <option>Selecione um animal</option>
              {animalData !== []
                ? animalData.map((currentAnimal) => {
                    return (
                      <option key={`animal${currentAnimal._id}`} value={currentAnimal._id}>
                        {currentAnimal.name}
                      </option>
                    );
                  })
                : null}
            </select>
          ) : null}
          {animalData[0] ? (
            <div className="card-container mb-4">
              <div className="card-content">
                <div className="flex items-center justify-center">
                  <div className="media-left">
                    <div className="flex-shrink-0">
                      <img
                        className="h-20 w-20 rounded-full"
                        src={animalData[0].imageUrl}
                        alt="Avatar Animal"
                      />
                    </div>
                  </div>
                  <div className="media-content">
                    <p className="noto-bold">{animalData[0].name}</p>
                    <p>{animalData[0].userId.name}</p>

                    {/* Adicionar Registro */}
                    <Link to={`/prontuario/new-record/${animalData[0]._id}`}>
                      <div className="m-0 mt-2 card-container">
                        <div className="p-2 card-content">
                          <div className="flex items-center justify-center">
                            <div className="pl-2 mr-1 img-radio">
                              <img
                                className="icon-img"
                                src={addIcon}
                                alt="adicionar registro"
                              />
                            </div>

                            <div className="media-content">
                              <p>Registro</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {prontuarioData
                ? prontuarioData.map((currentProntuario) => {
                    return (
                      <Link
                        to={`/prontuario/record-detail/${currentProntuario._id}`}
                        key={currentProntuario._id}
                      >
                        <AppointmentCard {...currentProntuario} />
                      </Link>
                    );
                  })
                : null}
            </div>
          ) : null}

          <div className="flex items-center justify-center">
            <img
              alt="imagem inferior"
              className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
              src={telaRosaAzul}
            />
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default Prontuario;
