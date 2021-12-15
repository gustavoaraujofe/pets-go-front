import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";

function ScheduleVetId() {
  const navigate = useNavigate();
  const { loggedInUser } = useContext(AuthContext);
  const { idVet } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [dates, setDates] = useState();
  const [hours, setHours] = useState();
  const [toggleConfirm, setToggleConfirm] = useState(false);
  const [appointment, setAppointment] = useState("");
  const [animalData, setAnimalData] = useState([]);
  const [idAnimal, setIdAnimal] = useState("");

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await api.get("animal/list");
        const animalsUser = response.data.filter((currentAnimal) => {
          return currentAnimal.userId === loggedInUser.user.id;
        });

        setAnimalData(animalsUser);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimals();
  }, []);

  useEffect(() => {
    async function fetchVet() {
      try {
        const response = await api.get(`/vet/schedule/list/${idVet}`);

        response.data.map((currentWeek) => {
          for (let key in currentWeek) {
            if (key < new Date().toLocaleDateString()) {
              delete currentWeek[key];
            }

            if (key === new Date().toLocaleDateString()) {
              let hour = new Date().toLocaleTimeString();

              const arrClone = [...currentWeek[key]];

              arrClone.map((day) => {
                if (day.split(":")[0] <= hour.split(":")[0]) {
                  let index = currentWeek[key].indexOf(day);
                  currentWeek[key].splice(index, 1);
                }
                if (!currentWeek[key].length) {
                  delete currentWeek[key];
                }
              });
            }
          }
        });
        setSchedule(response.data);

        response.data.map((currentWeek) => {
          setDates(Object.keys(currentWeek));
          setHours(Object.values(currentWeek));
        });
      } catch (err) {
        console.error(err);
      }
    }
    fetchVet();
  }, []);

  function handleChangeSelect(e) {
    console.log(e.target.value)
    setIdAnimal(e.target.value);
  }

  async function confirmAppointment() {
    try {
      const info = {
        date: appointment[0],
        hour: appointment[1],
        animalId: idAnimal,
        userId: loggedInUser.user.id,
        vetId: idVet,
      };   
      
      await api.post("appointment/create", info)

      setTimeout(() => {
        navigate("/dashboard")
      }, 3000)
      
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="pb-20 m-auto" style={{ maxWidth: "200px" }}>
        <section className="mt-6 has-text-centered is-size-5">
          <h1>
            <strong>Horários disponíveis</strong>
          </h1>
        </section>
        <div className="ml-12 paw-container-right">
          <img alt="pata" className="paw-medium" src={pawImg} />
        </div>
        <select onChange={handleChangeSelect} className="select" required>
          <option>Selecione um animal</option>
          {animalData !== []
            ? animalData.map((currentAnimal) => {
                return (
                  <option key={currentAnimal._id} value={currentAnimal._id}>
                    {currentAnimal.name}
                  </option>
                );
              })
            : null}
        </select>
        {dates && hours
          ? dates.map((date, index) => {
              return (
                <div key={`date-${index}`} className="has-text-centered">
                  <h2 className="mt-4">
                    <strong>{date}</strong>
                  </h2>
                  {hours[index].map((hour, index2) => {
                    return (
                      <div
                        key={`hour-${index2}`}
                        className="is-flex is-justify-content-center"
                      >
                        <button
                          onClick={() => {
                            setToggleConfirm(true);
                            setAppointment([date, hour]);
                          }}
                          className="salmon-btn is-size-6 mt-2"
                        >
                          {hour}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })
          : null}

        <div className="ml-5 pt-1 paw-container-left">
          <img alt="pata" className="paw-medium" src={pawImg} />
        </div>
        <div className="flex items-center justify-center">
          <img
            alt="imagem inferior"
            className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
            src={telaBegeAzul}
          />
        </div>
        <Navbar />
      </div>
      <div className="container" id="app">
        <div className={`modal ${toggleConfirm ? "is-active" : null}`}>
          <div className="modal-background "></div>
          <div className="modal-content is-flex is-justify-content-center is-flex-direction-column">
            <h3 className="has-text-centered has-text-white is-size-3">
              Deseja confirmar o agendamento o para dia {appointment[0]} às{" "}
              {appointment[1]}?
            </h3>
            <div className="is-flex is-align-items-center is-justify-content-center mt-4">
              <button
                onClick={() => confirmAppointment()}
                className="button salmon-btn bg-slate-300 mr-5"
              >
                Sim
              </button>
              <button
                onClick={() => setToggleConfirm(false)}
                className="button gray-btn"
                id="showModal"
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleVetId;
