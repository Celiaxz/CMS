import React from "react";

interface IPagination {
  currentPage: number;
  totalPage: number;
  updateCurrentPage: (pageNumber: number) => void;
}

const Pagination = (props: IPagination) => {
  const { currentPage, totalPage, updateCurrentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => updateCurrentPage(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
