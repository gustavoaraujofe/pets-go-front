import api from "../../apis/api";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import "./NewRecord.css";
import { Link } from "react-router-dom";

function NewRecord() {
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [prontuarioData, setProntuarioData] = useState({
    clinicalSign: [],
    exam: [],
    disease: [],
    prescription: [],
    vaccine: [],
  });

  function handleChange(e) {
    if (e.target.files) {
      return setProntuarioData({
        ...prontuarioData,
        [e.target.name]: e.target.files,
      });
    }

    setProntuarioData({ ...prontuarioData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/medical-appointment/create", {
        ...prontuarioData,
        vetId: loggedInUser.user.id,
      });

      navigate("/prontuario");
      console.log(response);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Adicionar Registro
          </h1>
        </div>

        <form className="forms">
          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="clinicalSign" className="pl-1 label">
              Sinais clínicos
            </label>

            <textarea
              required
              id="clinicalSign"
              value={prontuarioData.clinicalSign}
              type="text"
              onChange={handleChange}
              name="clinicalSign"
              className={`h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pl-2 pr-2 sm:text-sm border-gray-300 rounded-md `}
            />
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="exam" className="pl-1 label">
              Exame
            </label>

            <textarea
              required
              id="exam"
              value={prontuarioData.exam}
              type="text"
              onChange={handleChange}
              name="exam"
              className={`h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pl-2 pr-2 sm:text-sm border-gray-300 rounded-md `}
            />
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="disease" className="pl-1 label">
              Doenças
            </label>

            <textarea
              required
              id="disease"
              value={prontuarioData.disease}
              type="text"
              onChange={handleChange}
              name="disease"
              className={`h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pl-2 pr-2 sm:text-sm border-gray-300 rounded-md `}
            />
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="prescription" className="pl-1 label">
              Prescrição
            </label>

            <textarea
              required
              id="prescription"
              value={prontuarioData.prescription}
              type="text"
              onChange={handleChange}
              name="prescription"
              className={`h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pl-2 pr-2 sm:text-sm border-gray-300 rounded-md `}
            />
          </div>

          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="vaccine" className="pl-1 label">
              Vacina
            </label>

            <textarea
              required
              id="vaccine"
              value={prontuarioData.vaccine}
              type="text"
              onChange={handleChange}
              name="vaccine"
              className={`h-20 focus:ring-indigo-500 focus:border-indigo-500 block w-full pt-1 pl-2 pr-2 sm:text-sm border-gray-300 rounded-md `}
            />
          </div>

          <div className="max-w-md w-full is-flex is-justify-content-center">
            <button
              onClick={handleSubmit}
              type="submit"
              className="mt-5 btn blue-btn"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewRecord;