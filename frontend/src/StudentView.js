import LanguageSelection from "./LanguageSelection.js";
import Answer from "./Answer.js";
import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./StudentView.css";
import ChooseCategory from "./ChooseCategory.js";
const axios = require("axios").default;

export default function StudentView() {
  //Returns the student view page, where user can play word quiz
  const [words1, setWords1] = useState([]); //Holds the words of the two languages
  const [words2, setWords2] = useState([]); //The user has selected
  const languages = ["english", "finnish", "swedish"]; //Available languages
  const [displayedLanguages, setDisplayedLanguages] = useState({
    first: languages[0],
    second: languages[1],
  }); //Displayed langauges
  const [hasAnswered, setHasAnswered] = useState(false); //Changes to true if user has submitted answers
  const [correctCount, setCorrectCount] = useState(null); //Amount of correct answers
  const [correct, setCorrect] = useState([]); //Array of user submitted correct answers
  const [searchParams, setSearchParams] = useSearchParams(); //https://reactrouter.com/docs/en/v6/api#usesearchparams
  let category = searchParams.get("category"); //Gets category from searchParams
  const navigate = useNavigate(); //https://reactrouter.com/docs/en/v6/api#usenavigate
  var userWords = []; //Array of user inputs
  useEffect(() => {
    //Fetches the words that are shown
    if (category !== null) {
      axios
        .get(`/api/${category}/${displayedLanguages.first}`)
        .then((response) => {
          setWords1(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [displayedLanguages.first, category]);
  useEffect(() => {
    //Fetches the correct words user is trying to guess
    if (category !== null) {
      axios
        .get(`/api/${category}/${displayedLanguages.second}`)
        .then((response) => setWords2(response.data))
        .catch((error) => console.log(error));
    }
  }, [displayedLanguages.second, category]);
  const handleClick = () => {
    if (hasAnswered) {
      //If user clicks the button after checking answers, reload the page to play again
      //(This should really only clear the input fields, this is a bad solution for a restart)
      window.location.reload(false);
    } else {
      checkAnswers();
    }
  };
  const checkAnswers = () => {
    //Compares user inputs to the correct answers held in words2
    if (userWords.length === 0) {
      alert("Please insert your answers");
    } else {
      setHasAnswered(true);
      let count = 0;
      let temp = [];
      for (let i = 0; i < words2.length; i++) {
        if (userWords[i] !== undefined) {
          let whitespaceRemoved = userWords[i].trimStart().trimEnd();
          if (
            words2[i].word.toLowerCase() === whitespaceRemoved.toLowerCase()
          ) {
            count++;
            temp.push(whitespaceRemoved.toLowerCase());
          }
        }
      }
      setCorrect(temp); //Saves the correct inputs
      setCorrectCount(count); //Saves the count of correct answers
    }
  };
  if (category === null) {
    //If category isn't found, render a choose category page
    return (
      <div className="category-view">
        <h1>Choose category:</h1>
        <ChooseCategory></ChooseCategory>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Main Page
        </Button>
      </div>
    );
  } else {
    //Once words have been fetched, render a page that displays two list groups
    //First one holds the words that you are trying to guess in a different language
    //Second one holds input fields for the users answers
    return words1.length !== 0 && words2.length !== 0 ? (
      <div className="student-view">
        <h1>
          {`Translate words from ${displayedLanguages.first} to ${displayedLanguages.second}`}
        </h1>
        <div className="list-group-container">
          <div className="word-container">
            <LanguageSelection
              setDisplayedLanguages={setDisplayedLanguages}
              displayedLanguages={displayedLanguages}
              languages={languages}
              selected={displayedLanguages.first}
              whichList={"first"}
            />
            <ListGroup>
              {words1.map((word) => (
                <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          <div className="input-container">
            <LanguageSelection
              setDisplayedLanguages={setDisplayedLanguages}
              displayedLanguages={displayedLanguages}
              languages={languages}
              selected={displayedLanguages.second}
              whichList={"second"}
            />
            <ListGroup>
              {words2.map((word, index) => (
                <ListGroup.Item key={word.id}>
                  <Answer
                    color={
                      hasAnswered && correct.includes(word.word.toLowerCase())
                        ? "green"
                        : hasAnswered && !correct.includes(word.word)
                        ? "red"
                        : "black"
                    }
                    userWords={userWords}
                    index={index}
                    word={word}
                    hasAnswered={hasAnswered}
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
        <h3
          style={
            hasAnswered ? { visibility: "visible" } : { visibility: "hidden" }
          }
        >
          {/*Display the amount of correct answers*/}
          You got {correctCount} right!
        </h3>
        <Button onClick={handleClick}>
          {hasAnswered ? "Play again" : "Check answers"}
        </Button>
        <Button variant="secondary" onClick={() => setSearchParams()}>
          Back
        </Button>
      </div>
    ) : (
      //If words haven't been fetched yet, render a empty div
      <div />
    );
  }
}
