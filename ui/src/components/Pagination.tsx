interface IPagination {
  currentPage: number;
  totalPage: number;
  updateCurrentPage: (pageNumber: number) => void;
}

// initialize component
// destructure total page and updatecurrentpage from props
// initialize pageNumbers to empty array
//loop and generate number of page from 1 to totlapge
//push method to add new items to end of an array
const Pagination = (props: IPagination) => {
  const { totalPage, updateCurrentPage } = props;
  const pageNumbers = [];

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  //maps over pagenumbers to render pagination buttons (objects)
  //calls updatecurrentpage setter when button is clicked
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
