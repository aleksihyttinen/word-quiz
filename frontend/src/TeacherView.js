import { ListGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddWord from "./AddWord.js";
import { GrClose } from "react-icons/gr";
import { IconContext } from "react-icons";
import EditWord from "./EditWord.js";
import { useAuth } from "./useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./TeacherView.css";
import ChooseCategory from "./ChooseCategory.js";
const axios = require("axios").default;
export default function TeacherView() {
  const [words, setWords] = useState([]);
  const [edited, setEdited] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let category = searchParams.get("category");
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/${category}`)
      .then((response) => {
        setWords(response.data);
        setEdited(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [edited, category]);
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

  return words.length !== 0 ? (
    <div className="teacher-view">
      <h1>Here you can add, edit, or delete words.</h1>
      <AddWord setEdited={setEdited} />
      <div className="info">
        <span>Select category: </span>
        <select
          defaultValue={category}
          onChange={(e) => setSearchParams({ category: e.target.value })}
          name="languages"
        >
          <ChooseCategory view="teacher" />
        </select>
        <p className="mobile-info">
          {"On mobile you can scroll the list <-> to see more"}
        </p>
      </div>
      <div className="list-group-container">
        <div className="scrollable">
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
        </div>
        <div className="settings-icons">
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
      </div>
      <Button variant="secondary" onClick={handleSignout}>
        Signout
      </Button>
    </div>
  ) : (
    <div />
  );
}
