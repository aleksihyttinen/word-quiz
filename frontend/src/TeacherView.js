import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddWord from "./AddWord.js";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import EditWord from "./EditWord.js";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
const axios = require("axios").default;
export default function TeacherView() {
  const [words, setWords] = useState([]);
  const [edited, setEdited] = useState(false);
  useEffect(() => {
    axios
      .get(`/api`)
      .then((response) => {
        setWords(response.data);
        console.log(response.data);
        setEdited(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [edited]);
  const removeWord = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this word and it's translations?"
      )
    ) {
      axios
        .delete(`/api/${id}`)
        .then((response) => {
          console.log(response);
          setEdited(true);
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };
  const { signout } = useAuth();
  const navigate = useNavigate();
  const handleSignout = () => {
    signout();
    navigate("/");
  };

  return (
    <div className="teacher-view">
      <Button variant="secondary" onClick={handleSignout}>
        Signout
      </Button>
      <div className="list-group-holder">
        <ListGroup>
          <ListGroup.Item>
            <div>english | finnish | swedish</div>
          </ListGroup.Item>
          {words.map((word) => (
            <>
              <ListGroup.Item key={word.id}>
                <div>{word.english + " |"}</div>
                <div> {word.finnish + " |"}</div>
                <div>{word.swedish}</div>
                <IconContext.Provider value={{ className: "react-icons" }}>
                  <div className="margin-test">
                    <GrClose onClick={() => removeWord(word.id)} />
                  </div>
                  <div>
                    <EditWord id={word.id} setEdited={setEdited} />
                  </div>
                </IconContext.Provider>
              </ListGroup.Item>
            </>
          ))}
        </ListGroup>
      </div>
      <AddWord setEdited={setEdited} />
    </div>
  );
}
