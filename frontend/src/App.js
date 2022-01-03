import { useState, useEffect } from "react";
import { ListGroup, Button } from "react-bootstrap";
const axios = require("axios").default;
function App() {
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const [languages, setLanguages] = useState({
    first: "english",
    second: "finnish",
  });
  let userWords = [];
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${languages.first}`)
      .then((response) => setWords1(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [languages.first]);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${languages.second}`)
      .then((response) => setWords2(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [languages.second]);
  const handleChange = (e) => {
    userWords[e.target.id] = e.target.value;
    console.log(userWords);
  };
  return (
    <div className="App">
      {languages.first}
      <ListGroup>
        {words1.map((word) => (
          <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>
        ))}
      </ListGroup>
      {languages.second}
      <ListGroup>
        {words2.map((word, index) => (
          <ListGroup.Item>
            <input
              onChange={handleChange}
              type="text"
              autoComplete="off"
              id={index}
              name={word.word}
              key={word.id}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
