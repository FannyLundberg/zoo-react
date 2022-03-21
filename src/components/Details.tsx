import { useEffect } from "react";
import { Link } from "react-router-dom";

export function Details() {

    useEffect(() => {
        getAnimalFromLs();
    }, []);

    function getAnimalFromLs() {
        let animalObject = localStorage.getItem("animalsLs") || "[]";
        let lsAnimal = JSON.parse(animalObject);

        console.log(lsAnimal)
    }


    return (
        <div>
            <p>Details works</p>
            <p><Link to="/">Tillbaka till startsidan</Link></p>
        </div>
    );
}