import LanguageSelection from "./LanguageSelection.js";
import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddWord from "./AddWord.js";

const axios = require("axios").default;
export default function TeacherView() {
  const [words, setWords] = useState([]);
  const languages = ["english", "finnish", "swedish"];
  const [displayedLanguage, setDisplayedLanguage] = useState("english");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${displayedLanguage}`)
      .then((response) => setWords(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [displayedLanguage]);

  return (
    <div className="teacher-view">
      <div className="list-group-holder">
        <div className="words">
          <LanguageSelection
            setDisplayedLanguage={setDisplayedLanguage}
            displayedLanguage={displayedLanguage}
            languages={languages}
            selected={displayedLanguage}
          />
          <ListGroup>
            {words.map((word) => (
              <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <AddWord />
    </div>
  );
}
