interface IPagination {
  currentPage: number;
  totalPage: number;
  updateCurrentPage: (pageNumber: number) => void;
}

const Pagination = (props: IPagination) => {
  const { totalPage, updateCurrentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className=" flex gap-2 mt-8">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className=" hover:bg-blue-300 cursor-pointer w-[25px] h-[25px] border text-center rounded-sm"
          >
            <button onClick={() => updateCurrentPage(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
