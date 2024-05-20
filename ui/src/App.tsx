import { Route, Routes } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { CheckboxAction } from "./utils";

function App() {
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);
  const updateSelectedTags = (tag: string, action: CheckboxAction) => {
    if (action == CheckboxAction.Add) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    } else {
      const updatedTags = selectedTags.filter((element) => element !== tag);
      setSelectedTags(updatedTags);
    }
  };

  const updateSelectedCategories = (tag: string, action: CheckboxAction) => {
    if (action == CheckboxAction.Add) {
      const updatedCategories = [...selectedCategories, tag];
      setSelectedCategories(updatedCategories);
    } else {
      const updatedCategories = selectedCategories.filter(
        (element) => element !== tag
      );
      setSelectedCategories(updatedCategories);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar
            onClickTagbox={updateSelectedTags}
            onClickCategorybox={updateSelectedCategories}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ArticleList
                  selectedTags={selectedTags}
                  selectedCategories={selectedCategories}
                />
              }
            />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
