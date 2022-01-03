import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
const axios = require("axios").default;
function App() {
  const [words1, setWords1] = useState([]);
  const [words2, setWords2] = useState([]);
  const [languages, setLanguages] = useState({
    first: "english",
    second: "finnish",
  });
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
        {words2.map((word) => (
          <ListGroup.Item key={word.id}>{word.word}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
