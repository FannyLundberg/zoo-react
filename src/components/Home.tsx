import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            // let dataFromApi = response.data.map((animal: IAnimal) => {
            //     return ( 
            //         <div>
            //             {/* <p>{animal.id}</p> */}
            //             <h2>Namn: {animal.name}</h2>
            //             <p> Födelseår: {animal.yearOfBirth}</p>
            //             <p>{animal.shortDescription}</p>
            //             {/* <p>{animal.longDescription}</p> */}
            //             <img src={animal.imageUrl}></img>
            //             {/* <p>Matad: {animal.isFed}</p> */}
            //             <p>Senast matad: {animal.lastFed}</p>
            //             <button><Link to="/details">Mer om {animal.name}</Link></button>
            //         </div>
            //     );  
            // })
            // setAnimals(dataFromApi);
        }
    )};
    

    function renderData(data: IAnimal[]) {
        
        let dataFromApi = data.map((animal: IAnimal) => {
            return ( 
                <div id="animalDiv">
                    {/* <p>{animal.id}</p> */}
                    <h2>Namn: {animal.name}</h2>
                    <p> Födelseår: {animal.yearOfBirth}</p>
                    <p>{animal.shortDescription}</p>
                    {/* <p>{animal.longDescription}</p> */}
                    <img src={animal.imageUrl}></img>
                    {/* <p>Matad: {animal.isFed}</p> */}
                    <p>Senast matad: {animal.lastFed}</p>
                    <button><Link to="/details">Mer om {animal.name}</Link></button>
                </div>
            );  
            
        })
        // setAnimals(dataFromApi); 
        // setFunction();
        console.log(data)
        console.log(dataFromApi)
    };

    // function setFunction() {
    //     setAnimals(dataFromApi);
    // }

    return (
        <section>
            <article>{animals}</article>
        </section>
    );
}