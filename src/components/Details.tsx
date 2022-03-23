import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Animal } from "../models/Animal";
import { IAnimal } from "../models/IAnimal";
import "./Details.css";

export function Details() {

    const [animalId, setAnimalId] = useState(0);
    const [animals, setAnimals] = useState<Animal[]>([]);
    const [fed, setFed] = useState(false);
    const [fedTime, setFedTime] = useState("");
    const [feedAnimal, setFeedAnimal] = useState(true);

    let params = useParams();
    let animalsList: any = []; 


    useEffect(() => {
        if (params.id) {
            setAnimalId(parseInt(params.id));
        }
        getDataFromLs();
    }, []);


    useEffect(() => {
        if(animalId === 0) return
        
        // getAnimal();

    }, [animalId]);


    useEffect(() => {
    }, [setFed, setFedTime])
    

    function getDataFromLs() {
        
        let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
        animalsList = JSON.parse(animalsObject);
            
        let dataFromApi = animalsList.map((animal: IAnimal) => {
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
    let dataLs = animals.map((animal: Animal) => {
        if (animalId === animal.id) {
            return (
                <div className="animalDiv" key={animal.id} >
                    <h2> Namn: {animal.name} </h2>
                    <p> Födelseår: {animal.yearOfBirth} </p>
                    <p> Latin: {animal.latinName} </p>
                    <p> Beskrivning: {animal.longInfo} </p>
                    <p> Mediciner: {animal.medicine} </p>
                    <img className="animalImg" src={animal.imgUrl} ></img>
                    <p>Status: {foodStatus} </p>
                    {!fed && <button className="fedBtn" onClick={() => fedAnimal(animal)}>Mata djur</button>}
                    <p>Senast matad: {fedTime} </p>
                </div>
            );
        }
    });


    function fedAnimal(animal: Animal) {
        // Sätter till matad till true
        setFed(!fed);

        // Sätter till matad till true
        setFeedAnimal(!feedAnimal);
        
        animal.isFed = true;

        animal.lastFed = Date();

        // let food = [animal.id, animal.isFed = isFed, animal.lastFed = timeFed];

        console.log(animal);

        saveToLs(animal);
        // saveToLs(food);

        // Sätter tiden för matningen
        setFedTime(Date);
        // let feedTime = new Date;

        //     //Timer som gör det möjligt att mata igen efter angiven tid
        // setTimeout(() => {

        //     saveToLs(animalObject);

        // // removeFromLs(id);
        // // }, 10800000)
        // }, 10000)

        // // Timer som visar om det gått mer än fyra timmar sedan matning
        // setTimeout(() => {
        //     setFeedAnimal(feedAnimal);
        // // }, 14400000)
        // }, 12000)
    }

    function saveToLs(animal: Animal) {
        let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
        let animalsList = JSON.parse(animalsObject);

        let fedAnimals = [];
        fedAnimals.push(animal)
        // localStorage.setItem("listOfAnimals", JSON.stringify(animalsList));

        for (let i = 0; i < animalsList.length; i++) {
            if (fedAnimals.some((animal: Animal) => animal.id === animalsList[i].id)) {
                console.log("Hej")

                // let animalsObject = localStorage.getItem("listOfAnimals") || "[]";
                // let animalsList = JSON.parse(animalsObject);

                animalsList[i].isFed = true;
                animalsList[i].lastFed = new Date(); 

                // localStorage.setItem("listOfAnimals", JSON.stringify(animalsList));

            } else {
                console.log("Hej hej")
            }
        }

        console.log(animalsList)
        console.log(fedAnimals)

        //     if (fedAnimals.some((animal: Animal) => animal.id === animalsList[i].id)) {
               
        //         console.log("if-sats")
        //         // fedAnimals[0].isFed = true;
        //         // fedAnimals[0].lastFed = new Date(); 
        //     }   else {
        //         for (let j = 0; j < fedAnimals.length; j++) {
        //             console.log("else")

        //             animalsList.push(fedAnimals)
        //             localStorage.setItem("listOfAnimals", JSON.stringify(animalsList));
        //         }
        //     }
        // }
            
        // console.log(animalsList)

        // animalsList.push(fedAnimals)
        // localStorage.setItem("listOfAnimals", JSON.stringify(animalsList));
    }

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


       // // Hämta data från API:t
    // function getAnimal() {
    //     axios
    //     .get<IAnimal[]>("https://animals.azurewebsites.net/api/animals")
    //     .then((response) => {

    //         let dataFromApi = response.data.map((animal: IAnimal) => {
    //             return new Animal (
    //                 animal.id, 
    //                 animal.name, 
    //                 animal.latinName, 
    //                 animal.yearOfBirth, 
    //                 animal.shortDescription, 
    //                 animal.longDescription, 
    //                 animal.imageUrl, 
    //                 animal.medicine, 
    //                 animal.isFed, 
    //                 animal.lastFed
    //             )
    //         });
    //         setAnimals(dataFromApi);
    //     }
    // )};
    
}