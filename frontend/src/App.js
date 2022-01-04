import { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
import "./App.css";
import LanguageSelection from "./LanguageSelection";
const axios = require("axios").default;
function App() {
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const languages = ["english", "finnish", "swedish"];
  console.log(languages);
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
      .catch((error) => {
        console.log(error);
      });
  }, [displayedLanguages.second]);
  const handleChange = (e) => {
    userWords[e.target.id] = e.target.value;
    console.log(userWords);
  };
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
    <div className="app">
      <div className="list-group-holder">
        <div className="words">
          <LanguageSelection
            setLanguages={setDisplayedLanguages}
            languages={languages}
            selected={displayedLanguages.first}
          />
          <ListGroup>
            {words1.map((word) => (
              <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="input">
          <LanguageSelection
            setLanguages={setDisplayedLanguages}
            languages={languages}
            selected={displayedLanguages.second}
          />
          <ListGroup>
            {words2.map((word, index) => (
              <ListGroup.Item key={word.id}>
                <input
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  id={index}
                  name={word.word}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <Button onClick={checkAnswers}>Check answers</Button>
    </div>
  );
}

export default App;
