import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getArticleById } from '@/services/api/article';
import { Article } from '@/types/article';
import { useAuth } from '@/contexts/AuthProvider';
import Editor from '@/components/common/editor';

const ArticleEditPage = () => {
  const { id } = useRouter().query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);
  const articleId = Number(Array.isArray(id) ? id[0] : id);
  const { user } = useAuth();

  const fetchArticle = async () => {
    if (!articleId) return;

    try {
      const articleResponse = await getArticleById(articleId);
      const articleData = articleResponse.data;

      articleData.content = articleData.content.replace(/<img.*?>/g, '');
      setArticle(articleData);
      setIsAuthor(user?.id === articleData.writer.id);
    } catch (error) {
      console.error('Failed to fetch article:', error);
      alert('게시글을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <>
      <Editor article={article} />
    </>
  );
};

export default ArticleEditPage;
