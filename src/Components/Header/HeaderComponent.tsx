import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const itemLocations = [
  "Main Office",
  "Cavea Gallery",
  "Cavea Tbilisi Mall",
  "Cavea East Point",
  "Cavea City Mall",
];
const sortingOptions = [
  "Title Ascending",
  "Title Descending",
  "Price Ascending",
  "Price Descending",
];

const HeaderComponent = (props: any) => {
  const [filterValue, setFilterValue] = useState("");
  const [sortingValues, setSortingValues] = useState({});
  const navigate = useNavigate();

  function onFilterValueChange(e: ChangeEvent<HTMLSelectElement>) {
    setFilterValue(e.target.value);
  }
  function onSortingValueChange(e: ChangeEvent<HTMLSelectElement>) {
    setSortingValues(e.target.value);
  }
  const handeSubmit = (e: any) => {
    let sortingOptions = {};
    switch (sortingValues) {
      case "Title Ascending":
        sortingOptions = { order: "ASC", columnName: "name" };
        break;
      case "Title Descending":
        sortingOptions = { order: "DESC", columnName: "name" };
        break;
      case "Price Ascending":
        sortingOptions = { columnName: "price", order: "ASC" };
        break;
      case "Price Descending":
        sortingOptions = { columnName: "price", order: "DESC" };
    }
    props.onSubmit(filterValue, sortingOptions);
  };
  return (
    <div className="d-flex flex-row justify-content-between">
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/add")}
        >
          Add new item
        </button>
      </div>
      <div className="d-flex flex-row justify-content-around w-25">
        <select
          className="form-control w-auto"
          id="locationInput"
          name="location"
          onChange={onFilterValueChange}
        >
          <option value="">Select Location</option>
          {itemLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          className="form-control w-auto"
          id="filterInput"
          name="fitler"
          onChange={onSortingValueChange}
        >
          <option value="">Sort by</option>
          {sortingOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary" onClick={handeSubmit}>
          Sort
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
