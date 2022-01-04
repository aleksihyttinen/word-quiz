import "./App.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
function App() {
  const navigate = useNavigate();
  const teacherPassword = "password";
  const authenticate = () => {
    let password = prompt("Enter password");
    if (password === teacherPassword) {
      navigate("/teacher");
    } else if (password !== null) {
      console.log(password);
      alert("Wrong password!");
    }
  };
  return (
    <div className="app">
      <h1>Welcome to the word quiz app. Please select your role:</h1>
      <Button href="/student">Student</Button>
      <Button onClick={authenticate}>Teacher</Button>
    </div>
  );
}

export default App;
