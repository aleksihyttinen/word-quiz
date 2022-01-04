import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
export default function AddWord() {
  const [showModal, setShow] = useState(false);
  let word = [];
  const saveWord = () => {
    console.log(word);
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
            <Form.Control
              onChange={(e) => (word[0] = e.target.value)}
              style={{ marginBottom: 10 }}
              placeholder="English"
            />
            <Form.Control
              onChange={(e) => (word[1] = e.target.value)}
              style={{ marginBottom: 10 }}
              placeholder="Finnish"
            />
            <Form.Control
              onChange={(e) => (word[2] = e.target.value)}
              style={{ marginBottom: 10 }}
              placeholder="Swedish"
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveWord}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
