import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import { Link } from "react-router-dom";
import telaAzulBege from "../../assets/tela-azul-bege.png";
import pawImg from "../../assets/pata.png";



function AnimalEdit() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [animalData, setAnimalData] = useState()

    return <p>AnimalEdit</p>
}

export default AnimalEdit;