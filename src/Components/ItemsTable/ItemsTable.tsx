import { useState } from "react";

interface Item {
  id: number;
  name: string;
  place: string;
  price: number;
}

const items: Item[] = [
  { id: 1, name: "Item 1", place: "cavea city mall", price: 50 },
  { id: 2, name: "Item 2", place: "cavea city mall", price: 50 },
  { id: 3, name: "Item 3", place: "cavea city mall", price: 50 },
  { id: 4, name: "Item 4", place: "cavea city mall", price: 50 },
  { id: 5, name: "Item 5", place: "cavea city mall", price: 50 },
  { id: 6, name: "Item 6", place: "cavea city mall", price: 50 },
  { id: 7, name: "Item 7", place: "cavea city mall", price: 50 },
  { id: 8, name: "Item 8", place: "cavea city mall", price: 50 },
  { id: 9, name: "Item 9", place: "cavea city mall", price: 50 },
  { id: 10, name: "Item 10", place: "cavea city mall", price: 50 },
  { id: 11, name: "Item 11", place: "cavea city mall", price: 50 },
  { id: 12, name: "Item 12", place: "cavea city mall", price: 50 },
  { id: 13, name: "Item 13", place: "cavea city mall", price: 50 },
  { id: 14, name: "Item 14", place: "cavea city mall", price: 50 },
  { id: 15, name: "Item 15", place: "cavea city mall", price: 50 },
  { id: 16, name: "Item 16", place: "cavea city mall", price: 50 },
  { id: 17, name: "Item 17", place: "cavea city mall", price: 50 },
  { id: 18, name: "Item 18", place: "cavea city mall", price: 50 },
  { id: 19, name: "Item 19", place: "cavea city mall", price: 50 },
  { id: 20, name: "Item 20", place: "cavea city mall", price: 50 },
  { id: 21, name: "Item 21", place: "cavea city mall", price: 50 },
  { id: 22, name: "Item 22", place: "cavea city mall", price: 50 },
  { id: 23, name: "Item 23", place: "cavea city mall", price: 50 },
  { id: 24, name: "Item 24", place: "cavea city mall", price: 50 },
  { id: 25, name: "Item 25", place: "cavea city mall", price: 50 },
  { id: 26, name: "Item 26", place: "cavea city mall", price: 50 },
  { id: 27, name: "Item 27", place: "cavea city mall", price: 50 },
  { id: 28, name: "Item 28", place: "cavea city mall", price: 50 },
  { id: 29, name: "Item 29", place: "cavea city mall", price: 50 },
  { id: 30, name: "Item 30", place: "cavea city mall", price: 50 },
  { id: 31, name: "Item 31", place: "cavea city mall", price: 50 },
  { id: 32, name: "Item 32", place: "cavea city mall", price: 50 },
  { id: 33, name: "Item 33", place: "cavea city mall", price: 50 },
  { id: 34, name: "Item 34", place: "cavea city mall", price: 50 },
  { id: 35, name: "Item 35", place: "cavea city mall", price: 50 },
  { id: 36, name: "Item 36", place: "cavea city mall", price: 50 },
  { id: 37, name: "Item 37", place: "cavea city mall", price: 50 },
  { id: 38, name: "Item 38", place: "cavea city mall", price: 50 },
  { id: 39, name: "Item 39", place: "cavea city mall", price: 50 },
  { id: 40, name: "Item 40", place: "cavea city mall", price: 50 },
  { id: 41, name: "Item 41", place: "cavea city mall", price: 50 },
  { id: 42, name: "Item 42", place: "cavea city mall", price: 50 },
  { id: 43, name: "Item 43", place: "cavea city mall", price: 50 },
  { id: 44, name: "Item 44", place: "cavea city mall", price: 50 },
  { id: 45, name: "Item 45", place: "cavea city mall", price: 50 },
  { id: 46, name: "Item 46", place: "cavea city mall", price: 50 },
  { id: 47, name: "Item 47", place: "cavea city mall", price: 50 },
  { id: 48, name: "Item 48", place: "cavea city mall", price: 50 },
  { id: 49, name: "Item 49", place: "cavea city mall", price: 50 },
  { id: 50, name: "Item 50", place: "cavea city mall", price: 50 },
  { id: 51, name: "Item 51", place: "cavea city mall", price: 50 },
  { id: 52, name: "Item 52", place: "cavea city mall", price: 50 },
  { id: 53, name: "Item 53", place: "cavea city mall", price: 50 },
  { id: 54, name: "Item 54", place: "cavea city mall", price: 50 },
  { id: 55, name: "Item 55", place: "cavea city mall", price: 50 },
  { id: 56, name: "Item 56", place: "cavea city mall", price: 50 },
  { id: 57, name: "Item 57", place: "cavea city mall", price: 50 },
  { id: 58, name: "Item 58", place: "cavea city mall", price: 50 },
  { id: 59, name: "Item 59", place: "cavea city mall", price: 50 },
  { id: 60, name: "Item 60", place: "cavea city mall", price: 50 },
]; // list of Items

const ItemsTable = () => {
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
            <th>Place</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.place}</td>
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
