import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./App.css";
export default function Login() {
  return (
    <div className="login">
      <Form className="password-form">
        <Form.Label>Enter password:</Form.Label>
        <Form.Control type="password" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
