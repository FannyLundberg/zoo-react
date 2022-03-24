import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Home.css";

export function Home() {

    const [animals, setAnimals] = useState<Animal[]>([]);
    const [animalsLs, setAnimalsLs] = useState<Animal[]>([]);
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

        // let dataFromLs = animalsList.map((animal: IAnimal) => {

        //     return new Animal (
        //         animal.id, 
        //         animal.name, 
        //         animal.latinName, 
        //         animal.yearOfBirth, 
        //         animal.shortDescription, 
        //         animal.longDescription, 
        //         animal.imageUrl, 
        //         animal.medicine, 
        //         animal.isFed, 
        //         animal.lastFed
        //     )
        // });    
        setAnimalsLs(animalsList);
    }
    

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


    // let needFood = animals.map((animal: Animal) => {

    //     let d = Date();

    //     for (let i = 0; i < animals.length; i++)
    //         if (animals[i].lastFed <= d) {
    //             return (
    //                 <div>
    //                     <h1>Hej {animal.name}</h1>
    //                 </div>
    //             )
    //         }  else {
    //             return (
    //                 <div>
    //                     <h1>Hej hej {animal.id}</h1>
    //                 </div>
    //             )
    //         }
    // });


    // Rendera HTML
    return (
        <section>
            {/* {needFood} */}
            {dataLs}
            {dataApi}
        </section>
    );
}