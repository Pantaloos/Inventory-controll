import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ItemForm {
  name: string;
  location: string;
  price: number;
}

const itemLocations = [
  "Main Office",
  "Cavea Gallery",
  "Cavea Tbilisi Mall",
  "Cavea East Point",
  "Cavea City Mall",
];

const AddNewItem = () => {
  const navigate = useNavigate();

  const [itemData, setItemData] = useState<ItemForm>({
    name: "",
    location: "",
    price: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setItemData({
      ...itemData,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddItem = () => {
    if (
      itemData.name.trim() === "" ||
      itemData.location.trim() === "" ||
      itemData.price <= 0
    ) {
      setErrorMessage("Please make sure all fields are filled correctly");
      setSuccessMessage("");
      return;
    }

    axios
      .post("http://localhost:5000/items", itemData)
      .then((response) => setItemData(response.data.id));

    setItemData({
      name: "",
      location: "",
      price: 0,
    });
    setErrorMessage("");
    setSuccessMessage("Item added successfully!");
  };

  return (
    <form className="w-25 position-absolute top-50 start-50 translate-middle">
      <div className="form-group py-1">
        <label htmlFor="locationInput">Location</label>
        <select
          className="form-control"
          id="locationInput"
          name="location"
          value={itemData.location}
          onChange={handleInputChange}
        >
          <option value="">Choose a location</option>
          {itemLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group py-1">
        <label htmlFor="nameInput">Name</label>
        <input
          type="text"
          className="form-control"
          id="nameInput"
          name="name"
          value={itemData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group py-1">
        <label htmlFor="priceInput">Price</label>
        <input
          type="number"
          className="form-control"
          id="priceInput"
          name="price"
          value={itemData.price}
          min="0"
          onChange={handleInputChange}
        />
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-primary me-2 mt-1"
          onClick={handleAddItem}
        >
          Add
        </button>
        <button
          type="button"
          className="btn btn-primary mt-1"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
    </form>
  );
};

export default AddNewItem;
