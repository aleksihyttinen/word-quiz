import LanguageSelection from "./LanguageSelection.js";
import Answer from "./Answer.js";
import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./StudentView.css";
import ChooseCategory from "./ChooseCategory.js";
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
  const [searchParams, setSearchParams] = useSearchParams();
  let category = searchParams.get("category");
  const navigate = useNavigate();
  var userWords = [];
  useEffect(() => {
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
    if (category !== null) {
      axios
        .get(`/api/${category}/${displayedLanguages.second}`)
        .then((response) => setWords2(response.data))
        .catch((error) => console.log(error));
    }
  }, [displayedLanguages.second, category]);
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
          let trimmedWord = userWords[i].replace(/\s/g, "").toLowerCase();
          console.log(trimmedWord);
          if (words2[i].word.toLowerCase() === trimmedWord) {
            count++;
            temp.push(trimmedWord);
          }
        }
      }
      setCorrect(temp);
      setCorrectCount(count);
    }
  };
  if (category === null) {
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
      <div />
    );
  }
}
