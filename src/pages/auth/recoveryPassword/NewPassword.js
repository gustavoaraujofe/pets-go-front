//http://localhost:4000/api/v1/password/reset-password/${temporaryToken}

import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../apis/api";
import { useState } from "react";
import "../login/login.css";
import * as Yup from "yup";
import telaRosaAzul from "../../../assets/tela-rosa-azul.png";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../../../components/spinner/Spinner";

function NewPassword() {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const navigate = useNavigate();

  //Define os valores iniciais dos campos do formulário
  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    //Define as regras de validação em tempo real
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          "A senha é obrigatória e deve ter pelo menos 8 caracteres, letras maiúsculas e minúsculas, números e caracteres especiais."
        )
        .required("Os campos são obrigatórios."),
    }),
    onSubmit: (values) => {
      //Envio de informações para o back
      async function login() {
        try {
          setLoading(true);

          await api.put(`/password/reset-password/${params.token}`, values);
          setLoading(false);
          toast.success("Senha alterada com sucesso!");

          //Direciona o usuário para o dashboard
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (e) {
          setLoading(false);
          console.error(e);
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
            <h2 className="mb-5 text-center text-3xl font-extrabold text-gray-900">
              Nova senha
            </h2>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6 forms">
            <div className="mt-5 relative rounded-md shadow-sm">
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                className={`bg-white mb-0 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                  formik.errors.newPassword && formik.touched.newPassword
                    ? "border-red-300"
                    : null
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                required
                placeholder="Digite sua nova senha"
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="text-sm">{formik.errors.newPassword}</div>
              ) : null}
            </div>

            <div className="max-w-md w-full is-flex is-justify-content-center">
              <button
                type="submit"
                disabled={loading}
                className={`btn beige-btn ${loading ? "bg-slate-300" : null}`}
              >
                {loading ? (
                <>
                  <span className="mr-3 animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></span>
                  Processando...
                </>
              ) : (
                "Alterar senha"
              )}
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

export default NewPassword;
