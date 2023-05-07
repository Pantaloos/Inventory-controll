import { useState, useEffect, ChangeEvent } from "react";
import Pagination from "react-bootstrap/Pagination";
import axios from "axios";

interface Item {
  id: string;
  name: string;
  location: string;
  price: number;
}

const clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(num, max));
};

const ItemsTable = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentValue, setCurrentValue] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const numPages = Math.ceil(items.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const itemsToDisplay = items.slice(startIdx, endIdx);

  const paginationButtons = [];
  const maxButtons = 10;
  const ellipsis = <Pagination.Ellipsis disabled />;

  useEffect(() => {
    axios
      .get("http://localhost:5000/items")
      .then((response) => {
        const newUsers = response.data;
        setItems(newUsers);
      })
      .catch((error) => console.error(error));
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(clamp(parseInt(e.target.value), 1, numPages));
  }
  function handlePageClick(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  const handleDeleteItem = (itemID: string) => {
    axios.delete(`http://localhost:5000/items/${itemID}`).then(() => {
      window.location.reload();
    });
  };

  if (numPages <= maxButtons) {
    for (let i = 1; i <= numPages; i++) {
      paginationButtons.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  } else {
    let buttonsToShow = [currentPage];
    let diff = Math.floor((maxButtons - 1) / 2);
    for (let i = 1; i <= diff; i++) {
      if (currentPage - i > 1) {
        buttonsToShow.unshift(currentPage - i);
      }
      if (currentPage + i < numPages) {
        buttonsToShow.push(currentPage + i);
      }
    }
    if (buttonsToShow[0] > 2) {
      paginationButtons.push(
        <Pagination.Item
          key={1}
          active={1 === currentPage}
          onClick={() => handlePageClick(1)}
        >
          1
        </Pagination.Item>
      );
      if (buttonsToShow[0] > 3) {
        paginationButtons.push(ellipsis);
      }
    }
    buttonsToShow.sort((a, b) => a - b);
    for (let i = 0; i < buttonsToShow.length; i++) {
      let page = buttonsToShow[i];
      paginationButtons.push(
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Item>
      );
      if (i < buttonsToShow.length - 1 && page < buttonsToShow[i + 1] - 1) {
        paginationButtons.push(ellipsis);
      }
    }
    if (buttonsToShow[buttonsToShow.length - 1] < numPages - 1) {
      if (buttonsToShow[buttonsToShow.length - 1] < numPages - 2) {
        paginationButtons.push(ellipsis);
      }
      paginationButtons.push(
        <Pagination.Item
          key={numPages}
          active={numPages === currentPage}
          onClick={() => handlePageClick(numPages)}
        >
          {numPages}
        </Pagination.Item>
      );
    }
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
                    handleDeleteItem(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <nav className="d-flex justify-content-between">
          <Pagination className="pe-1">
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => handlePageClick(1)}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => handlePageClick(currentPage - 1)}
            />
            {paginationButtons}
            <Pagination.Next
              disabled={currentPage === numPages}
              onClick={() => handlePageClick(currentPage + 1)}
            />
            <Pagination.Last
              disabled={currentPage === numPages}
              onClick={() => handlePageClick(numPages)}
            />
          </Pagination>
          <div className="input-group mb-3">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="go-to-page-btn"
              onClick={() => {
                handlePageClick(currentValue);
              }}
            >
              Go to page
            </button>
            <input
              type="number"
              className="form-control"
              id="page-input"
              onChange={handleChange}
              value={currentValue}
              min="1"
              max="15"
            />
          </div>
        </nav>
        Total Items: {items.length}
      </div>
    </div>
  );
};

export default ItemsTable;
