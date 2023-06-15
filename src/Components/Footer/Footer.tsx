import React, { useState, useMemo, useEffect } from 'react';
import Pagination from '../Pagination/pagination';

const clamp = (num: number, min: number, max: number) => {
  return Math.max(min, Math.min(num, max));
};

let PageSize = 20;

const Footer = (props: any) => {
  
  const { totalItems } = props;
  
  const [currentPage, setCurrentPage] = useState(1);

  useMemo(() => {
    props.onPageChange(currentPage)
  },[currentPage])

  return (
    <div className="d-flex justify-content-between">
      <nav className="d-flex justify-content-between">
      <Pagination
        className="pagination-bar"
        siblingCount={1}
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </nav>
      Total Items: {totalItems}
    </div>
  );
};

export default Footer;
