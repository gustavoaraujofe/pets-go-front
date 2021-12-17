
function AppointmentCard(props) {
 
  return (
      <div className="card-container mb-4">
        <div className="p-5 card-content">
          <div className="media pl-0">
            <div className="media-content">
              <p className="noto-bold">Consulta dia: {props.date}</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default AppointmentCard;

