import "./App.css";
import Button from "react-bootstrap/Button";

function App() {
  //Returns main page for the app
  //From main page user can navigate to student or teacher view
  return (
    <div className="app">
      <h1>Welcome to the word quiz app.</h1>
      <h1>Please select your role:</h1>
      <Button draggable="false" href="/student">
        Student
      </Button>
      <Button draggable="false" href="/teacher">
        Teacher
      </Button>
    </div>
  );
}

export default App;
