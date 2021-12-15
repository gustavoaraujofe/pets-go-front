import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { Link } from "react-router-dom";

function RecordDetail() {
  const navigate = useNavigate();
  const [recordData, setRecordData] = useState({
    clinicalSign: [],
    exam: [],
    disease: [],
    prescription: [],
    vaccine: [],
  });

  const params = useParams();

  useEffect(() => {
    async function fetchRecord() {
      try {
        const response = await api.get(
          `/medical-appointment/search/${params.id}`
        );

        setRecordData({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }

    fetchRecord();
  }, [params.id]);

  async function handleDelete(id) {
    try {
      console.log(id)
      await api.delete(`/medical-appointment/delete/${id}`);
      navigate("/prontuario");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registro
          </h1>
        </div>
        
        <button onClick={() => handleDelete(recordData._id)}>Deletar</button>

        <Link to={`/prontuario/record-edit/${recordData._id}`}>
          <p>Editar</p>
        </Link>

        <form className="forms">
          <div className="mt-5 relative rounded-md shadow-sm">
            <h2 className="pl-1 label">Sinais clínicos</h2>

            {recordData.clinicalSign.map((currentSign) => {
              return <p>{currentSign}</p>;
            })}
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <h2 className="pl-1 label">Exame</h2>
            {recordData.exam.map((currentExam) => {
              return <p>{currentExam}</p>;
            })}
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <h2 className="pl-1 label">Doenças</h2>
            {recordData.disease.map((currentDisease) => {
              return <p>{currentDisease}</p>;
            })}
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <h2 className="pl-1 label">Prescrição</h2>
            {recordData.prescription.map((currentPrescription) => {
              return <p>{currentPrescription}</p>;
            })}
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <h2 className="pl-1 label">Vacina</h2>
            {recordData.vaccine.map((currentVaccine) => {
              return <p>{currentVaccine}</p>;
            })}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecordDetail;
