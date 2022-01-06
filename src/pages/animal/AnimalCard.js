import api from "../../apis/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";

function AnimalCard(props) {
  const [toggleDelete, setToggleDelete] = useState(false);
  const navigate = useNavigate();
  async function handleDelete(id) {
    try {
      await api.delete(`/animal/delete/${id}`);
      navigate("/dashboard");
      setToggleDelete(false)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card-container mb-4">
      <div className="pt-3 pb-3 card-content">
        <div className=" pt-1 flex justify-end align-items-center">
          <img
            onClick={() => {
              navigate(`/animal/edit/${props._id}`);
            }}
            type="button"
            src={editIcon}
            className="icon-img position-edit-img"
            alt="editar"
          />
          <img
            onClick={() => setToggleDelete(true)}
            src={deleteIcon}
            type="button"
            className="icon-img position-delete-img"
            alt="deletar"
          />
        </div>

        <Link to={`/animal/detail/${props._id}`}>
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={props.imageUrl}
                alt={props.name}
              />
            </div>
          </div>
          <div className="minimo-h media-content">
            <p className="noto-bold">{props.name}</p>
            <p className="subtitle is-6 mb-1">Idade: {props.age}</p>
            <p className="subtitle is-6">Peso: {props.weight}</p>
          </div>
        </div>
        </Link>

      </div>
      <div className="container" id="app">
          <div className={`modal ${toggleDelete ? "is-active" : null}`}>
            <div className="modal-background "></div>
            <div className="modal-content is-flex is-justify-content-center is-flex-direction-column">
              <h3 className="has-text-centered has-text-white is-size-3">
                Deseja excluir esse pet?
              </h3>
              <div className="is-flex is-align-items-center is-justify-content-center mt-4">
                <button onClick={() => {
              handleDelete(props._id);
            }} className="button salmon-btn bg-slate-300 mr-5">
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
  );
}

export default AnimalCard;
