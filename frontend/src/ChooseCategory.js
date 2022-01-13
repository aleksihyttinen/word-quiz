import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios").default;
export default function ChooseCategory(props) {
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    axios
      .get(`/api/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (props.view === "teacher") {
    return categories.map((category) => (
      <option key={category.table_name} value={category.table_name}>
        {category.table_name}
      </option>
    ));
  } else {
    return categories.length !== 0 ? (
      <div className="choose-category">
        {categories.map((category) => (
          <Button
            key={category.table_name}
            onClick={() => setSearchParams({ category: category.table_name })}
          >
            {category.table_name}
          </Button>
        ))}
      </div>
    ) : (
      <div />
    );
  }
}
