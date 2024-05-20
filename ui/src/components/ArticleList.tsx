import { useState, useEffect } from "react";

import Pagination from "./Pagination";
import {
  IArticle,
  TagAction,
  fetchAPage as _fetchAPage,
  fetchNumOfPages as _fetchNumOfPages,
  fetchFilteredArticles as _fetchFilteredArticles,
} from "../utils";
import Sidebar from "./Sidebar";
import "../App.css";
import Header from "./Header";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([] as IArticle[]);
  const [filteredArticles, setFilteredArticles] = useState([] as IArticle[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedTags, setSelectedTags] = useState([] as string[]);

  // run only once when component mounts
  useEffect(() => {
    const fetchpageNumber = async () => {
      const pageNumResponse = await _fetchNumOfPages();
      if (pageNumResponse.success) {
        setTotalPage(pageNumResponse.totalPage);
      }
    };
    fetchpageNumber();
  }, []);

  // run each time currentPage changes
  useEffect(() => {
    const fetchpageContent = async () => {
      const pageResponse = await _fetchAPage(currentPage);
      if (pageResponse.success) {
        setArticles(pageResponse.articlesData);
      }
    };

    fetchpageContent();
  }, [currentPage]);

  useEffect(() => {
    const fetchFilteredArticles = async () => {
      const pageResponse = await _fetchFilteredArticles(selectedTags);
      if (pageResponse.success) {
        setFilteredArticles(pageResponse.articlesData);
      }
    };

    fetchFilteredArticles();
  }, [selectedTags]);

  const updateSelectedTags = (tag: string, action: TagAction) => {
    if (action == TagAction.Add) {
      const updatedTags = [...selectedTags, tag];
      setSelectedTags(updatedTags);
    } else {
      const updatedTags = selectedTags.filter((element) => element !== tag);
      setSelectedTags(updatedTags);
    }
  };

  const displayedArticles =
    filteredArticles.length > 0 ? filteredArticles : articles;

  const shouldShowPagination = filteredArticles.length === 0;

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar onClickCheckbox={updateSelectedTags} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="flex gap-2">
            {displayedArticles.map((article) => (
              <ArticleCard article={article} />
            ))}
          </div>
          {shouldShowPagination && (
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              updateCurrentPage={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
