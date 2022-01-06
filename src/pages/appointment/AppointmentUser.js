import pawImg from "../../assets/pata.png";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import BottomPink from "../../components/bottom/BottomPink"
import Navbar from "../../components/navbar/Navbar"

function AppointmentUser() {
  const [appointmentData, setAppointmentData] = useState([]);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchAnimal() {
      try {
        const response = await api.get(`/appointment/list`);

        const myAppointments = response.data.filter((currentAppointment) => {
          return currentAppointment.userId._id === loggedInUser.user.id;
        });

        setAppointmentData(myAppointments);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAnimal();
  }, [loggedInUser.user.id]);

  return (
    <div className="min-h-full flex is-flex-direction-column items-center justify-center mt-5 pt-0 pb-0 px-4 sm:px-6 lg:px-8">
      <h1>Agendamentos</h1>
      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg}/>
      </div> 
      {appointmentData.map((currentData) => {
        return (
          <div className="card-container mb-4">
            <div className="p-5 card-content">
              <div className="media">
                <div className="media-left">
                  <div className="flex-shrink-0">
                    <img
                      className="h-20 w-20 rounded-full object-cover"
                      src={currentData.vetId.avatarUrl}
                      alt={currentData._id}
                    />
                  </div>
                  <p><span className="noto-bold">Veterinário: </span> {currentData.vetId.name}</p>
                  <p><span className="noto-bold">Especialidade: </span>{currentData.vetId.specialties[0]}</p>
                </div>
              </div>
              
              <div className="media pl-0">
                <div className="media-content">
                  <p> <span className="noto-bold">Pet: </span>{currentData.animalId.name}</p>
                  <p> <span className="noto-bold">
                    Consulta dia: </span>{currentData.date} - {currentData.hour}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <Navbar/>
      <BottomPink/>
    </div>
  );
}

export default AppointmentUser;
