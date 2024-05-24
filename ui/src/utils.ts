import axios from "axios";
import { BASE_URL } from "../config/config.index";

//define structure of category object
export interface ICategory {
  id: string;
  name: string;
  description: string;
}

//define structure of the response when fetching categories
export interface ICategoriesResponse {
  success: boolean;
  categoryData: ICategory[];
  error?: string;
}

//group constant instead of creating two new variable
//to define possible action for chcckbox
export enum CheckboxAction {
  Add,
  Remove,
}

//define structure of the response when fetching tags
export interface ITagsResponse {
  success: boolean;
  tagData: string[];
  error?: string;
}

//article metadata, define structure of an author object
export interface IAuthor {
  id: number;
  name: string;
  email: string;
  bio: string;
}

//define structure of an comment object
export interface IComment {
  id: number;
  user: string;
  content: string;
}

//structure of an article object
export interface IArticle {
  id: number;
  title: string;
  content: string;
  author: IAuthor;
  category: ICategory;
  tags: string[];
  comments: IComment[];
}

//structure of the response when fetching a page of articles
export interface IPageResponse {
  success: boolean;
  articlesData: IArticle[];
  error?: string;
}
// define structure response when fetching total num of pages
export interface ITotalPageResponse {
  success: boolean;
  totalPage: number;
  error?: string;
}

// / define structure response when fetching single article
export interface IArticleResponse {
  success: boolean;
  articleData: IArticle;
  error?: string;
}

// const BASE_URL = import.meta.env.SERVER_BASE_URL;

//fetches categories from the API & return the response in the structure defined by icategoriesresponse
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}categories`);
    const categories: ICategoriesResponse = {
      success: true,
      categoryData: response.data,
    };
    return categories;
  } catch (e) {
    console.log("Error: ", e);
    return {
      success: false,
      error: "Unable to fetch categories data",
      categoryData: [],
    } as ICategoriesResponse;
  }
};

//fetches TAGS from the API & return the response in the structure defined by itagresponse
export const fetchTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}tags`);
    return {
      success: true,
      tagData: response.data,
    } as ITagsResponse;
  } catch (e) {
    console.log("Error: ", e);
    return {
      success: false,
      error: "Unable to fetch tags data",
      tagData: [],
    } as ITagsResponse;
  }
};

//fetch each article page

export const fetchAPage = async (pageNum: number) => {
  try {
    const response = await axios.get(`${BASE_URL}articles/page/${pageNum}`);
    return {
      success: true,
      articlesData: response.data,
    } as IPageResponse;
  } catch (error) {
    console.log("error..", error);
    return {
      success: false,
      error: "Unable to fetch page data",
      articlesData: [],
    } as IPageResponse;
  }
};

export const fetchNumOfPages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}numofpages`);
    return {
      success: true,
      totalPage: response.data,
    } as ITotalPageResponse;
  } catch (e) {
    console.log("Error: ", e);
    return {
      success: false,
      error: "Unable to fetch tags data",
    } as ITotalPageResponse;
  }
};

export const fetchArticle = async (id: string) => {
  try {
    const response = await axios.get(`${BASE_URL}articles/${id}`);
    return {
      success: true,
      articleData: response.data,
    } as IArticleResponse;
  } catch (e) {
    console.log("Error: ", e);
    return {
      success: false,
      error: "Unable to fetch article data",
    } as IArticleResponse;
  }
};

export const fetchFilteredArticles = async (
  selectedTags: string[],
  selectedCategories: string[]
) => {
  try {
    const response = await axios.post(`${BASE_URL}filter/articles`, {
      tags: selectedTags,
      categories: selectedCategories,
    });
    return {
      success: true,
      articlesData: response.data,
    } as IPageResponse;
  } catch (e) {
    console.log("Error: ", e);
    return {
      success: false,
      error: "Unable to fetch article data",
      articlesData: [],
    } as IPageResponse;
  }
};
