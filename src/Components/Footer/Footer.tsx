import { ChangeEvent, useState } from "react";
import { Pagination } from "react-bootstrap";

const clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(num, max));
};

const Footer = (props: any) => {
  const { totalItems, currentPage } = props;
  const [currentValue, setCurrentValue] = useState(1);
  const itemsPerPage = 20;
  const totalPagesNumber = Math.ceil(totalItems / itemsPerPage);

  const paginationButtons = [];
  const maxButtons = 3;
  const ellipsis = <Pagination.Ellipsis disabled />;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setCurrentValue(clamp(parseInt(e.target.value), 1, totalPagesNumber));
  }
  function handlePageClick(pageNumber: number) {
    if (props.onPageChange) {
      props.onPageChange(pageNumber);
    }
  }

  if (totalPagesNumber <= maxButtons) {
    for (let i = 1; i <= totalPagesNumber; i++) {
      paginationButtons.push(
        <Pagination.Item
          key={`pagination_${i}`}
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
      if (currentPage + i < totalPagesNumber) {
        buttonsToShow.push(currentPage + i);
      }
    }
    if (buttonsToShow[0] > 2) {
      paginationButtons.push(
        <Pagination.Item
          key={"pagination_1"}
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
          key={`pagination_${page}`}
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
    if (buttonsToShow[buttonsToShow.length - 1] < totalPagesNumber - 1) {
      if (buttonsToShow[buttonsToShow.length - 1] < totalPagesNumber - 2) {
        paginationButtons.push(ellipsis);
      }
      paginationButtons.push(
        <Pagination.Item
          key={`pagination_${totalPagesNumber}`}
          active={totalPagesNumber === currentPage}
          onClick={() => handlePageClick(totalPagesNumber)}
        >
          {totalPagesNumber}
        </Pagination.Item>
      );
    }
  }

  return (
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
            disabled={currentPage === totalPagesNumber}
            onClick={() => handlePageClick(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage === totalPagesNumber}
            onClick={() => handlePageClick(totalPagesNumber)}
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
      Total Items: {totalItems}
    </div>
  );
};

export default Footer;
