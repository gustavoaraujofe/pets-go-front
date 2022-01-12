import { Link, useLocation } from "react-router-dom";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import addIcon from "../../assets/add-icon.png";
import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import Loading from "../../components/Loading";
import AnimalCard from "../animal/AnimalCard";
import AnimalCardVet from "../animal/AnimalCardVet";
import AppointmentCardVet from "../../components/appointment/AppointmentCardVet";


function Dashboard() {
  let timer;
  const params = useLocation();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [animalData, setAnimalData] = useState([]);
  const [appointment, setAppointment] = useState([]);

  const [userData, setUserData] = useState({
    name: "",
    role: "",
    avatarUrl: "",
  });

  function handleChange(e) {
    setSearch(e.target.value);
  }

  let listaFiltrada = [];
  if (search) {
    const re = new RegExp(`${search}`, "gi");
    animalData.forEach((currentAnimal) => {
      if (currentAnimal.name.match(re) !== null) {
        listaFiltrada.push(currentAnimal);
      }
    });
  } else {
    listaFiltrada = animalData;
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/user/profile`);

        setUserData({ ...response.data });
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await api.get(`/animal/list`);
        let animalFilter;
        if (userData.role === "user") {
          animalFilter = await response.data.filter((currentAnimal) => {
            return currentAnimal.userId === userData._id;
          });
        } else {
          animalFilter = response.data.filter((currentAnimal) => {
            return userData.patients?.includes(currentAnimal._id);
          });
        }

        for (let i = 0; i < animalFilter.length; i++) {
          const response = await api.get(
            `/user/profile/${animalFilter[i].userId}`
          );
          animalFilter[i].tutor = response.data;
        }
        setAnimalData(animalFilter);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimal();
  }, [userData._id, params]);

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const response = await api.get(`/appointment/list`);
        let appointmentFilter;

        if (userData.role === "user") {
          appointmentFilter = response.data.filter((currentAppointment) => {
            return currentAppointment.userId?._id === userData._id;
          });
        } else {
          appointmentFilter = response.data.filter((currentAppointment) => {
            return currentAppointment.vetId?._id === userData._id;
          });
        }
   
        const appointmentDay = appointmentFilter.filter(
          (currentAppointment) => {
            return (
              currentAppointment.date === new Date().toLocaleDateString() &&
              currentAppointment.hour.split(":")[0] >
                new Date().toLocaleTimeString().split(":")[0]
            );
          }
        );

        await appointmentDay.sort((a, b) => {
          return (a.date + a.hour).localeCompare(b.date + b.hour);
        });

        appointmentDay.splice(3);
        setAppointment([...appointmentDay]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAppointment();
  }, [userData.role, userData._id]);


  return (
    <>
      <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <Loading />
        ) : (
          <div className="pb-20">
            <section className="mt-4 flex items-center justify-between mr-8 ml-8">
              <h2 className="noto-bold">Olá, {userData.name.split(" ")[0]}</h2>
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full object-cover"
                  src={userData.avatarUrl}
                  alt="Avatar usuario"
                />
              </div>
            </section>

            <hr />
            {userData.role === "user" ? (
              <>
                <h1 className="mt-8 ml-8">Meus Pets</h1>

                <div className="ml-12 paw-container-right">
                  <img alt="pata" className="paw-medium" src={pawImg} />
                </div>

                <Link to="/animal-create">
                  <div className="h-16 mb-4 flex items-center card-container">
                    <div className="card-content flex items-center">
                      <div className="media items-center">
                        <div className="media-left">
                          <div className="img-radio">
                            <img src={addIcon} alt="adicionar animal" />
                          </div>
                        </div>
                        <div className="media-content">
                          <p className="noto-bold">Adicionar Pet</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div>
                  {animalData.map((currentAnimal) => {
                    return (
                      <AnimalCard key={currentAnimal.id} {...currentAnimal} />
                    );
                  })}
                </div>

                <div className="ml-5 pt-1 paw-container-left">
                  <img alt="pata" className="paw-medium" src={pawImg} />
                </div>

                <div className="mb-4 max-w-md w-full is-flex is-justify-content-center">
                  <Link to="/vets-specialties">
                    <button className="btn salmon-btn">Agendar</button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h1 className="mt-8 ml-8">Próximas consultas</h1>

                <div className="ml-12 paw-container-right">
                  <img alt="pata" className="paw-small" src={pawImg} />
                </div>

                {appointment?.map((currentAnimal) => {
                  return (
                    <div key={`appointment${currentAnimal._id}`}>
                      <AppointmentCardVet
                        id={currentAnimal._id}
                        avatar={currentAnimal.animalId.imageUrl}
                        name={currentAnimal.animalId.name}
                        hour={currentAnimal.hour}
                        tutor={currentAnimal.userId.name.split(" ")[0]}
                      />
                    </div>
                  );
                })}
                <Link to={`/vet/agendamentos/${userData._id}`}>
                  <p className="is-size-6 has-text-right mr-5">
                    <strong>Mostrar todas</strong>
                  </p>
                </Link>
                <h1 className="mb-4 mt-8 ml-8">Meus Pacientes</h1>
                <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8 ">
                  <input
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => {
                      clearTimeout(timer);
                      timer = setTimeout(() => handleChange(e), 600);
                    }}
                    type="text"
                    placeholder="Buscar paciente"
                  />
                </div>
                {listaFiltrada !== [] ? (
                  <div>
                    {listaFiltrada.map((currentAnimal) => {
                      return <AnimalCardVet key={currentAnimal._id} {...currentAnimal} />;
                    })}
                  </div>
                ) : null}
              </>
            )}

            <div className="flex items-center justify-center">
              <img
                alt="imagem inferior"
                className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
                src={telaBegeAzul}
              />
            </div>
          </div>
        )}
        <Navbar />
      </div>
      
    </>
  );
}

export default Dashboard;
