function AppointmentCardVet(props) {
  return (
    <div className="card-container mb-4">
      <div className="pt-1 pb-1 card-content">
        <div className=" pt-1 flex justify-end align-items-center"></div>
        <div className="media">
          <div className="media-left">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-12 rounded-full"
                src={props.avatar}
                alt={props.name}
              />
            </div>
          </div>
          <div className="minimo-h media-content">
            <p className="noto-bold is-size-6">{props.name}</p>
            <p className="subtitle is-6 mb-1 is-size-6">Tutor: {props.tutor}</p>
            <p className="subtitle is-6 is-size-6">
              Horário: {props.hour.split("h")[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCardVet;
