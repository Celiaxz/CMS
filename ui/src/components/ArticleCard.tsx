import "./ArticleCard.css";
import { useNavigate } from "react-router-dom";
import { IArticle } from "../utils";

interface IArticleCard {
  article: IArticle;
}

const ArticleCard = (props: IArticleCard) => {
  const navigate = useNavigate();
  const { article } = props;

  const onClickArticle = (id: number) => {
    // e.preventDefault();
    navigate(`/article/${id}`);
  };

  return (
    <div
      className="border p-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-blue-300 text-white"
      key={article.id}
    >
      <h2
        className="text-2xl font-bold mb-2"
        onClick={() => onClickArticle(article.id)}
      >
        {article.title}
        {/* <Link to={`/article/${article.id}`}></Link> */}
      </h2>
      <p className="mb-3">{article.content.substring(0, 100)}...</p>
      <p className="font-semibold mb-3">Author: {article.author.name}</p>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            className="bg-blue-900 rounded-full px-3 py-1 text-sm"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArticleCard;
