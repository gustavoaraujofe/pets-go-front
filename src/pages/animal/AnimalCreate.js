import api from "../../apis/api";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import toast, { Toaster } from "react-hot-toast";
import BottomBege from "../../components/bottom/BottomBege";

function AnimalCreate() {
  const { loggedInUser } = useContext(AuthContext);
  

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

  const [loading, setLoading] = useState(false);
  const params = useParams();
  
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  }

  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();

      uploadData.append("picture", file);

      const response = await api.post("/animal/upload", uploadData);

      return response.data.url;
    } catch (err) {
      console.error(err);
    }
  }

  function handleChangeFile(e) {
    setAnimalData({ ...animalData, picture: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);
    

    if (
      animalData.name === "" ||
      animalData.age === "" ||
      animalData.breed === "" ||
      animalData.weight === "" ||
      animalData.gender === "" ||
      animalData.type === ""
    ) {
      toast.error("Por favor preencha todos os campos.");
    }
    try {
      
      

      const imageUrl = await handleFileUpload(animalData.picture);

      const response = await api.post("/animal/create", {
        ...animalData,
        imageUrl: imageUrl,
        userId: loggedInUser.user.id,
      });
      navigate("/dashboard");

      setSpinner(false);
      
    } catch (err) {
      console.error(err);
      setSpinner(false);
      
    }
  }

  return (
    <div className="flex items-center justify-center pt-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div>
          <h1 className="mt-6 text-center ">
            Adicionar Pet
          </h1>
        </div>

        <form className="forms">
          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="name" className="pl-1 label">
              Nome do Pet
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
              <option value="Male">Macho</option>
              <option value="Female">Fêmea</option>
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
              disabled={spinner}
              type="submit"
              className="btn salmon-btn"
              onClick={handleSubmit}
              className={
                params.type === "user" ? "btn purple-btn" : "btn lightgreen-btn"
              }
            >
              {spinner ? (
                <>
                  <span className="mr-3 animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></span>
                  Carregando...
                </>
              ) : (
                "Adicionar"
              )}
            </button>
          </div>
        </form>
        <BottomBege />
      </div>
      <Toaster
        position="bottom-center"
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

export default AnimalCreate;
