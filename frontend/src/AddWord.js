import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
const axios = require("axios").default;
export default function AddWord(props) {
  const [showModal, setShow] = useState(false);
  let word = [];
  const saveWord = () => {
    let trimmed = false;
    if (word.length !== 3) {
      alert("Insert word in all three langauges");
      return;
    }
    for (let i = 0; i < word.length; i++) {
      word[i] = word[i].trimStart().trimEnd();
      trimmed = true;
    }
    if (trimmed) {
      axios
        .post(`http://localhost:8080/api/${props.category}`, word)
        .then((response) => {
          props.setEdited(true);
          console.log(response);
        })
        .catch((err) => console.log(err));
      setShow(false);
    }
  };
  return (
    <>
      <Button onClick={() => setShow(true)}>Add new word</Button>
      <Modal show={showModal} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new word</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className="add-word" controlId="formAddWord">
            <Form.Label>Type your word in all three languages</Form.Label>
            <br />
            <div style={{ fontWeight: "bold" }}>
              <Form.Label>English:</Form.Label>
              <Form.Control
                onChange={(e) => (word[0] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder="English"
              />
              <Form.Label>Finnish:</Form.Label>
              <Form.Control
                onChange={(e) => (word[1] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder="Finnish"
              />
              <Form.Label>Swedish:</Form.Label>
              <Form.Control
                onChange={(e) => (word[2] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder="Swedish"
              />
            </div>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="primary" onClick={saveWord}>
            Add word
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
