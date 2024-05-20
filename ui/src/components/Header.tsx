const Header = () => {
  return (
    <header className="w-full  bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">CMS</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="py-1 w-full rounded-full border border-blue-900  outline-blue-300 px-4 "
        />
      </div>
    </header>
  );
};

export default Header;
