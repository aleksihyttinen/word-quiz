import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
const axios = require("axios").default;
export default function EditWord(props) {
  const [showModal, setShow] = useState(false);
  const [word, setWord] = useState([
    props.word.english,
    props.word.finnish,
    props.word.swedish,
  ]);
  const editWord = () => {
    axios
      .put(`/api/${props.word.id}`, word)
      .then((response) => {
        props.setEdited(true);
        console.log(response);
      })
      .catch((err) => console.log(err));
    setShow(false);
  };
  return (
    <>
      <BsPencil onClick={() => setShow(true)} />
      <Modal
        show={showModal}
        onHide={() => {
          setShow(false);
          setWord([props.word.english, props.word.finnish, props.word.swedish]);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit word</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className="edit-word" controlId="formAddWord">
            <Form.Label>Type your word in all three languages</Form.Label>
            <div style={{ fontWeight: "bold" }}>
              <Form.Label>English:</Form.Label>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder={props.word.english}
                value={word[0]}
                onChange={(e) =>
                  setWord([(word[0] = e.target.value), word[1], word[2]])
                }
              />
              <Form.Label>Finnish:</Form.Label>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder={props.word.finnish}
                value={word[1]}
                onChange={(e) =>
                  setWord([word[0], (word[1] = e.target.value), word[2]])
                }
              />
              <Form.Label>Swedish:</Form.Label>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder={props.word.swedish}
                value={word[2]}
                onChange={(e) =>
                  setWord([word[0], word[1], (word[2] = e.target.value)])
                }
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
