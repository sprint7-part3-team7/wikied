import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';
import { Article } from '@/types/article';
import { getArticles } from '@/services/api/article';
import SearchForm from '@/components/common/searchForm';
import Pagination from '@/components/common/pagination';
import likeIcon from '@/assets/icons/ic_heart.svg';
import OrderDropdown from '../articleOrderDropdown';
import { useRouter } from 'next/router';

const ArticleList = () => {
  const [boards, setBoards] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderOption, setOrderOption] = useState('recent');

  const router = useRouter();

  const orderOptions = [
    { value: 'recent', label: '최신순' },
    { value: 'like', label: '인기순' },
  ];

  const fetchArticles = useCallback(
    async (page: number, search: string, order: string) => {
      setLoading(true);
      try {
        const response = await getArticles({
          page,
          pageSize: 10,
          orderBy: order,
          keyword: search,
        });
        const data = response.data;
        setBoards(data.list);
        setTotalPages(Math.ceil(data.totalCount / 10));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchArticles(currentPage, searchTerm, orderOption);
  }, [currentPage, orderOption, searchTerm, fetchArticles]);

  const handleSearch = useCallback(
    (term: string) => {
      setSearchTerm(term);
      setCurrentPage(1);
      fetchArticles(1, term, orderOption);
    },
    [orderOption, fetchArticles],
  );

  const handleOrderChange = useCallback(
    (value: string) => {
      setOrderOption(value);
      setCurrentPage(1);
      fetchArticles(1, searchTerm, value);
    },
    [searchTerm, fetchArticles],
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleClick = (id: number) => {
    router.push(`/boards/${id}`);
  };

  return (
    <div className={styles['board-list-container']}>
      <div className={styles['search-order-container']}>
        <SearchForm onSearch={handleSearch} text="제목을 검색해 주세요" />
        <OrderDropdown
          options={orderOptions}
          selected={orderOption}
          onChange={handleOrderChange}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className={styles['board-table']}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>좋아요</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr key={board.id} onClick={() => handleClick(board.id)}>
                  <td>{board.id}</td>
                  <td>{board.title}</td>
                  <td>{board.writer.name}</td>
                  <td>{board.likeCount}</td>
                  <td>{new Date(board.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles['mobile-list']}>
            {boards.map((board) => (
              <div
                key={board.id}
                className={styles['mobile-list-item']}
                onClick={() => handleClick(board.id)}
              >
                <div className={styles['title']}>{board.title}</div>
                <div className={styles['info']}>
                  <span className={styles['author']}>{board.writer.name}</span>
                  <span className={styles['date']}>
                    {new Date(board.createdAt).toLocaleDateString()}
                  </span>
                  <span className={styles['like-count']}>
                    <Image
                      src={likeIcon}
                      alt="likeIcon"
                      width={18}
                      height={18}
                    />
                    {board.likeCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ArticleList;
