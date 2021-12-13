import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/api";
import { useState } from "react";
import "../login/login.css";
import * as Yup from "yup";
import telaRosaAzul from "../../../assets/tela-rosa-azul.png";
import toast, { Toaster } from "react-hot-toast";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //Define os valores iniciais dos campos do formulário
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    //Define as regras de validação em tempo real
    validationSchema: Yup.object({
      email: Yup.string()
        .email("E-mail inválido.")
        .required("Os campos são obrigatórios."),
    }),
    onSubmit: (values) => {
      //Envio de informações para o back
      async function login() {
        try {
          setLoading(true);

          const response = await api.post("/password/forgot-password", values);
          toast.success("E-mail enviado com sucesso!");

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
              Recuperação de senha
            </h2>
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="max-w-md w-full is-flex is-justify-content-center">
              <button
                type="submit"
                disabled={loading ? true : false}
                className={`btn beige-btn ${loading ? "bg-slate-300" : null}`}
              >
                Enviar e-mail
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

export default ForgotPassword;
