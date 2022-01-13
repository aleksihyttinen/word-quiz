import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios").default;
export default function ChooseCategory() {
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
  return (
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
  );
}
