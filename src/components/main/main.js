import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./main.css"

//~~~~~~~~~~~~~~~~~~~~~~~~~~~ IMPORTS ^^ ~~~ USESTATES vv

export const Main = () => {
  const [celebs, setCeleb] = useState([]);
  const [filteredCeleb, setFilteredCeleb] = useState({});
  const [isCelebAlive, setIsCelebAlive] = useState(null);

  const navigate = useNavigate();

  const currentUser = localStorage.getItem("current_user");
  const currentUserObject = JSON.parse(currentUser); //sets the current user

  //~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTION vv

  const randomIdGenerator = () => {
    //function that creates a random number

    const idArray = Array.from(Array(30).keys());

    const randomNumId = Math.floor(Math.random() * idArray.length);

    return randomNumId;
  };

  let randomNumber = randomIdGenerator();

  //~~~~~~~~~~~~~~~~~~~~~~~ USEEFFECTS vv

  useEffect(
    () => {
      fetch("http://localhost:8088/celebrities")
        .then((res) => res.json())
        .then((person) => {
          setCeleb(person);
        });
    },
    [] //dependency array is empty, because it only runs once and sets initial state.
  );

  useEffect(
    () => {
      if (celebs.length > 0) {
        const people = celebs.find((celeb) => celeb.id === randomNumber);
        setFilteredCeleb(people);
        if (people) {
          localStorage.setItem("current_celebrity", JSON.stringify(people));
        }
      }
    },
    [celebs] //waits for celebs to build, then finds the celebrity with the id number same as the random number generator
  );

  useEffect(
    () => {
      if (filteredCeleb.dateOfDeath != 0) {
        setIsCelebAlive(false);
      } else {
        setIsCelebAlive(true);
      }
    },
    [filteredCeleb] //checks to see if the celebrity has a date of death. if the do, sets celeb alive to false, if not... sets to true
  );

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTION vv

  const saveClick = (event) => {
    const saveToSendToAPI = {
      userId: currentUserObject.id,
      celebrityId: filteredCeleb.id,
      isAliveGuess: event,
      isCelebAlive: isCelebAlive,
    }; //sets the properties for the stats to be built

    return fetch(`http://localhost:8088/statistics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveToSendToAPI), //posts the results to the api
    })
      .then((res) => res.json())
      .then(() => {
        navigate(`/mainAfter`); //redirects user to the main after or results page
      });
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~ RETURN STATEMENT FOR MAIN COMPONENT vv

  return (
    <>
      {filteredCeleb && (
        <>
        <div className="div--pic">
          <img
            src={filteredCeleb.imageLink}
            className="main--pic"
            width="300"
            height="auto"
            key={`image--${filteredCeleb.id}`}
          /></div>
        <div className="name--position">
          <div className="celebrity--name" key={`name--${filteredCeleb.id}`}>
            {filteredCeleb.name}
          </div>
          <p className="celebrity--alias" key={`alias--${filteredCeleb.id}`}>
            {filteredCeleb.alias}
          </p>
        <div className="alive--buttons">
          <button
            className="button--1"
            key={`true--${filteredCeleb.id}`}
            onClick={() => {
              saveClick(true);
            }}
          >
            Alive
          </button>
          <button
            className="button--2"
            key={`false--${filteredCeleb.id}`}
            onClick={() => {
              saveClick(false);
            }}
          >
            Dead
          </button>
          </div>
        </div>
        </>
      )}
    </>
  );
};
