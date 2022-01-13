import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios").default;
export default function ChooseCategory() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="choose-category">
      {categories.map((category) => (
        <Button>{category.table_name}</Button>
      ))}
    </div>
  );
}
