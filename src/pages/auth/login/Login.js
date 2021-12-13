import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../apis/api";
import { useContext, useState } from "react";
import "./login.css";
import * as Yup from "yup";

import { AuthContext } from "../../../contexts/authContext";

function Login() {
  const { setLoggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-mail inválido.")
        .required("Os campos são obrigatórios."),
      password: Yup.string().required("Os campos são obrigatórios."),
    }),
    onSubmit: (values) => {
      async function login() {
        try {
          setLoading(true);
          const response = await api.post("/vet/login", values);
          console.log(response.data);

          setLoggedInUser({
            token: response.data.token,
            user: response.data.user,
          });

          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              token: response.data.token,
              user: response.data.user,
            })
          );
          setLoading(false);
          navigate("/");
        } catch (e) {
          setLoading(false);
          console.error(e);
        }
      }
      login();
    },
  });

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Entrar em sua conta
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 space-y-6"
        >
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="sr-only" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="text"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
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
              <label className="sr-only" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-300"
                    : null
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Digite sua senha"
              />
              {(formik.touched.email && formik.errors.email) ||
              (formik.errors.password && formik.touched.password) ? (
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
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 m-auto block text-sm text-gray-900"
              >
                Lembrar-me
              </label>
            </div>
            <div className="text-sm">
              <Link
                to="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              disabled={loading ? true : false}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                loading ? "bg-slate-300" : null
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
