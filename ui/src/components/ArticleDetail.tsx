import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IArticle, fetchArticle as _fetchArticle } from "../utils";

const ArticleDetail = () => {
  const [article, setArticle] = useState(undefined as IArticle | undefined);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      const articleResponse = await _fetchArticle(id as string);
      if (articleResponse.success) {
        setArticle(articleResponse.articleData);
      }
    };
    fetchArticle();
  }, []);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      <h1>{article.title}</h1>
      <p>Author: {article.author.name}</p>
      <p>Category: {article.category.name}</p>
      <p>{article.content}</p>
      <div className="tags">
        {article.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <h3>Comments</h3>
      <ul>
        {article.comments.map((comment) => (
          <li key={comment.id}>
            {comment.user}: {comment.content}
          </li>
        ))}
      </ul>
      <form>
        <textarea placeholder="Add a comment..."></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArticleDetail;
