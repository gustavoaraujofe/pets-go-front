import { Link } from "react-router-dom";

function AppointmentCard(props) {
  return (
    <div className="card-container mb-4">

      <div className="p-3 card-content">
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">
              <img className="h-10 w-10 rounded-full" src="" />
            </div>
          </div>
          <div className="media-content">
            <p className="title is-5">Nome do Pet</p>
            <p className="subtitle is-6 mb-1">Data - Hora</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;