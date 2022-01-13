import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
import { useAuth } from "./useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const password = "password";
  const [input, setInput] = useState("");
  const { signin } = useAuth();
  const handleLogin = (e) => {
    e.preventDefault();
    if (input !== password) {
      alert("Wrong password");
    } else {
      signin();
      navigate("/teacher");
    }
  };
  return (
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
