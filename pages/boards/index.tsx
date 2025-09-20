import ArticleList from "@/components/boards/articleList";
import BestArticleList from "@/components/boards/bestArticleList";

const Boards = () => {
  return (
    <div>
      <BestArticleList />
      <ArticleList />
    </div>
  );
};

export default Boards;
