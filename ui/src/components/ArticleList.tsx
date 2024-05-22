import { useState, useEffect } from "react";

import Pagination from "./Pagination";
import {
  IArticle,
  fetchAPage as _fetchAPage,
  fetchNumOfPages as _fetchNumOfPages,
  fetchFilteredArticles as _fetchFilteredArticles,
} from "../utils";
import ArticleCard from "./ArticleCard";

interface IArticleList {
  selectedTags: string[];
  selectedCategories: string[];
}

const ArticleList = (props: IArticleList) => {
  const { selectedTags, selectedCategories } = props;
  const [articles, setArticles] = useState([] as IArticle[]);
  const [filteredArticles, setFilteredArticles] = useState([] as IArticle[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

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
      const pageResponse = await _fetchFilteredArticles(
        selectedTags,
        selectedCategories
      );
      if (pageResponse.success) {
        setFilteredArticles(pageResponse.articlesData);
      }
    };

    fetchFilteredArticles();
  }, [selectedTags, selectedCategories]);

  // if filtered articles are available, display it
  // else display normal page article
  const displayedArticles =
    filteredArticles.length > 0 ? filteredArticles : articles;

  // Should display no data found when we have filters applied
  // but server did not return any data for the filters.
  // This can occur when user have both category and tag filters applied
  const shouldDisplayNoDataFound = () => {
    const filterIsApplied =
      selectedTags.length > 0 || selectedCategories.length > 0;
    const noFilteredArticleFound = filteredArticles.length === 0;
    return filterIsApplied && noFilteredArticleFound;
  };

  const displayNoDataMessage = shouldDisplayNoDataFound();

  return (
    <div className="w-[75%] flex-1 flex flex-col left-0   p-4 flex-wrap  ">
      <div className="flex flex-wrap gap-2">
        {displayNoDataMessage && <div>No Data Found. Please check filters</div>}
        {!displayNoDataMessage &&
          displayedArticles.map((article) => <ArticleCard article={article} />)}
      </div>
      <div className="flex flex-start">
        {!displayNoDataMessage && (
          <Pagination
            currentPage={currentPage}
            totalPage={totalPage}
            updateCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ArticleList;
