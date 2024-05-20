import { useState, useEffect } from "react";

import {
  ICategory,
  TagAction,
  fetchCategories as _fetchCategories,
  fetchTags as _fetchTags,
} from "../utils";
import Tag from "./Tag";

interface ISideBar {
  onClickCheckbox: (tag: string, action: TagAction) => void;
}

const Sidebar = (props: ISideBar) => {
  // in the useState, specify the type of the value as it's required in typescript
  const [categories, setCategories] = useState([] as ICategory[]);
  const [tags, setTags] = useState([] as string[]);

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
    <aside className="w-64 bg-blue-100 p-4 ">
      <h2 className="font-bold text-xl text-blue-900 mb-4">Categories</h2>
      <article>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </article>
      <h2 className="font-bold text-xl text-blue-900 mb-4 flex justify-between items-center">
        Filter by Tags
      </h2>
      <div>
        {tags.map((tag) => (
          <Tag tag={tag} onClickCheckbox={props.onClickCheckbox} />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
