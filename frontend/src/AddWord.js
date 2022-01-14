import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
const axios = require("axios").default;

export default function AddWord(props) {
  //Returns a modal which asks user for a word in three languages
  const [showModal, setShow] = useState(false); //Stores a boolean that tells if modal should be visible or not
  let wordArray = []; //Init array that will contain a words translations
  const saveWord = () => {
    //Removes whitespace from words translations
    //and then sends the word array to the backend
    let trimmed = false;
    if (wordArray.length !== 3) {
      //Block post request if word doesn't have all three translations
      alert("Insert word in all three langauges");
      return;
    }
    for (let i = 0; i < wordArray.length; i++) {
      wordArray[i] = wordArray[i].trimStart().trimEnd();
      trimmed = true;
    }
    if (trimmed) {
      axios
        .post(`http://localhost:8080/api/${props.category}`, wordArray)
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
                //Set input value to wordArray
                onChange={(e) => (wordArray[0] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder="English"
              />
              <Form.Label>Finnish:</Form.Label>
              <Form.Control
                //Set input value to wordArray
                onChange={(e) => (wordArray[1] = e.target.value)}
                style={{ marginBottom: 10 }}
                placeholder="Finnish"
              />
              <Form.Label>Swedish:</Form.Label>
              <Form.Control
                //Set input value to wordArray
                onChange={(e) => (wordArray[2] = e.target.value)}
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
