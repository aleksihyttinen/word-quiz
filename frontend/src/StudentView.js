import LanguageSelection from "./LanguageSelection.js";
import Answer from "./Answer.js";
import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentView.css";
const axios = require("axios").default;
export default function StudentView() {
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const languages = ["english", "finnish", "swedish"];
  const [displayedLanguages, setDisplayedLanguages] = useState({
    first: languages[0],
    second: languages[1],
  });
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(null);
  const [correct, setCorrect] = useState([]);
  var userWords = [];
  useEffect(() => {
    axios
      .get(`/api/${displayedLanguages.first}`)
      .then((response) => {
        setWords1(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [displayedLanguages.first]);
  useEffect(() => {
    axios
      .get(`/api/${displayedLanguages.second}`)
      .then((response) => setWords2(response.data))
      .catch((error) => console.log(error));
  }, [displayedLanguages.second]);
  const handleClick = () => {
    if (hasAnswered) {
      window.location.reload(false);
    } else {
      checkAnswers();
    }
  };
  const checkAnswers = () => {
    if (userWords.length === 0) {
      alert("Please insert your answers");
    } else {
      setHasAnswered(true);
      let count = 0;
      let temp = [];
      for (let i = 0; i < words2.length; i++) {
        if (userWords[i] !== undefined) {
          if (words2[i].word.toLowerCase() === userWords[i].toLowerCase()) {
            count++;
            temp.push(userWords[i]);
          }
        }
      }
      setCorrect(temp);
      setCorrectCount(count);
    }
  };
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="student-view">
      <h1>
        {hasAnswered
          ? `You got ${correctCount} right!`
          : `Translate words from ${displayedLanguages.first} to ${displayedLanguages.second}`}
      </h1>
      <Button onClick={handleClick}>
        {hasAnswered ? "Play again" : "Check answers"}
      </Button>

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
                    hasAnswered && correct.includes(word.word)
                      ? "green"
                      : hasAnswered && !correct.includes(word.word)
                      ? "red"
                      : "black"
                  }
                  userWords={userWords}
                  index={index}
                  word={word}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <Button variant="secondary" onClick={goBack}>
        Back
      </Button>
    </div>
  );
}
