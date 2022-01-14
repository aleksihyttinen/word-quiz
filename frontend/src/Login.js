import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  //Returns a simple login page with a input bar
  const navigate = useNavigate(); // https://reactrouter.com/docs/en/v6/api#usenavigate
  const password = "password"; //Holds password for authentication, should be changed for actual use
  const [input, setInput] = useState(""); //Stores input
  const { signin } = useAuth(); //Get function signin from useAuth

  const handleLogin = (e) => {
    e.preventDefault();
    if (input !== password) {
      alert("Wrong password");
    } else {
      //If password is correct, signin to auth and navigate the url to teacher view
      signin();
      navigate("/teacher");
    }
  };
  return (
    //On enter press or button click, attempt to login
    <div className="login">
      <Form className="password-form" onSubmit={handleLogin}>
        <Form.Label>Enter password:</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
