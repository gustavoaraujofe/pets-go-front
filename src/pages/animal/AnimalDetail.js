import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../apis/api";

function AnimalDetail() {
  const { id } = useParams();

  const [animalDetail, setAnimalDetail] = useState({
    name: "",
    age: "",
    breed: "",
    weight: "",
    gender: "",
    imageUrl: "",
    type: "",
    medicalAppointmentHistory: "",
  });

  const [medicalAppointmentHistory, setmedicalAppointmentHistory] = useState({
    animalId: "",
    date: "",
    weight: "",
    clinicalSign: "",
    exam: "",
    disease: "",
    prescription: "",
    vaccine: "",
    vetId: "",
  });



  useEffect(() => {
    async function fetchAnimalId() {
      try {
        const response = await api.get(`/animal/search/${id}`);
        setAnimalDetail({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchAnimalId();
  }, [id]);

  useEffect(() => {
    async function fetchMedicalAppointment() {
      try {
        const response = await api.get(`/medical-appointment/search/${animalDetail.medicalAppointmentHistory}`);
        setmedicalAppointmentHistory({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchMedicalAppointment();
  }, [animalDetail.medicalAppointmentHistory]);

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 rounded-full"
            src={animalDetail.imageUrl}
            alt={animalDetail.name}
          />
        </div>
        <div>
          <p>
            <strong>Nome do pet: </strong>
            {animalDetail.name}
          </p>
          <p>
            <strong>Idade: </strong>
            {animalDetail.age} anos
          </p>
          <p>
            <strong>Peso: </strong>
            {animalDetail.weight} kg
          </p>
          <p>
            <strong>Raça: </strong>
            {animalDetail.breed}
          </p>
          <p>
            <strong>Sexo: </strong>
            {animalDetail.gender}
          </p>
          <p>
            <strong>Tipo: </strong>
            {animalDetail.type}
          </p>
        </div>
      </div>
      <div>
        <h2>
          <strong>Prontuário</strong>
        </h2>
        <p>
          <strong>Sinais Clínicos: </strong>

          {medicalAppointmentHistory.clinicalSign}
        </p>
        <p>
          <strong>Exame: </strong>
          {medicalAppointmentHistory.exam}
        </p>
        <p>
          <strong>Doenças: </strong>
          {medicalAppointmentHistory.disease}
        </p>
        <p>
          <strong>Prescrião: </strong>
          {medicalAppointmentHistory.prescription}
        </p>
        <p>
          <strong>Vacina: </strong>
          {medicalAppointmentHistory.vaccine}
        </p>
      </div>
    </div>
  );
}

export default AnimalDetail;
