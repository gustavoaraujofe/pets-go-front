import api from "../../apis/api";
import { useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/delete-icon.png";
import editIcon from "../../assets/edit-icon.png";

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
      <div className="pt-1 pb-1 card-content">
        <div className=" pt-1 flex justify-end align-items-center">
          <img
            onClick={() => {
              navigate(`/animal/edit/${props._id}`);
            }}
            type="button"
            src={editIcon}
            className="icon-img position-edit-img"
          />
          <img
            onClick={() => {
              handleDelete(props._id);
            }}
            src={deleteIcon}
            type="button"
            className="icon-img position-delete-img"
          />
        </div>
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">
              <img
                className="h-20 w-20 rounded-full"
                src={props.imageUrl}
                alt={props.name}
              />
            </div>
          </div>
          <div className="media-content">
            <p className="title is-4">{props.name}</p>
            <p className="subtitle is-6 mb-1">Idade: {props.age} anos</p>
            <p className="subtitle is-6">Peso: {props.weight}kg</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;
