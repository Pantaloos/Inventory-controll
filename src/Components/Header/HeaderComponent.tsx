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

const HeaderComponent = () => {
  const navigate = useNavigate();
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
        >
          <option value="">Select Location</option>
          {itemLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select className="form-control w-auto" id="filterInput" name="fitler">
          <option value="">Sort by</option>
          {sortingOptions.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default HeaderComponent;
