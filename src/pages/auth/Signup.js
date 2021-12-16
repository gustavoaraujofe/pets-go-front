import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import "./Signup.css";
import telaBegeAzul from "../../assets/tela-bege-azul-02.png";

function Signup() {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

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

  // Valores iniciais padrão para o usuário USER
  const initialValues = {
    name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
    picture: new File([], ""),
  };

  // Validação para o usuário USER
  const validation = {
    name: Yup.string().required("Os campos são obrigatórios."),
    email: Yup.string()
      .email("E-mail inválido.")
      .required("Os campos são obrigatórios."),
    address: Yup.string().required("Os campos são obrigatórios."),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        "A senha é obrigatória e deve ter pelo menos 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais."
      )
      .required("Os campos são obrigatórios."),
  };

  // Condição que modifica os valores iniciais e a validação quando o usuário for do tipo VET
  if (params.type === "vet") {
    initialValues.crmv = "";
    initialValues.specialties = "";
    validation.crmv = Yup.number()
      .typeError("Não é um número")
      .required("Os campos são obrigatórios.");
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validation),
    onSubmit: (values) => {
      async function signup() {
        if (formik.values.password !== formik.values.confirmPassword) {
          toast.error("Senha e confirmação diferentes");
          return;
        }

        if (values.picture) {
          values.avatarUrl = await handleAvatarUpload(values.picture);
        }

        try {
          setLoading(true);
          let response = "";

          // Condição para a criação dos usuários
          if (params.type === "vet") {
            response = await api.post("/vet/signup", values);
          } else {
            response = await api.post("/user/signup", values);
          }

          setLoading(false);
          navigate("/login");
        } catch (e) {
          console.error(e.response);
          setLoading(false);
        }
      }
      signup();
    },
  });

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-0 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-5 text-center">Faça o seu cadastro</h1>
        </div>
        <form onSubmit={formik.handleSubmit} className="forms">
          <div className="mt-5 relative rounded-md shadow-sm">
            <label htmlFor="name" className="pl-1 label">
              Nome
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                formik.errors.name && formik.touched.name
                  ? "border-red-300"
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
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
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                formik.errors.email && formik.touched.email
                  ? "border-red-300"
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              required
            />
          </div>

          {formik.touched.email && formik.errors.email ? (
            <div className="mt-1 text-sm">{formik.errors.email}</div>
          ) : null}

          <div className="mt-4 relative rounded-md shadow-sm">
            <label htmlFor="address" className="pl-1 label">
              Endereço
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                formik.errors.address && formik.touched.address
                  ? "border-red-300"
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
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
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-4 sm:text-sm border-gray-300 rounded-md ${
                    formik.errors.crmv && formik.touched.crmv
                      ? "border-red-300"
                      : null
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.crmv}
                  required
                  maxLength="4"
                />
              </div>

              {formik.touched.crmv && formik.errors.crmv ? (
                <div className="mt-1 text-sm">{formik.errors.crmv}</div>
              ) : null}

              <div className="mt-4 relative rounded-md shadow-sm">
                <label htmlFor="specialties" className="pl-1 label">
                  Especialidade
                </label>
                <select
                  required
                  htmlFor="specialties"
                  id="specialties"
                  value={formik.values.specialties}
                  type="text"
                  onChange={formik.handleChange}
                  name="specialties"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
                >
                  <option value="" disabled defaultValue hidden>
                    Especialidade
                  </option>
                  <option value="clinico">Clínico Geral</option>
                  <option value="oftalmologia">Oftalmologia</option>
                  <option value="cardiologia">Cardiologia</option>
                  <option value="dermatologia">Dermatologia</option>
                  <option value="silvestres">Silvestres</option>
                </select>
              </div>
            </>
          ) : null}

          <div className="mt-4 relative rounded-md shadow-sm">
            <label htmlFor="password" className="pl-1 label">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                formik.errors.password && formik.touched.password
                  ? "border-red-300"
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
          </div>

          <div className="mt-4 relative rounded-md shadow-sm">
            <label htmlFor="confirmPassword" className="pl-1 label">
              Confirme a senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                formik.errors.password && formik.touched.password
                  ? "border-red-300"
                  : null
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              required
            />
          </div>

          {formik.touched.password && formik.errors.password ? (
            <div className="mt-1 text-sm">{formik.errors.password}</div>
          ) : null}

          <label htmlFor="avatarUrl" className="pl-1 label">
            Foto do perfil
          </label>

          <div className="file mb-4 ">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                name="avatarUrl"
                id="avatarUrl"
                onChange={(e) =>
                  formik.setFieldValue("picture", e.target.files[0])
                }
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
              type="submit"
              className={
                params.type === "user" ? "btn purple-btn" : "btn lightgreen-btn"
              }
            >
              Cadastrar
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
    </div>
  );
}

export default Signup;
