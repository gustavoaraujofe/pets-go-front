import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { Link } from "react-router-dom";
import telaAzulBege from "../../assets/tela-azul-bege.png";
import pawImg from "../../assets/pata.png";

function AnimalEdit() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animalData, setAnimalData] = useState({
    name: "",
    age: "",
    breed: "",
    weight: "",
    gender: "",
    picture: new File([], ""),
    imageUrl: "",
    type: "",
  });

  useEffect(() => {
    async function fetchAnimal() {
      setIsSending(true);
      try {
        const response = await api.get(
          `/animal/search/${id}`
        );
        delete response.data._id;
        setAnimalData({ ...response.data });
        setIsSending(false);
      } catch (err) {
        console.error(err);
        setIsSending(false);
      }
    }

    fetchAnimal();
  }, [id]);

  function handleChange(e) {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  }

  function handleChangeFile(e) {
    setDataUser({ ...dataUser, picture: e.target.files[0] });
  }
  

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Editar PET
        </h2>
      </div>

      <form className="forms">
      <div className="mt-4 relative rounded-md shadow-sm">
          <label htmlFor="type" className="pl-1 label">
            Tipo
          </label>
          <select
            required
            htmlFor="type"
            id="type"
            value={animalData.type}
            type="text"
            onChange={handleChange}
            name="type"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
          >
            <option value="select">Selecionar</option>
            <option value="dog">Cachorro</option>
            <option value="cat">Gato</option>
            <option value="rabbit">Coelho</option>
            <option value="bird">Ave</option>
            <option value="wild">Silvestres</option>
            <option value="others">Outros</option>
          </select>
        </div>
        <div className="mt-5 relative rounded-md shadow-sm">
          <label htmlFor="name" className="pl-1 label">
            Nome do PET
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
            onChange={handleChange}
            value={animalData.name}
            required
          />
        </div>
        <div className="mt-5 relative rounded-md shadow-sm">
          <label htmlFor="age" className="pl-1 label">
            Idade
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md `}
            onChange={handleChange}
            value={animalData.age}
            required
          />
        </div>
        <div className="mt-5 relative rounded-md shadow-sm">
          <label htmlFor="weight" className="pl-1 label">
            Peso
          </label>
          <input
            type="number"
            name="weight"
            id="weight"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md `}
            onChange={handleChange}
            value={animalData.weight}
            required
          />
        </div>
        <div className="mt-5 relative rounded-md shadow-sm">
          <label htmlFor="breed" className="pl-1 label">
            Raça
          </label>
          <input
            type="text"
            name="breed"
            id="breed"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md `}
            onChange={handleChange}
            value={animalData.breed}
            required
          />
        </div>

        <div className="mt-4 relative rounded-md shadow-sm">
          <label htmlFor="gender" className="pl-1 label">
            Sexo
          </label>
          <select
            required
            htmlFor="gender"
            id="gender"
            value={animalData.gender}
            type="text"
            onChange={handleChange}
            name="gender"
            className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
          >
            <option value="" disabled defaultValue hidden>
              Gênero
            </option>
            <option value="male">Macho</option>
            <option value="female">Fêmea</option>
          </select>
        </div>

        <label htmlFor="imageUrl" className="pl-1 label">
          Foto do pet
        </label>

        <div className="file mb-4 ">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              name="picture"
              id="imageUrl"
              onChange={handleChangeFile}
            />
            <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">Choose a file…</span>
            </span>
          </label>
        </div>

        <div className="max-w-md w-full is-flex is-justify-content-center">
          <button
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
            className="button is-info"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default AnimalEdit;
