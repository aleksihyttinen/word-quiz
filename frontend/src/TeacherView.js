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
        <ListGroup
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        >
          <ListGroup.Item
            style={{ borderRight: "none", fontWeight: "bold" }}
            key="English"
          >
            English
          </ListGroup.Item>
          {words.map((word) => (
            <ListGroup.Item style={{ borderRight: "none" }} key={word.id}>
              {word.english}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup style={{ borderRadius: 0 }}>
          <ListGroup.Item
            style={{
              borderLeft: "none",
              borderRight: "none",
              fontWeight: "bold",
            }}
            key="Finnish"
          >
            Finnish
          </ListGroup.Item>
          {words.map((word) => (
            <ListGroup.Item
              style={{ borderLeft: "none", borderRight: "none" }}
              key={word.id}
            >
              {word.finnish}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup style={{ borderRadius: 0 }}>
          <ListGroup.Item
            style={{
              borderLeft: "none",
              borderRight: "none",
              fontWeight: "bold",
            }}
            key="Swedish"
          >
            Swedish
          </ListGroup.Item>
          {words.map((word) => (
            <ListGroup.Item
              style={{ borderLeft: "none", borderRight: "none" }}
              key={word.id}
            >
              {word.swedish}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ListGroup
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          <ListGroup.Item
            style={{ minWidth: 50, borderLeft: "none" }}
            key="Settings"
          ></ListGroup.Item>
          {words.map((word) => (
            <ListGroup.Item style={{ minWidth: 50 }} key={word.id}>
              <IconContext.Provider value={{ className: "react-icons" }}>
                <EditWord word={word} setEdited={setEdited} />
                <GrClose onClick={() => removeWord(word.id)} />
              </IconContext.Provider>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <AddWord setEdited={setEdited} />
    </div>
  );
}
