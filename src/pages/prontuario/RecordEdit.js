import api from "../../apis/api";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { Link } from "react-router-dom";
import telaBegeAzul from "../../assets/tela-bege-azul.png"

function RecordEdit(){
    const navigate = useNavigate();
    const params = useParams();
  
    const [prontuarioData, setProntuarioData] = useState({
        clinicalSign: [],
        exam: [],
        disease: [],
        prescription: [],
        vaccine: [],
      });
  
    useEffect(() => {
      async function fetchProntuario() {
        try {
          const response = await api.get(
            `/medical-appointment/search/${params.id}`
          );
          delete response.data._id;
          setProntuarioData({
            ...response.data
          });
        } catch (err) {
          console.error(err);
        }
      }
      fetchProntuario();
    }, [params.id]);
  
    function handleChange(event) {
        setProntuarioData({
        ...prontuarioData,
        [event.target.name]: event.target.value,
      });
    }
  
    async function handleSubmit(event) {
      event.preventDefault();
  
      setProntuarioData({
        ...prontuarioData
      });

      try {
          await api.put(
            `/medical-appointment/edit/${params.id}`,
            prontuarioData
          );
          navigate("/vet/prontuario/61bb66a51575e028e4e8a277");

      } catch (error) {
        console.error(error.response.data);
      }
    }


    return (
        <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Editar Registro
            </h1>
          </div>
  
          <form className="forms ">
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
                className="mt-5 btn lightgreen-btn"
              >
                Editar
              </button>
            </div>
          </form>
          <div className="flex items-center justify-center">
          <img
            alt="imagem inferior"
            className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
            src={telaBegeAzul}
          />
        </div>
        </div>
      </div>
    )
}


export default RecordEdit;