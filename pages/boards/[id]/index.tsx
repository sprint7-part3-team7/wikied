import { getArticleDetail } from "@/services/api/article";
import { Article } from "@/types/article";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import likeIcon from "@/assets/icons/ic_heart.svg";

const ArticleDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const articleData = await getArticleDetail(Number(id));
          articleData.content = articleData.content.replace(/<img.*?>/g, "");
          console.log(articleData);
          setArticle(articleData);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleBackButtonClick = () => {
    router.push("/boards");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className={styles["article"]}>
      <div className={styles["article-container"]}>
        <div className={styles["article-header"]}>
          <div className={styles["header-wrapper"]}>
            <div className={styles["article-title"]}>{article.title}</div>
            <div className={styles["header-button-wrapper"]}>
              <button
                className={`${styles["header-button"]} ${styles["edit"]}`}
              >
                수정하기
              </button>
              <button
                className={`${styles["header-button"]} ${styles["delete"]}`}
              >
                삭제하기
              </button>
            </div>
          </div>
          <div className={styles["article-info"]}>
            <div className={styles["article-description"]}>
              <span>{article.writer.name}</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles["like-count"]}>
              <Image src={likeIcon} alt='likeIcon' width={18} />
              <span>{article.likeCount}</span>
            </div>
          </div>
        </div>

        <div className={styles["image"]}>
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              width={500}
              height={300}
            />
          )}
        </div>
        <div
          className={styles["content"]}
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
      <button className={styles["button-back"]} onClick={handleBackButtonClick}>
        목록으로
      </button>
    </div>
  );
};

export default ArticleDetailPage;
