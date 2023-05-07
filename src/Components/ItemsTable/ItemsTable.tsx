import { useState, useEffect } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

interface Item {
  id: number;
  name: string;
  location: string;
  price: number;
}

const ItemsTable = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        const newUsers = response.data;
        setItems(newUsers);
      })
      .catch((error) => console.error(error));
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const numPages = Math.ceil(items.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const itemsToDisplay = items.slice(startIdx, endIdx);

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  const paginationButtons = [];
  for (let i = 1; i <= numPages; i++) {
    paginationButtons.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <button className="page-link" onClick={() => handlePageClick(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="w-100 h-100 pt-1">
      <table className="table table-striped border border-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    console.log("you clicked me");
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="d-flex justify-content-between">
        <ul className="pagination">{paginationButtons}</ul>
        Total Items: {items.length}
      </nav>
    </div>
  );
};

export default ItemsTable;
