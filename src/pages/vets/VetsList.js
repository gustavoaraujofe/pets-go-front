import { Link } from "react-router-dom";
import pawImg from "../../assets/pata.png";
import telaVerdeRosa from "../../assets/tela-verde-rosa.png";
import api from "../../apis/api";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function VetsList() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/vet/list`);

        const userDataFilter = response.data.filter((currentVet) => {
          return currentVet.specialties.includes(params.specialties);
        });

        setUserData([...userDataFilter]);
        setTimeout(() => setLoading(false), 1000);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [params.specialties]);

 
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="pb-20">
          <section className="mt-4 flex items-center justify-between mr-8 ml-8">
            <h1>Veterinários</h1>
          </section>

          <div className="ml-12 paw-container-right">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>

          {userData.map((currentVet) => {
            return (
              <div
                key={currentVet._id}
                className="has-background-white card-container mb-4"
              >
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={currentVet.avatarUrl}
                          alt={currentVet.name}
                        />
                      </div>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{currentVet.name}</p>
                      <p className="subtitle is-6 mb-2">
                        CRMV: {currentVet.crmv}
                      </p>
                      <p className="subtitle is-6">{currentVet.rating}</p>
                    </div>
                  </div>
                  <div className="max-w-md w-full is-flex is-justify-content-center">
                    <Link to={`/vet/schedule/${currentVet._id}`}>
                      <button className="mt-2 small-btn blue-btn">
                        Escolher
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="ml-5 pt-1 paw-container-left">
            <img alt="pata" className="paw-medium" src={pawImg} />
          </div>

          <div className="flex items-center justify-center">
            <img
              alt="imagem inferior"
              className="img-bottom pt-0 pb-20 sm:px-6 lg:px-8"
              src={telaVerdeRosa}
            />
          </div>
          <Navbar />
        </div>
      )}
    </>
  );
}

export default VetsList;
