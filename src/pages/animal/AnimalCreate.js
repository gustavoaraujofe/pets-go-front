import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../apis/api";
import { useState } from "react";
import { Link } from "react-router-dom";

function AnimalCreate() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      breed: "",
      weight: "",
      sex: "",
      imageUrl: "",
      medicalRecord: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("O campo é obrigatório."),
      age: Yup.string().required("O campo é obrigatório."),
      breed: Yup.string().required("O campo é obrigatório."),
      sex: Yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: (values) => {  
      async function create() {
        try{
          setLoading(true);

          const response = await api.post("/animals", values);
          console.log(response.data);
          setLoading(false);
        }catch(err) {
          console.log(err);
          setLoading(false);
        }
      }
      create()
    }
  });

  return (
    <div className="min-h-full flex items-center justify-center pt-0 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        
        <form onSubmit={formik.handleSubmit} className="forms">
            <div className="mt-5 relative rounded-md shadow-sm">
              <label htmlFor="name" className="pl-1 label">
                Nome do PET
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
            <div className="mt-5 relative rounded-md shadow-sm">
              <label htmlFor="age" className="pl-1 label">
                Idade
              </label>
              <input
                type="number"
                name="age"
                id="age"
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                  formik.errors.age && formik.touched.age
                    ? "border-red-300"
                    : null
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
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
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                  formik.errors.weight && formik.touched.weight
                    ? "border-red-300"
                    : null
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.weight}
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
                className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md ${
                  formik.errors.breed && formik.touched.breed
                    ? "border-red-300"
                    : null
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.breed}
                required
              />
            </div>
            
            <div className="mt-4 relative rounded-md shadow-sm">
                <label htmlFor="sex" className="pl-1 label">
                  Sexo
                </label>
                <select
                  required
                  htmlFor="sex"
                  id="sex"
                  value={formik.values.sex}
                  type="text"
                  onChange={formik.handleChange}
                  name="sex"
                  className={`focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md`}
                >
                  <option value="male">Macho</option>
                  <option value="female">Fêmea</option>
                </select>
              </div>
              <div className="max-w-md w-full is-flex is-justify-content-center">
              <Link to="/dashboard">
                <button disabled={loading} type="submit" className="button is-info">
                  Adicionar
                </button>
              </Link> 
            
          </div>
        </form>
      </div>
    </div>
  );
  
}


export default AnimalCreate;