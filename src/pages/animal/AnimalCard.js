import api from "../../apis/api";
import { useNavigate } from "react-router-dom";


function AnimalCard(props) {
  const navigate = useNavigate();
  async function handleDelete(id) {
    try {
      await api.delete(`/animal/delete/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="card-container mb-4">
      <div className="pr-5 pt-1 flex justify-end align-items-center">
        <button
          onClick={() => {
            navigate(`/animal/edit/${props._id}`);
          }}
          type="button"
          className="mb-2 mt-2 lightgreen-btn btn "
        >
          Editar
        </button>
        <button
          onClick={() => {
            handleDelete(props._id);
          }}
          type="button"
          className="mb-8 purple-btn btn"
        >
          Deletar
        </button>
      </div>
      <div className="pt-1 card-content">
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">


              <img className="h-20 w-20 rounded-full" src={props.imageUrl} alt={props.name} />

            </div>
          </div>
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6 mb-2">Idade: {props.age} anos</p>
            <p className="subtitle is-6">Peso: {props.weight}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;
