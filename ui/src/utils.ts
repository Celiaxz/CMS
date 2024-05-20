import axios from "axios";
import { BASE_URL } from "../config/config.index";

export interface ICategory {
  id: string;
  name: string;
  description: string;
}

export interface ICategoriesResponse {
  success: boolean;
  categoryData: ICategory[];
  error?: string;
}

export enum CheckboxAction {
  Add,
  Remove,
}

export interface ITagsResponse {
  success: boolean;
  tagData: string[];
  error?: string;
}

//article metadata
export interface IAuthor {
  id: number;
  name: string;
  email: string;
  bio: string;
}

export interface IComment {
  id: number;
  user: string;
  content: string;
}

export interface IArticle {
  id: number;
  title: string;
  content: string;
  author: IAuthor;
  category: ICategory;
  tags: string[];
  comments: IComment[];
}

export interface IPageResponse {
  success: boolean;
  articlesData: IArticle[];
  error?: string;
}

export interface ITotalPageResponse {
  success: boolean;
  totalPage: number;
  error?: string;
}

export interface IArticleResponse {
  success: boolean;
  articleData: IArticle;
  error?: string;
}

// const BASE_URL = import.meta.env.SERVER_BASE_URL;

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
