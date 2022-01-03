import { useState, useEffect } from "react";
const axios = require("axios").default;
function App() {
  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState("english");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/${language}`)
      .then((response) => setWords(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [language]);
  return (
    <div className="App">
      {words.map((word) => (
        <p>{word.word}</p>
      ))}
    </div>
  );
}

export default App;
