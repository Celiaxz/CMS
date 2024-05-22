import { Route, Routes, useLocation } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { CheckboxAction } from "./utils";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [selectedTags, setSelectedTags] = useState([] as string[]);
  const [selectedCategories, setSelectedCategories] = useState([] as string[]);
  // this is called when tag checkbox is interacted with
  // if CheckBoXAction is ADD, a new tag was selected, add the new tag to list of selected tags
  // else, action is REMOVE, and we remove the tag from list of selected tags
  // the list of the tags are stored in selectedTags
  const updateSelectedTags = (tag: string, action: CheckboxAction) => {
    if (action == CheckboxAction.Add) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    } else {
      const updatedTags = selectedTags.filter((element) => element !== tag);
      setSelectedTags(updatedTags);
    }
  };
  // this is called when category checkbox is interacted with
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

  // hook to conditionally render sidebar
  const useShowSidebar = () => {
    const location = useLocation();
    return location.pathname.startsWith("/article");
  };

  const showSidebar = useShowSidebar();

  return (
    <>
      <div className="flex flex-col">
        <Header />
        <div className="flex flex-1">
          {showSidebar && (
            <Sidebar
              onClickTagbox={updateSelectedTags}
              onClickCategorybox={updateSelectedCategories}
            />
          )}
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/article"
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
