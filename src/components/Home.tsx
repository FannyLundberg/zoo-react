import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Home.css";

export function Home() {

    const [animals, setAnimals] = useState<Animal[]>([]);
    let animal: IAnimal[] = [];
    let animalList: IAnimal[] = [];

    useEffect(() => {
        getData();
    }, []);
    // }, [animals]);

    function getData() {
        axios
        .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
        .then((response) => {
            renderData(response.data)

            let data = response.data;

            for (let i = 0; i < animalList.length; i++) {

                let animals = localStorage.getItem("animalLs") || "[]";
                animalList = JSON.parse(animals);
    
                animalList.push(data[i]);
                localStorage.setItem("animalLs", JSON.stringify(animalList));
            }   

            // let dataFromApi = response.data.map((animal: IAnimal, i) => {
            //     return ( 
            //         <div key={i}>
            //             <h2>Namn: {animal.name}</h2>
            //             <p> Födelseår: {animal.yearOfBirth}</p>
            //             <p>{animal.shortDescription}</p>
            //             <img src={animal.imageUrl}></img>
            //             <button onClick={moreInfoBtn}><Link to="/details">Mer om {animal.name}</Link></button>
            //         </div>
            //     );  
            // })
            // setAnimals(dataFromApi);
        }
    )};

    function renderData(data: IAnimal[]) {
        
        let dataFromApi = data.map((animal: IAnimal, i) => {
            return ( 
                <div key={i} id="animalDiv">
                    <h2>Namn: {animal.name}</h2>
                    <p> Födelseår: {animal.yearOfBirth}</p>
                    <p>{animal.shortDescription}</p>
                    <img src={animal.imageUrl}></img>
                    <button><Link to="/details">Mer om {animal.name}</Link></button>
                    {/* <button onClick={moreInfoBtn}><Link to="/details">Mer om {animal.name}</Link></button> */}
                </div>
            );  
            
        })
        // setAnimals(dataFromApi); 
        // setFunction();
        console.log(data)
        console.log(dataFromApi)
    };

    // function moreInfoBtn(i: number) {
    //     console.log("Klick");

    //     // let oneAnimal = animal[i];

    //     // saveToLs(oneAnimal);
    // }


    // function saveToLs(oneAnimal: IAnimal) {
    //     let animalLs = localStorage.getItem("animalsLs") || "[]";
    //     animalLs = JSON.parse(animalLs);

    //     animalLs.push(oneAnimal);
    //     localStorage.setItem("productCart", JSON.stringify(animalLs));
    // }


    // function setFunction() {
    //     setAnimals(dataFromApi);
    // }

    return (
        <section>
            <article>{animals}</article>
        </section>
    );
}