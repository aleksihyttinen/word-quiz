import "./App.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  return (
    <div className="app">
      <h1>Welcome to the word quiz app. Please select your role:</h1>
      <Button href="/student">Student</Button>
      <Button onClick={() => navigate("/login")}>Teacher</Button>
    </div>
  );
}

export default App;
