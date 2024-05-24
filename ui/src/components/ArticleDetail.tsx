import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IArticle, fetchArticle as _fetchArticle } from "../utils";

const ArticleDetail = () => {
  const [article, setArticle] = useState(undefined as IArticle | undefined);
  const { id } = useParams();

  //useffect to fetch article data on component mount
  //if sucessful update article with fetched data
  useEffect(() => {
    const fetchArticle = async () => {
      const articleResponse = await _fetchArticle(id as string);
      if (articleResponse.success) {
        setArticle(articleResponse.articleData);
      }
    };
    fetchArticle();
  }, []);

  if (!article) return <div>Loading...</div>; //loading message if article data is not yet available

  return (
    <div className="flex flex-col p-5">
      <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
      <p className=" italic  py-2">Author: {article.author.name}</p>
      <p className="text-xs mb-5">
        Category:{" "}
        <span className=" rounded-full bg-black text-white p-1 text-[10px] ">
          {article.category.name}
        </span>{" "}
      </p>
      <p className="my-5">{article.content}</p>
      <div className="tags border-t border-b border-gray-300 p-2 gap-2 flex">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border text-xs p-1 bg-blue-200 "
          >
            #{tag}
          </span>
        ))}
      </div>
      <h3 className=" text-4xl font-bold py-5">Comments</h3>
      <div className=" flex flex-col gap-2">
        {article.comments.map((comment) => (
          <div key={comment.id} className="">
            <span className=" bg-blue-300 text-white p-1 rounded-t-lg">
              {comment.user}
            </span>
            <div className="border p-3 rounded-b-lg border-blue-300">
              {" "}
              {comment.content}
            </div>
          </div>
        ))}
      </div>
      <form className="mt-5">
        <textarea
          placeholder="Add a comment..."
          className="w-full border border-gray-300 rounded-lg p-2  outline-blue-300 h-[150px]"
        ></textarea>
        <div className="flex justify-end py-5">
          <button
            type="submit"
            className=" px-5 py-2 bg-blue-900 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleDetail;
