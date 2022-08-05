import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Comments } from "../comments/comments.js";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ IMPORTS ^^ ~~~ USESTATES vv

export const MainAfter = () => {
  const [stats, setStats] = useState([]);
  const [celeb, setCeleb] = useState([]);
  const [filteredStat, setFilteredStat] = useState([]);
  const [celebObj, setCelebObj] = useState([]);
  const [areTheyRight, setAreTheyRight] = useState(false);
  const [rightStatement, setRightStatement] = useState("");

  const navigate = useNavigate(); //used for navigation

  const currentUser = JSON.parse(localStorage.getItem("current_user"));
  const currentCelebrity = JSON.parse(
    localStorage.getItem("current_celebrity")
  );
  //sets current user and current celebrity

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~ USEEFFECTS vv

  useEffect(
    () => {
      fetch("http://localhost:8088/statistics")
        .then((res) => res.json())
        .then((stats) => {
          setStats(stats);
        });
    },
    [] //pulls stats from section in the api, sets initial state
  );

  useEffect(
    () => {
      fetch("http://localhost:8088/celebrities")
        .then((res) => res.json())
        .then((person) => {
          setCeleb(person);
        });
    },
    [] //pulls celebrities from the api, and sets initial state
  );

  useEffect(
    () => {
      if (stats.length > 0) {
        stats.map((statId) => {
          const length = stats.length;
          const lastItem = length + 1;

          if (statId.id === lastItem) {
            setFilteredStat(statId);
          }
        });
      }
    },
    [celeb] //checks to see if stats exist, if they do.. it takes the last stat from the db and sets a filtered stat variable
  );

  useEffect(
    () => {
      if (celeb.length > 0) {
        for (let person of celeb) {
          if (filteredStat.celebrityId === person.id) {
            setCelebObj(person);
          }
        }
      }
    },
    [filteredStat] //waits on celebs to build, then pulls each object and compares the celeb id to the filtered celeb id and sets it to a variable celebObj
  );

  useEffect(
    () => {
      if (filteredStat.isAliveGuess === filteredStat.isCelebAlive) {
        setAreTheyRight(true);
      } else {
        setAreTheyRight(false);
      }
    },
    [celebObj] //checks the stat to see if the users isAlive guess is equal to if the celeb is alive
  );

  useEffect(
    () => {
      if (areTheyRight === true) {
        setRightStatement("Correct!!!");
      } else {
        setRightStatement("Wrong! Better luck with the next.");
      }
    },
    [areTheyRight] //checks to see if the guess is correct or false. If they are correct, it shows that. If wrong, it displays that as well.
  );

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FUNCTIONS vv

  const deadOrAlive = () => {
    //function that sets if the person is dead or alive and states that on the page.

    if (filteredStat.isCelebAlive === true) {
      return "Alive";
    } else {
      return "Dead";
    }
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ RETURN STATEMENT FOR MAINAFTER COMPONENT vv

  return (
    <>
    <div></div>
      <img
        src={celebObj.imageLink}
        className="main__pic"
        width="300"
        height="auto"
        key={`image--${celebObj.id}`}
      />

      <h4 className="celebrity__name" key={`name--${celebObj.id}`}>
        {celebObj.name}
      </h4>

      <h1 className="dead__alive" key={`status--${celebObj.id}`}>
        {deadOrAlive()}
      </h1>

      <div className="celebrity__statement" key={`statement--${celebObj.id}`}>
        {rightStatement}
        <p></p>
      </div>
      <button
        key={``}
        onClick={() => {
          navigate("/main");
        }}
      >
        Next
      </button>
      <Comments userId={currentUser.id} celebrityId={currentCelebrity.id} />
    </>
  );
};

// routed the comments through the main after page rather than on the application views.
