import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
  return (
    <div className="app">
      <h1>Welcome to the word quiz app.</h1>
      <h1>Please select your role:</h1>
      <Button href="/student">Student</Button>
      <Button href="/teacher">Teacher</Button>
    </div>
  );
}

export default App;
