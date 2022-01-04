import LanguageSelection from "./LanguageSelection.js";
import Answer from "./Answer.js";
import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
const axios = require("axios").default;
export default function StudentView(props) {
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const languages = ["english", "finnish", "swedish"];
  const [displayedLanguages, setDisplayedLanguages] = useState({
    first: languages[0],
    second: languages[1],
  });
  var userWords = [];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${displayedLanguages.first}`)
      .then((response) => setWords1(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [displayedLanguages.first]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${displayedLanguages.second}`)
      .then((response) => setWords2(response.data))
      .catch((error) => console.log(error));
  }, [displayedLanguages.second]);
  const checkAnswers = () => {
    if (userWords.length === 0) {
      alert("Please insert your answers");
    } else {
      let count = 0;
      for (let i = 0; i < words2.length; i++) {
        if (userWords[i] !== undefined) {
          if (words2[i].word.toLowerCase() === userWords[i].toLowerCase()) {
            count++;
          }
        }
      }
      alert(`You got ${count} right!`);
    }
  };
  return (
    <div className="student-view">
      <div className="list-group-holder">
        <div className="words">
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
        <div className="input">
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
                <Answer userWords={userWords} index={index} word={word} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <Button onClick={checkAnswers}>Check answers</Button>
    </div>
  );
}
