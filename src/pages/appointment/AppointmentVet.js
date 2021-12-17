import api from "../../apis/api";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

function AppointmentVet() {
  const { vetId } = useParams();

  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await api.get(`/appointment/list`);
        console.log(response.data)
        const myAppointments = response.data.filter((currentAppointment) => {
          return currentAppointment.vetId === vetId;
        });

        setAppointmentData(myAppointments);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimal();
  }, []);
  console.log(appointmentData)
  return (
    <>
      {appointmentData.map((currentData) => {
        return (
          <div className="card-container mb-4">
            <div className="p-5 card-content">
              <div className="media">
                <div className="media-left">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-full"
                      src={currentData.vetId.avatarUrl}
                      alt={currentData._id}
                    />
                  </div>
                  <p>{currentData.vetId.name}</p>
                  <p>{currentData.vetId.specialties[0]}</p>
                </div>
              </div>
              <div className="media pl-0">
                <div className="media-content">
                  <p className="noto-bold">Pet: {currentData.animalId.name}</p>
                  <p className="noto-bold">
                    Consulta dia: {currentData.date} - {currentData.hour}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default AppointmentVet;
