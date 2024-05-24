import { useState, useEffect } from "react";

import {
  ICategory,
  CheckboxAction,
  fetchCategories as _fetchCategories,
  fetchTags as _fetchTags,
} from "../utils";
import Checkbox from "./Checkbox";

//define interface for component props
interface ISideBar {
  onClickTagbox: (tag: string, action: CheckboxAction) => void;
  onClickCategorybox: (tag: string, action: CheckboxAction) => void;
}

const Sidebar = (props: ISideBar) => {
  // in the useState, specify the type of the value as it's required in typescript
  const [categories, setCategories] = useState([] as ICategory[]);
  const [tags, setTags] = useState([] as string[]);

  //use effect to fetch categories and tags when component mounts
  // update state with fetched data
  useEffect(() => {
    // need to wrap the aync call in a function
    // as useEffect does not support calling async functions directly
    const fetchCategories = async () => {
      const categoryResponse = await _fetchCategories();
      if (categoryResponse.success) {
        setCategories(categoryResponse.categoryData);
      }
    };
    const fetchTags = async () => {
      const tagsResponse = await _fetchTags();
      if (tagsResponse.success) {
        setTags(tagsResponse.tagData);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  return (
    <aside className="w-[25%] h-[100vh] bg-blue-100 p-4  ">
      <h2 className="font-bold text-xl text-blue-900 mb-4">Categories</h2>

      <div className="flex flex-col">
        {categories.map((category) => (
          <Checkbox
            fieldName={category.name}
            onClickCheckbox={props.onClickCategorybox}
          />
        ))}
      </div>

      <h2 className="font-bold text-xl text-blue-900 mb-4 flex justify-between items-center">
        Filter by Tags
      </h2>
      <div className="flex flex-col">
        {tags.map((tag) => (
          <Checkbox fieldName={tag} onClickCheckbox={props.onClickTagbox} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
