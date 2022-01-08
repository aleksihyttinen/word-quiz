import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
const axios = require("axios").default;
export default function EditWord(props) {
  const [showModal, setShow] = useState(false);
  const [word, setWord] = useState(undefined);
  let newWord = [];
  const editWord = () => {
    axios
      .put(`http://localhost:8080/api/${props.id}`, newWord)
      .then((response) => {
        props.setEdited(true);
        console.log(response);
      })
      .catch((err) => console.log(err));
    setShow(false);
  };
  const getWords = () => {
    axios
      .get(`http://localhost:8080/api/${props.id}`)
      .then((response) => {
        setWord(response.data);
        console.log(word);
        setShow(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <BsPencil size="20px" onClick={getWords} />
      <Modal show={showModal} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit word</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className="edit-word" controlId="formAddWord">
            <Form.Label>Type your word in all three languages</Form.Label>
            <div style={{ fontWeight: "bold" }}>
              <Form.Label>English:</Form.Label>
              <Form.Control
                onChange={(e) => (newWord[0] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder={word === undefined ? "English" : word[0].english}
              />
              <Form.Label>Finnish:</Form.Label>
              <Form.Control
                onChange={(e) => (newWord[1] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder={word === undefined ? "English" : word[0].finnish}
              />
              <Form.Label>Swedish:</Form.Label>
              <Form.Control
                onChange={(e) => (newWord[2] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder={word === undefined ? "English" : word[0].swedish}
              />
            </div>
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="primary" onClick={editWord}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
