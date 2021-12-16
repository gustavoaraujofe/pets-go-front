import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../../apis/api";
import { AuthContext } from "../../contexts/authContext";
import toast, { Toaster } from "react-hot-toast";

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

        response.data.forEach((currentWeek) => {
          for (let key in currentWeek) {
            if (key < new Date().toLocaleDateString()) {
              delete currentWeek[key];
            }

            if (key === new Date().toLocaleDateString()) {
              let hour = new Date().toLocaleTimeString();

              const arrClone = [...currentWeek[key]];

              arrClone.forEach((day) => {
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

        response.data.forEach((currentWeek) => {
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

      if (!info.animalId) {
        setToggleConfirm(false);
        toast.error("Você precisa selecionar um animal!");
        return console.error("ERROU");
      }
      await api.post("appointment/create", info);
      toast.success("Agendamento realizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="">
      <div className="max-w-md w-full space-y-8 pb-20">
        <div>
          <h1 className="mt-3 mb-3 text-center">Horários Disponíveis</h1>
        </div>

        <select
          onChange={handleChangeSelect}
          className="label border-2 m-auto"
          required
        >
          <option className="">Selecione um animal</option>
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
                <div key={`date-${index}`} className="has-text-centered mt-3">
                  <div>
                    <h3 className="text-center noto-bold">{date}</h3>
                  </div>
                  {hours[index].map((hour, index2) => {
                    return (
                      <div
                        key={`hour-${index2}`}
                        className="flex justify-center items-center"
                      >
                        <button
                          onClick={() => {
                            setToggleConfirm(true);
                            setAppointment([date, hour]);
                          }}
                          className="flex justify-center items-center lightgreen-btn hora-btn mt-2"
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
        <div className="flex items-center justify-center">
          <img
            alt="imagem inferior"
            className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
            src={telaBegeAzul}
          />
        </div>
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
      <Navbar />
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
  );
}

export default ScheduleVetId;
