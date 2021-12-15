import telaBegeAzul from "../../assets/tela-bege-azul.png";
import pawImg from "../../assets/pata.png";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import addIcon from "../../assets/add-icon.png";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import AppointmentCard from "../appointment/AppointmentCard";

function Prontuario() {
  const [prontuarioData, setProntuarioData] = useState([]);

  const [vetData, setVetData] = useState({
    name: "",
    role: "",
    avatarUrl: "",
  });

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/vet/profile`);
        setVetData({ ...response.data });
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

        const appointmentFilter = await response.data.filter(
          (currentAppointment) => {

            return currentAppointment.vetId === vetData._id;
          }
        );

        setProntuarioData(appointmentFilter);
      } catch (err) {
        console.error(err);
      }
    }
    fetchAppointment();
  }, [vetData._id]);

  return (
    <>
      <h1 className="mt-10 pl-5">Prontuário</h1>

      <div className="paw-container-right">
        <img alt="pata" className="paw-medium" src={pawImg} />
      </div>

      {/* Dados do animal */}

      <div className="card-container mb-4">
        <div className="pt-5 card-content">
          <div className="flex items-center justify-center">
            <div className="media-left">
              <div className="flex-shrink-0">
                <img className="h-20 w-20 rounded-full" src="" />
              </div>
            </div>
            <div className="media-content">
              <p className="title is-5">Nome do Pet</p>
              <p className="subtitle is-6 mb-2">Nome do Tutor</p>

              {/* Adicionar Registro */}
              <Link to="/prontuario/new-record">
                <div className="m-0 card-container">
                  <div className="p-2 card-content">
                    <div className="flex items-center justify-center">
                      <div className="pl-2 pr-0 img-radio">
                        <img className="icon-img" src={addIcon} />
                      </div>

                      <div className="media-content">
                        <p className="subtitle is-6">Adicionar Registro</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Appointment card */}
        {prontuarioData.map((currentProntuario) => {
          return (
            <AppointmentCard key={currentProntuario._id} {...currentProntuario}/>
          );
        })}

        
      </div>

      <div className="flex items-center justify-center">
        <img
          alt="imagem inferior"
          className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
          src={telaBegeAzul}
        />
      </div>
      <Navbar />
    </>
  );
}

export default Prontuario;
