import { useState, useEffect } from "react";
const axios = require("axios").default;
function App() {
  const [words, setWords] = useState([]);
  const [language, setLanguage] = useState("english");
  useEffect(() => {
    axios
      .get(`http://localhost:3010/${language}`)
      .then((response) => setWords(response.data))
      .catch((error) => {
        console.log(error);
      });
  }, [language]);
  return <div className="App"></div>;
}

export default App;
