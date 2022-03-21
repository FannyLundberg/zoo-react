import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Details.css";

export function Details() {
    
    const [animal, setAnimal] = useState<Animal[]>([]);
    const [fedTime, setfedTime] = useState(Date);
    const [fed, setFed] = useState(false);


    useEffect(() => {
        getAnimalFromLs();
    }, []);


    // Hämta från ls
    function getAnimalFromLs() {
        let animalObject = localStorage.getItem("animalsLs") || "[]";
        let lsAnimal = JSON.parse(animalObject);

        console.log(lsAnimal)

        setAnimal(lsAnimal)
    }


    // Om matad ska man inte kunna mata igen
    let ableToFed =
    <button className="fedBtn" onClick={fedAnimal}>Mata </button>
    if (fed) {
        ableToFed = <button className="fedBtn" disabled>Redan matad</button>
    } 


    // Vilken info som ska skrivas ut
    let dataLs = animal.map((animal: Animal) => {
        return (
            <div className="animalDiv" key={animal.name} >
                <h2> Namn: {animal.name} </h2>
                <p> Födelseår: {animal.yearOfBirth} </p>
                <p> Latin: {animal.latinName} </p>
                <p> Beskrivning: {animal.longInfo} </p>
                <p> Mediciner: {animal.medicine} </p>
                <img className="animalImg" src={animal.imgUrl} ></img>
                <p>{animal.isFed}</p>
                {ableToFed}
                <p>Senast matad: {fedTime} </p>
            </div>
        );
    });


    // Vid klick på Mata-knappen
    function fedAnimal() {

        let fedTime = new Date();
        console.log(fedTime)

        setFed(!fed);

        console.log(fed)

        // setfedTime(fedTime);
    }


    return (
        <section>
            {dataLs}
            <p><Link to="/">Tillbaka till startsidan</Link></p>
        </section>
    );
}