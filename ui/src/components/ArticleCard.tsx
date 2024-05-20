import { useNavigate } from "react-router-dom";
import { IArticle } from "../utils";

interface IArticleCard {
  article: IArticle;
}

const ArticleCard = (props: IArticleCard) => {
  const navigate = useNavigate();
  const { article } = props;

  const onClickArticle = (id: number) => {
    navigate(`/article/${id}`);
  };

  return (
    <div
      onClick={() => onClickArticle(article.id)}
      className="w-[250px] border p-3 rounded-lg shadow-lg bg-gradient-to-r   hover:shadow-md cursor-pointer hover:bg-gray-200"
      key={article.id}
    >
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <p className="mb-3">{article.content.substring(0, 100)}...</p>
      <p className="font-semibold mb-3">Author: {article.author.name}</p>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            className="bg-blue-900 rounded-full px-3 py-1 text-xs text-gray-300"
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
