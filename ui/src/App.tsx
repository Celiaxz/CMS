import { Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { TagAction } from "./utils";

function App() {
  const [selectedTags, setSelectedTags] = useState([] as string[]);

  const updateSelectedTags = (tag: string, action: TagAction) => {
    if (action == TagAction.Add) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    } else {
      const updatedTags = selectedTags.filter((element) => element !== tag);
      setSelectedTags(updatedTags);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar onClickCheckbox={updateSelectedTags} />
          <Routes>
            <Route
              path="/"
              element={<ArticleList selectedTags={selectedTags} />}
            />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
