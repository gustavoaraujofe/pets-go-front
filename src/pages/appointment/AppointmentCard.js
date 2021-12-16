import { Link } from "react-router-dom";

function AppointmentCard(props) {
  return (
    <Link to={`/prontuario/record-detail/${props._id}`}>
      <div className="card-container mb-4">
        <div className="p-5 card-content">
          <div className="media pl-0">
            <div className="media-content">
              <p className="noto-bold">Consulta dia: {props.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AppointmentCard;

