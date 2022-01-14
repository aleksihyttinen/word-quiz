import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BsPencil } from "react-icons/bs";
const axios = require("axios").default;

export default function EditWord(props) {
  //Returns a modal which lets user modify a word in all three languages
  const [showModal, setShow] = useState(false); //Stores a boolean that tells if modal should be visible or not
  const [wordArray, setWordArray] = useState([
    props.word.english,
    props.word.finnish,
    props.word.swedish,
  ]); //Init word array with selected word from props

  useEffect(() => {
    //If category or word changes, update word array
    setWordArray([props.word.english, props.word.finnish, props.word.swedish]);
  }, [props.category, props.word]);

  const editWord = () => {
    //Send a put request with the modified word array
    if (
      //If there isn't any modifications, exit modal without put request
      wordArray[0] === props.word.english &&
      wordArray[1] === props.word.finnish &&
      wordArray[2] === props.word.swedish
    ) {
      setShow(false);
      return;
    }
    //Send put request
    axios
      .put(`/api/${props.category}/${props.word.id}`, wordArray)
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
      {/*Button for opening the modal*/}
      <Modal
        show={showModal}
        onHide={() => {
          setShow(false);
          //If there are no changes, revert word array to default values
          setWordArray([
            props.word.english,
            props.word.finnish,
            props.word.swedish,
          ]);
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
                value={wordArray[0]}
                onChange={(e) =>
                  //Save value to word array
                  setWordArray([
                    (wordArray[0] = e.target.value),
                    wordArray[1],
                    wordArray[2],
                  ])
                }
              />
              <Form.Label>Finnish:</Form.Label>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder={props.word.finnish}
                value={wordArray[1]}
                onChange={(e) =>
                  //Save value to word array
                  setWordArray([
                    wordArray[0],
                    (wordArray[1] = e.target.value),
                    wordArray[2],
                  ])
                }
              />
              <Form.Label>Swedish:</Form.Label>
              <Form.Control
                style={{ marginBottom: 10 }}
                placeholder={props.word.swedish}
                value={wordArray[2]}
                onChange={(e) =>
                  //Save value to word array
                  setWordArray([
                    wordArray[0],
                    wordArray[1],
                    (wordArray[2] = e.target.value),
                  ])
                }
              />
            </div>
          </Form.Group>
        </Form>
        <Modal.Footer>
          {/*Button for saving changes*/}
          <Button variant="primary" onClick={editWord}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
