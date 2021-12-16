import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./login.css";
import "../../../assets/styles/index.css"
import * as Yup from "yup";
import telaRosaAzul from "../../../assets/tela-rosa-azul.png";

import { AuthContext } from "../../../contexts/authContext";

function Login() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Define os valores iniciais dos campos do formulário
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      type: "",
    },
    //Define as regras de validação em tempo real
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-mail inválido.")
        .required("Os campos são obrigatórios."),
      password: Yup.string().required("Os campos são obrigatórios."),
      type: Yup.string().required("Os campos são obrigatórios"),
    }),
    onSubmit: (values) => {
      //Envio de informações para o back
      async function login() {
        try {
          let response;
          setLoading(true);

          //Verifica se é vet ou tutor pra logar na rota certa
          if (values.type === "vet") {
            response = await api.post("/vet/login", values);
          }
          if (values.type === "tutor") {
            response = await api.post("/user/login", values);
          }

          //Guarda as informções do usuário no context
          setLoggedInUser({
            token: response.data.token,
            user: response.data.user,
          });

          //Salva as informações de token e user no localStorage
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              token: response.data.token,
              user: response.data.user,
            })
          );
          setLoading(false);

          //Direciona o usuário para o dashboard
          navigate("/dashboard");
        } catch (e) {
          setLoading(false);
          toast.error("Usuário ou senha incorreto");
        }
      }
      login();
    },
  }); 

  return (
    <>
      <div
        className="flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8"
        style={{ height: "80%" }}
      >
        <div className="max-w-sm w-full space-y-8">
          <div>
            <h1 className="text-center">
              Entrar na conta
            </h1>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6 forms">
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mt-5 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  type="text"
                  className={`bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                    formik.errors.email && formik.touched.email
                      ? "border-red-300"
                      : null
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                  placeholder="Digite seu e-mail"
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`bg-white mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                    formik.errors.password && formik.touched.password
                      ? "border-red-300"
                      : null
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Digite sua senha"
                />
                <div className="mt-5">
                  <select
                    className="bg-white focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.type}
                    name="type"
                    required
                  >
                    <option value="">Selecione o tipo de conta</option>
                    <option value="tutor">Tutor</option>
                    <option value="vet">Veterinário</option>
                  </select>
                </div>
                {(formik.touched.email && formik.errors.email) ||
                (formik.errors.password && formik.touched.password) ||
                (formik.touched.type && formik.errors.type) ? (
                  <div className="text-sm">
                    {formik.errors.email
                      ? formik.errors.email
                      : formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
                />
                <label
                  htmlFor="remember-me"
                  className="m-auto block text-sm noto-bold"
                >
                  Lembrar-me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="noto-bold text-indigo-600 hover:text-indigo-500"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
            </div>
            <div className="max-w-md w-full is-flex is-justify-content-center">
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`btn beige-btn ${loading ? "bg-slate-300" : null}`}
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          alt="imagem inferior"
          className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
          src={telaRosaAzul}
        />
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
    </>
  );
}

export default Login;
