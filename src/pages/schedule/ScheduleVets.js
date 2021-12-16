import telaBegeAzul from "../../assets/tela-bege-azul.png";
import Navbar from "../../components/navbar/Navbar";
import ScheduleLine from "../../components/table/ScheduleLine";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";

function ScheduleVets() {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);
  const [date, setDate] = useState({
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
  });

  const [schedule, setSchedule] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  });

  const [scheduleDates, setScheduleDates] = useState({});

  function handleChange(e) {
    if (e.target.checked) {
      setSchedule({
        ...schedule,
        [e.target.name]: [...schedule[e.target.name], e.target.value].sort(),
      });
    } else if (!e.target.checked) {
      const index = schedule[e.target.name].indexOf(e.target.value);
      console.log(schedule[e.target.name].length);

      if (schedule[e.target.name].length === 1) {
        setSchedule({
          ...schedule,
          [e.target.name]: [],
        });
      } else {
        schedule[e.target.name].splice(index, 1);
        setSchedule({
          ...schedule,
          [e.target.name]: schedule[e.target.name],
        });
      }
    }
  }

  function handleChangeDate(e) {
    const dateInitial = new Date(e.target.value);

    if (!String(incrementDate(1)).includes("Mon")) {
      return console.error("ERROU");
    }

    function incrementDate(days) {
      let dateNew = new Date();
      dateNew.setDate(dateInitial.getDate() + days);
      return dateNew;
    }
    const monday = incrementDate(1).toLocaleDateString();
    const tuesday = incrementDate(2).toLocaleDateString();
    const wednesday = incrementDate(3).toLocaleDateString();
    const thursday = incrementDate(4).toLocaleDateString();
    const friday = incrementDate(5).toLocaleDateString();
    const saturday = incrementDate(6).toLocaleDateString();

    setDate({
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    });
  }

  useEffect(() => {
    setScheduleDates({
      [date.monday]: [schedule.monday][0],
      [date.tuesday]: [schedule.tuesday][0],
      [date.wednesday]: [schedule.wednesday][0],
      [date.thursday]: [schedule.thursday][0],
      [date.friday]: [schedule.friday][0],
      [date.saturday]: [schedule.saturday][0],
    });
  }, [date, schedule]);

  async function handleSubmit() {
    if (!date.monday) {
      return console.error("ERROU");
    }

    try {
      setSpinner(true);
      await api.patch("/vet/schedule", scheduleDates);
      navigate("/dashboard");
    } catch (err) {
      setSpinner(false);
      console.error(err);
    }
  }

  return (
    <>
      <div className="mt-10 is-flex is-align-items-center is-flex-direction-column table-container">
        <h2 className="mb-1 is-size-5">
          <strong>Disponibilidade de horário</strong>
        </h2>
        <label>Data inicial</label>
        <input
          className="mb-5"
          name="monday"
          style={{ width: "200px", height: "30px" }}
          type="date"
          value={date.monday}
          onChange={handleChangeDate}
        ></input>

        <table className="table" >
          <thead>
            <tr>
              <th className="is-size-7">{date.monday}</th>
              <th className="is-size-7">{date.tuesday}</th>
              <th className="is-size-7">{date.wednesday}</th>
              <th className="is-size-7">{date.thursday}</th>
              <th className="is-size-7">{date.friday}</th>
              <th className="is-size-7">{date.saturday}</th>
            </tr>
          </thead>

          {date.monday ? (
            <tbody>
              <ScheduleLine handleChange={handleChange} saturday>
                08:00
              </ScheduleLine>
              <ScheduleLine handleChange={handleChange} saturday>
                09:00
              </ScheduleLine>
              <ScheduleLine handleChange={handleChange} saturday>
                10:00
              </ScheduleLine>
              <ScheduleLine handleChange={handleChange} saturday>
                11:00
              </ScheduleLine>
              <ScheduleLine handleChange={handleChange}>14:00</ScheduleLine>
              <ScheduleLine handleChange={handleChange}>15:00</ScheduleLine>
              <ScheduleLine handleChange={handleChange}>16:00</ScheduleLine>
              <ScheduleLine handleChange={handleChange}>17:00</ScheduleLine>
            </tbody>
          ) : null}
        </table>
        <button
          onClick={handleSubmit}
          disabled={spinner}
          className="btn lightgreen-btn is-size-6"
        >
          {spinner ? (
            <>
              <span className="mr-3 animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></span>
              Carregando...
            </>
          ) : (
            "Salvar alterações"
          )}
        </button>
      </div>

      <div className="flex items-center justify-center">
        <img
          alt="imagem inferior"
          className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
          src={telaBegeAzul}
        />
      </div>

      <Navbar />
    </>
  );
}

export default ScheduleVets;
