import api from "../../apis/api";
import { useEffect, useState } from "react";
import BottomPink from "../../components/bottom/BottomPink";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import pawImg from "../../assets/pata.png";

function AppointmentVet() {
  const { vetId } = useParams();

  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await api.get(`/appointment/list`);
        console.log(response.data)
        const myAppointments = response.data.filter((currentAppointment) => {
          return currentAppointment.vetId?._id === vetId;
        });

        await myAppointments.sort((a, b) => {
          return (a.date + a.hour).localeCompare(b.date + b.hour);
        });

        setAppointmentData(myAppointments);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimal();
  }, [vetId]);

  return (
    <div className="min-h-full flex is-flex-direction-column items-center justify-center mt-5 pt-0 pb-20 px-4 sm:px-6 lg:px-8 ">
      <h1 className="pb-5">Agendamentos</h1>
      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg} />
      </div>

      {appointmentData?.map((currentData) => {
        return (
          <div key={currentData._id} className="card-container mb-4">
            <div className="p-5 card-content">
              <div className="media">
                <div className="media-left">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={currentData.animalId?.imageUrl}
                      alt={currentData.animalId?.name}
                    />
                  </div>
                  <p>
                    <span className="noto-bold">Pet: </span>{" "}
                    {currentData.animalId?.name}
                  </p>
                  <p>
                    <span className="noto-bold">Raça: </span>
                    {currentData.animalId?.breed}
                  </p>
                </div>
              </div>
              <div className="media pl-0">
                <div className="media-content">
                  <p>
                  <span className="noto-bold">Tutor: </span> {currentData.userId.name.split(" ")[0]}
                  </p>
                  <p><span className="noto-bold">Consulta dia: </span>
                    {currentData.date} - {currentData.hour}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <BottomPink />
      <Navbar />
    </div>
  );
}

export default AppointmentVet;
