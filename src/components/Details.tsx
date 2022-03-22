import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";
import "./Details.css";

export function Details() {
    
    const [animal, setAnimal] = useState<Animal[]>([]);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [fedTime, setFedTime] = useState("");
    const [fed, setFed] = useState(false);
    const [feedAnimal, setFeedAnimal] = useState(true);
    let animalsList: [] = [];

    // Funktion ska köras direkt när man kommer till sidan
    useEffect(() => {
        getAnimalFromLs();
    }, []);

    useEffect(() => {
    }, [setFed, setFedTime])

    // Hämta från localStorage
    function getAnimalFromLs() {
        let animalObject = localStorage.getItem("animalsLs") || "[]";
        let lsAnimal = JSON.parse(animalObject);

        let animalsObject = localStorage.getItem("animalsList") || "[]";
        let lsAnimals = JSON.parse(animalsObject);

        setAnimal(lsAnimal)
        setAnimals(lsAnimals)

        for (let i = 0; i < lsAnimals.length; i++) {
            if (!lsAnimal.some((a: Animal) => a.id === lsAnimals[i].id)) {
                console.log("Hamnar i if-sats")
            } else {
                for (let j = 0; j < lsAnimal.length; j++) {
                    if (lsAnimal[j].id === lsAnimals[i].id) {
                        setFedTime(lsAnimals[i].lastFed);
                        setFed(lsAnimals[i].isFed);
                    }
                }
            }
        }


        // for (let i = 0; i < lsAnimals.length; i++) {
        //     if(!lsAnimals[i].name === lsAnimal.name) {
        //         setfedTime(lsAnimals[i].lastFed);
        //         setFed(lsAnimals[i].isFed);
        //         console.log("Hej");
                
        //     }
        // }
        
    }

    // Visa ruta om längre än fyra timmar sedan matad
    let infoHungry =
    <></>
    if (feedAnimal) {
        infoHungry = <p> Jag är hungrig, mata mig! </p>
    }

    // Visa status om matad eller ej
    let foodStatus =
    <span> Hungrig </span>
    if (fed) {
        foodStatus = <span> Mätt </span>
    }

    // Vilken info som ska skrivas ut
    let dataLs = animal.map((animal: Animal) => {
        return (
            <div className="animalDiv" key={animal.id} >
                <h2> Namn: {animal.name} </h2>
                <p> Födelseår: {animal.yearOfBirth} </p>
                <p> Latin: {animal.latinName} </p>
                <p> Beskrivning: {animal.longInfo} </p>
                <p> Mediciner: {animal.medicine} </p>
                <img className="animalImg" src={animal.imgUrl} ></img>
                <p>Status: {foodStatus} </p>
                {!fed && <button className="fedBtn" onClick={() => fedAnimal(animal.id)}>Mata djur</button>}
                <p>Senast matad: {fedTime} </p>
            </div>
        );
    });

    // Vid klick på Mata-knappen
    function fedAnimal(id: number) {

        console.log(id)

        // Sätter tiden för matningen
        setFedTime(Date);
        let feedTime = new Date;

        // Sätter till matad till true
        setFed(!fed);
        let fedBool = !fed;

        // Sätter till matad till true
        setFeedAnimal(!feedAnimal);

        // Köra funktion för att spara i ls
        let animalObject = {
            id: animal[0].id, 
            name: animal[0].name, 
            latinName: animal[0].latinName, 
            yearOfBirth: animal[0].yearOfBirth, 
            shortInfo: animal[0].shortInfo, 
            longInfo: animal[0].longInfo,
            imgUrl: animal[0].imgUrl,
            medicine: animal[0].medicine,
            isFed: fedBool,
            lastFed: feedTime
        };
        
        saveToLs(animalObject);

        // Timer som gör det möjligt att mata igen efter angiven tid
        setTimeout(() => {

            setFed(fed);

            let fedBool = fed;

            let animalObject = {
                id: animal[0].id, 
                name: animal[0].name, 
                latinName: animal[0].latinName, 
                yearOfBirth: animal[0].yearOfBirth, 
                shortInfo: animal[0].shortInfo, 
                longInfo: animal[0].longInfo,
                imgUrl: animal[0].imgUrl,
                medicine: animal[0].medicine,
                isFed: fedBool,
                lastFed: feedTime
            };

            saveToLs(animalObject);

            // removeFromLs(id);
        }, 10800000)
        // }, 10000)

        // Timer som visar om det gått mer än fyra timmar sedan matning
        setTimeout(() => {
            setFeedAnimal(feedAnimal);
        }, 14400000)
        // // }, 12000)
    }

    // Funktion för att spara till localStorage
    function saveToLs(fedAnimals: any) {
        console.log(fedAnimals);

        let animalsObject = localStorage.getItem("animalsList") || "[]";
        let animalsList = JSON.parse(animalsObject);

        // if (fedAnimals.name == animalsList.name) {
        //     console.log("Klick")
        // }

        animalsList.push(fedAnimals)
        localStorage.setItem("animalsList", JSON.stringify(animalsList));



        // if (!fedAnimals.some((fedAnimals) => fedAnimals.id === animalsList)) {
        //     animalsList.isFed = false;
        // } else {
        //     animalsList.push(fedAnimals);
        //     localStorage.setItem("animalsList", JSON.stringify(animalsList));
        // }

        // animalsList.push(fedAnimals);
        // localStorage.setItem("animalsList", JSON.stringify(animalsList));

        console.log(animalsList);
    }

    // function removeFromLs(id: number) {
    //     animalsList.splice(id, 1);

    //     localStorage.setItem("animalsList", JSON.stringify(animalsList));

    //     getAnimalFromLs();
    // }

    // Rendera HTML
    return (
        <section>
            <div id="feedAnimalInfo">
                {infoHungry}
            </div>
            {dataLs}
            <p>
                <Link to="/">Tillbaka till startsidan</Link>
            </p>
        </section>
    );
}