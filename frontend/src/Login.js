import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth.js";
import "./App.css";
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login().then(() => {
      navigate("/teacher");
    });
  };
  return (
    <div className="login">
      <Form className="password-form" onSubmit={handleLogin}>
        <Form.Label>Enter password:</Form.Label>
        <Form.Control type="password" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
