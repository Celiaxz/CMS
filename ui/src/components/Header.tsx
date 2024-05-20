import React from "react";

const Header = () => {
  return (
    <header className="w-full  bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">MyApp</div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
    </header>
  );
};

export default Header;
