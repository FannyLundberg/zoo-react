import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Details.css";

export function Details() {

    const [animalId, setAnimalId] = useState(Number(useParams().id));
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [fed, setFed] = useState(false);
    const [fedTime, setFedTime] = useState("");
    const [feedAnimal, setFeedAnimal] = useState(true);

    let params = useParams();
    let animalsList: Animal[] = []; 

    useEffect(() => {
        if (params.id) {
            setAnimalId(parseInt(params.id));
        }

        getDataFromLs();
    }, []);


    useEffect(() => { 
    }, [animalId, setFed, setFedTime])


    function getDataFromLs() {
        
        let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
        animalsList = JSON.parse(animalsObject);
            
        let dataFromLs = animalsList.map((animal: IAnimal) => {

            if (animal.id === animalId) {
                if (animal.isFed === true) {
                    cantFeedNow(animal);
                    
                    console.log(animal)
                } else {
                    setFedTime(animal.lastFed)
                }
            }

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
        setAnimals(dataFromLs);
    }


    function cantFeedNow(animal: Animal) {

        setFed(!fed);

        setFeedAnimal(!feedAnimal);
        
        let lastfed = animal.lastFed;

        setFedTime(lastfed);
    }


    function fedAnimal(animal: Animal) {
        // Sätter matad till true
        setFed(!fed);

        // Sätter mata till true
        setFeedAnimal(!feedAnimal);
        
        animal.isFed = true;

        animal.lastFed = Date();

        // Sätter tiden för matningen
        setFedTime(Date);

        // Kör funktion för att spara i ls
        saveToLs(animal);

        //Timer som gör det möjligt att mata igen efter angiven tid
        setTimeout(() => {
            setFed(fed);
            
            animal.isFed = false;
    
            saveToLs(animal);
    
        // }, 10800000)
        }, 20000)

        // Timer som visar om det gått mer än fyra timmar sedan matning
        setTimeout(() => {
            setFeedAnimal(feedAnimal);

        // }, 14400000)
        }, 22000)
    }

    function saveToLs(animal: Animal) {

        let fedAnimals = [];
        fedAnimals.push(animal);

        let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
        let animalsList = JSON.parse(animalsObject);

        for (let i = 0; i < animalsList.length; i++) {
            if (fedAnimals.some((animal: Animal) => animal.id === animalsList[i].id)) {

                // Lägg till nya objektet
                animalsList.push(animal);

                // Ta bort gamla objektet med det id:t
                animalsList.splice(i, 1)

                localStorage.setItem("listOfAnimals", JSON.stringify(animalsList));

                return
            } 
        }
    }

    
    // Visa ruta om längre än fyra timmar sedan matad
    let infoHungry =
    <></>
    if (feedAnimal) {
        infoHungry = <p> Jag är hungrig, mata mig gärna! </p>
    }


    // Visa status om matad eller ej
    let foodStatus =
    <span> Hungrig </span>
    if (fed) {
        foodStatus = <span> Mätt </span>
    }


    // Vilken info som ska skrivas ut
    let dataLs = animals.map((animal: Animal) => {
        if (animalId === animal.id) {
            return (
                <div className="animalDiv" key={animal.id} >
                    <h2> Namn: {animal.name} </h2>
                    <p> Födelseår: {animal.yearOfBirth} </p>
                    <p> Latin: {animal.latinName} </p>
                    <p> Beskrivning: {animal.longDescription} </p>
                    <p> Mediciner: {animal.medicine} </p>
                    <img className="animalImg" src={animal.imageUrl} ></img>
                    <p>Status: {foodStatus} </p>
                    {!fed && <button className="fedBtn" onClick={() => fedAnimal(animal)}>Mata djur</button>}
                    <p>Senast matad: {fedTime} </p>
                </div>
            );
        }
    });


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