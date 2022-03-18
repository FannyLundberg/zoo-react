import axios from "axios";
import { useEffect, useState } from "react";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Home.css";

export function Home() {

    const [animals, setAnimals] = useState<Animal[]>([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
            renderData(response.data)
            // return response.data
        }
    )};

    function renderData(data: IAnimal[]) {
        
        let dataFromApi = data.map((animal: IAnimal) => {
            return ( 
                <li>
                    {/* <p>{animal.id}</p> */}
                    <p>Namn: {animal.name}</p>
                    <p> Födelseår: {animal.yearOfBirth}</p>
                    <p>{animal.shortDescription}</p>
                    {/* <p>{animal.longDescription}</p> */}
                    <img src={animal.imageUrl}></img>
                    <p>Matad: {animal.isFed}</p>
                    <p>Senast matad: {animal.lastFed}</p>
                </li>
            );   
        })
        // setAnimals(dataFromApi);
        console.log(data)
        console.log(dataFromApi)
    };

    return (
        <div>
            <ul>{animals}</ul>
            <ul>{animals.length}</ul>
        </div>
    );
}