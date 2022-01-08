import LanguageSelection from "./LanguageSelection.js";
import { ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddWord from "./AddWord.js";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import EditWord from "./EditWord.js";
const axios = require("axios").default;
export default function TeacherView() {
  const [words, setWords] = useState([]);
  const languages = ["english", "finnish", "swedish"];
  const [displayedLanguage, setDisplayedLanguage] = useState("english");
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    axios
      .get(`/api/${displayedLanguage}`)
      .then((response) => {
        setWords(response.data);
        setEdited(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [displayedLanguage, edited]);
  const removeWord = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this word and it's translations?"
      )
    ) {
      axios
        .delete(`/api/${id}`)
        .then((response) => {
          console.log(response);
          setEdited(true);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

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
              <ListGroup.Item key={word.id}>
                {word.word}
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <GrClose size="20px" onClick={() => removeWord(word.id)} />
                  <EditWord id={word.id} setEdited={setEdited} />
                </IconContext.Provider>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
      <AddWord setEdited={setEdited} />
    </div>
  );
}
