import Navbar from "../../components/navbar/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Signup.css";

function EditAccount() {
  const [spinner, setSpinner] = useState(false);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    address: "",
    crmv: "",
    specialties: "",
    avatarUrl: "",
    picture: new File([], ""),
  });

  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function userData() {
      try {
        let response;
        if (params.type === "vet") {
          response = await api.get("/vet/profile");
        } else {
          response = await api.get("user/profile");
        }
        setDataUser(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    userData();
  }, []);

  // Upload de arquivos
  async function handleAvatarUpload(file) {
    try {
      const uploadData = new FormData();

      uploadData.append("picture", file);

      let response = "";

      // Condição para o envio dos arquivos
      if (params.type === "vet") {
        response = await api.post("/vet/upload", uploadData);
      } else {
        response = await api.post("/user/upload", uploadData);
      }

      return response.data.url;
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteAccount() {
    try {

      if (params.type === "vet") {
        await api.delete("/vet/delete");
      } else {
        await api.delete("/user/delete");
      }
      setToggleDelete(false)
      toast.success("Cadastro excluído com sucesso!")
      localStorage.removeItem("loggedInUser")
      setTimeout(() =>{
        navigate("/")
      }, 3000)
      

    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setDataUser({ ...dataUser, [e.target.name]: e.target.value });
  }

  function handleChangeFile(e) {
    setDataUser({ ...dataUser, picture: e.target.files[0] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSpinner(true);

    if (dataUser.password !== dataUser.confirmPassword) {
      return;
    }
    let avatarUrl;
    if (dataUser.picture) {
      avatarUrl = await handleAvatarUpload(dataUser.picture);
    }

    try {
      let response = "";

      // Condição para a criação dos usuários
      if (params.type === "vet") {
        response = await api.patch("/vet/edit-vet", { ...dataUser, avatarUrl });
      } else {
        response = await api.patch("/user/edit", { ...dataUser, avatarUrl });
      }

      setSpinner(false);
      toast.success("Cadastro atualizado com sucesso!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (e) {
      console.error(e.response);
      setSpinner(false);
    }
  }

  return (
    <div
      className="mt-10 pt-0 pb-20 px-4 sm:px-6 lg:px-8 is-flex is-justify-content-center"
      style={{ height: "80%" }}
    >
      <div className="max-w-md w-full space-y-8 pb-20">
        <div>
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Alterar cadastro
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="forms">
          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="name" className="pl-1 label">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md `}
              onChange={handleChange}
              value={dataUser.name}
              required
            />
          </div>

          <div className="mt-3 relative rounded-md shadow-sm">
            <label htmlFor="email" className="pl-1 label">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md `}
              onChange={handleChange}
              value={dataUser.email}
              required
            />
          </div>

          <div className="mt-4 relative rounded-md shadow-sm">
            <label htmlFor="address" className="pl-1 label">
              Endereço
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
              onChange={handleChange}
              value={dataUser.address}
            />
          </div>

          {params.type === "vet" ? (
            <>
              <div className="mt-4 relative rounded-md shadow-sm">
                <label htmlFor="crmv" className="pl-1 label">
                  CRMV
                </label>
                <input
                  type="text"
                  name="crmv"
                  id="crmv"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-4 sm:text-sm border-gray-300 rounded-md`}
                  onChange={handleChange}
                  value={dataUser.crmv}
                  required
                  maxLength="4"
                />
              </div>

              <div className="mt-4 relative rounded-md shadow-sm">
                <label htmlFor="specialties" className="pl-1 label">
                  Especialidade
                </label>
                <select
                  required
                  htmlFor="specialties"
                  id="specialties"
                  value={dataUser.specialties}
                  type="text"
                  onChange={handleChange}
                  name="specialties"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
                >
                  <option value="" disabled defaultValue hidden>
                    Especialidade
                  </option>
                  <option value="clinico geral">Clínico Geral</option>
                  <option value="oftalmologia">Oftalmologia</option>
                  <option value="cardiologia">Cardiologia</option>
                  <option value="dermatologia">Dermatologia</option>
                  <option value="silvestres">Silvestres</option>
                </select>
              </div>
            </>
          ) : null}

          <label htmlFor="avatarUrl" className="pl-1 label">
            Foto do perfil
          </label>

          <div className="file mb-5">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                onChange={handleChangeFile}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Selecionar foto…</span>
              </span>
            </label>
          </div>
          <div className="max-w-md w-full is-flex is-justify-content-center">
            <button
              disabled={spinner}
              type="submit"
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
                "Salvar alterações"
              )}
            </button>
          </div>
          <div className="max-w-md w-full is-flex is-justify-content-center mt-3">
            <button
              onClick={() => setToggleDelete(true)}
              type="button"
              className="button salmon-btn mb-10 is-size-6 p-5"
            >
              Excluir conta
            </button>
          </div>
        </form>
        <div className="container" id="app">
          <div className={`modal ${toggleDelete ? "is-active" : null}`}>
            <div className="modal-background "></div>
            <div className="modal-content is-flex is-justify-content-center is-flex-direction-column">
              <h3 className="has-text-centered has-text-white is-size-3">
                Deseja excluir totalmente sua conta?
              </h3>
              <div className="is-flex is-align-items-center is-justify-content-center mt-4">
                <button onClick={deleteAccount} className="button salmon-btn bg-slate-300 mr-5">
                  Sim
                </button>
                <button
                  onClick={() => setToggleDelete(false)}
                  className="button gray-btn"
                  id="showModal"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster
        position="top-center"
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
      <Navbar />
    </div>
  );
}

export default EditAccount;
