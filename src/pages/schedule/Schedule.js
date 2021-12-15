import telaBegeAzul from "../../assets/tela-bege-azul.png";
import Navbar from "../../components/navbar/Navbar";


function Schedule() {
  return (
    <>
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

export default Schedule;
