import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Home.css";

export function Home() {

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalsLs, setAnimalsLs] = useState<Animal[]>([]);
    const [hungryAnimals, setHungryAnimals] = useState<Animal[]>([]);
    let listOfAnimal: IAnimal[] = [];


    // Funktion ska köras direkt när man kommer till sidan om ls är 0
    useEffect(() => {
        if (localStorage.length > 0) return 
        getDataFromApi();
    });


    // Funktion ska köras direkt när man kommer till sidan om ls större än 0
    useEffect(() => {
        getDataFromLs();
    }, []);


    // Hämta data från API:t
     function getDataFromApi() {
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


    function getDataFromLs() {
        let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
        let animalsList = JSON.parse(animalsObject);

        // För att se vilka som är fed = false och skicka de till en funktion
        for (let i = 0; i < animalsList.length; i++) {
            if (animalsList[i].isFed === false) {
                needFood(animalsList[i]);
                console.log(animalsList[i])
            } 
        }
        setAnimalsLs(animalsList);
    }
    

    // Funktion för att skapa en ny lista
    function needFood(animal: Animal) {
        hungryAnimals.push(animal);
    }


    // Vad som ska presenteras om respektive hungrigt djur i listan
    let hungry = hungryAnimals.map((hungryAnimal: Animal) => {
        return (
            <React.Fragment key={hungryAnimal.id}>
                <h3>{hungryAnimal.name}</h3>
            </React.Fragment>
        );
    });


    // Vad som ska presenteras om respektive djur i listan
    let dataApi = animals.map((animal: Animal) => {
        return (
            <div className="animalsDiv" key={animal.id}>
                <h2>Namn: {animal.name}</h2>
                <p> Födelseår: {animal.yearOfBirth}</p>
                <p>{animal.shortDescription}</p>
                <img className="animalsImg" src={animal.imageUrl}></img>
                <button>
                    <Link to={`/details/${animal.id}`}>Mer info</Link>
                </button> 
            </div>
        );
    });


    // Vad som ska presenteras om respektive djur i listan
    let dataLs = animalsLs.map((animalLs: Animal) => {
        return (
            <div className="animalsDiv" key={animalLs.name}>
                <h2>Namn: {animalLs.name}</h2>
                <p> Födelseår: {animalLs.yearOfBirth}</p>
                <p> {animalLs.shortDescription}</p>
                <img className="animalsImg" src={animalLs.imageUrl}></img>
                <button>
                    <Link to={`/details/${animalLs.id}`}>Mer info</Link>
                </button> 
            </div>
        );
    });


    // Rendera HTML
    return (
        <section>
            <div className="hungryAnimalsDiv">
                <h2>Hej, Vi är hungriga. Mata oss gärna! </h2>
                {hungry}
            </div>
            {dataLs}
            {dataApi}
        </section>
    );
}