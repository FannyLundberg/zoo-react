import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Home.css";

export function Home() {

    const [animals, setAnimals] = useState<Animal[]>([]);
    let listOfAnimal: IAnimal[] = [];

    // Funktion ska köras direkt när man kommer till sidan
    useEffect(() => {
        if (animals.length > 0) return 
        getData();
    });

    // Hämta data från API:t
     function getData() {
        axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {

            let dataFromApi = response.data.map((animal: IAnimal) => {

                listOfAnimal.push(animal)
                localStorage.setItem("listOfAnimals", JSON.stringify(listOfAnimal));

                return new Animal (
                    animal.id, 
                    animal.name, 
                    animal.latinName, 
                    animal.yearOfBirth, 
                    animal.shortDescription, 
                    animal.longDescription, 
                    animal.imageUrl, 
                    animal.medicine, 
                    animal.isFed, 
                    animal.lastFed
                )
 
            });    
            setAnimals(dataFromApi);
        }
    )};

    // Vad som ska presenteras om respektive djur i listan
    let dataApi = animals.map((animal: Animal) => {
        return (
            <div className="animalsDiv" key={animal.id}>
                <h2>Namn: {animal.name}</h2>
                <p> Födelseår: {animal.yearOfBirth}</p>
                <p>{animal.shortInfo}</p>
                <img className="animalsImg" src={animal.imgUrl}></img>
                {/* <button onClick={() => moreInfoBtn(animal.id - 1)}> */}
                <button>
                    <Link to={`/details/${animal.id}`}>Mer info</Link>
                </button> 
            </div>
        );
    });

    // // Vid klick på Mer om djuret
    // function moreInfoBtn(id: any) {
    //     console.log("Klick på knapp");

    //     // let clickedAnimal = animal[id];
    //     // saveToLs(clickedAnimal);
    // };

    // // Spara till localStorage
    // function saveToLs(clickedAnimal: any) {
    //     console.log(clickedAnimal);

    //     animalList.push(clickedAnimal);
    //     localStorage.setItem("animalsLs", JSON.stringify(animalList));
    // };

    // Rendera HTML
    return (
        <section>
              {dataApi}
        </section>
    );
}