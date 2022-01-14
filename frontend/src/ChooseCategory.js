import Button from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
const axios = require("axios").default;

export default function ChooseCategory(props) {
  //Returns a category selection based on which view user is in
  //On student view, return categories as Buttons
  //On teacher view, return a select which contains all categories as options
  const [categories, setCategories] = useState([]); //Contains available categories
  const [searchParams, setSearchParams] = useSearchParams(); //Gets search parameters from ulr which define current category
  useEffect(() => {
    //Fetch categories
    axios
      .get(`http://localhost:8080/api/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (props.view === "teacher") {
    return (
      <select
        value={props.category} //Value is current selected category from props
        onChange={(e) => setSearchParams({ category: e.target.value })} //Set search params to match selection
        title="categories"
      >
        {categories.map((category) => (
          //Map categories as options for select
          <option key={category.table_name} value={category.table_name}>
            {category.table_name}
          </option>
        ))}
      </select>
    );
  } else {
    return categories.length !== 0 ? (
      <div className="choose-category">
        {categories.map((category) => (
          //Map categories as buttons
          <Button
            key={category.table_name}
            onClick={() => setSearchParams({ category: category.table_name })} //Set search params to match clicked button
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
