import React, { useState, useEffect, useCallback } from "react";
import styles from "./BoardList.module.scss";
import { Board } from "./boardType";
import { getArticles } from "./articleApi";
import Image from "next/image";
import likeIcon from "@/assets/icons/ic_heart.svg";
import OrderDropdown from "./OrderDropdown";

const BoardList = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderOption, setOrderOption] = useState("recent");

  const options = [
    { value: "recent", label: "최신순" },
    { value: "like", label: "인기순" },
  ];

  const fetchArticles = useCallback(
    async (page: number, search: string) => {
      setLoading(true);
      try {
        const data = await getArticles(page, 10, orderOption, search);
        setBoards(data.list);
        setTotalPages(Math.ceil(data.totalCount / 10));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
    [orderOption],
  );

  useEffect(() => {
    fetchArticles(currentPage, searchTerm);
  }, [currentPage, orderOption, fetchArticles]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setCurrentPage(1);
      fetchArticles(1, searchTerm);
    },
    [fetchArticles, searchTerm],
  );

  const handleSearchTermChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [],
  );

  const handleOrderChange = useCallback(
    (value: string) => {
      setOrderOption(value);
      setCurrentPage(1);
      fetchArticles(1, searchTerm);
    },
    [fetchArticles, searchTerm],
  );

  const renderPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    pageNumbers.push(
      <button
        key='prev'
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>,
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.active : ""}
        >
          {i}
        </button>,
      );
    }

    pageNumbers.push(
      <button
        key='next'
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>,
    );

    return pageNumbers;
  }, [currentPage, totalPages, handlePageChange]);

  return (
    <div className={styles["board-list-container"]}>
      <div className={styles["search-container"]}>
        <form onSubmit={handleSearch}>
          <div className={styles["input-wrapper"]}>
            <input
              type='text'
              placeholder='제목을 검색해 주세요'
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
          </div>
          <button className={styles["search-button"]} type='submit'>
            검색
          </button>
        </form>
        <OrderDropdown
          options={options}
          selected={orderOption}
          onChange={handleOrderChange}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className={styles["board-table"]}>
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
                <tr key={board.id}>
                  <td>{board.id}</td>
                  <td>{board.title}</td>
                  <td>{board.writer.name}</td>
                  <td>{board.likeCount}</td>
                  <td>{new Date(board.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles["mobile-list"]}>
            {boards.map((board) => (
              <div key={board.id} className={styles["mobile-list-item"]}>
                <div className={styles["title"]}>{board.title}</div>
                <div className={styles["info"]}>
                  <span className={styles["author"]}>{board.writer.name}</span>
                  <span className={styles["date"]}>
                    {new Date(board.createdAt).toLocaleDateString()}
                  </span>
                  <span className={styles["like-count"]}>
                    <Image
                      src={likeIcon}
                      alt='likeIcon'
                      width={18}
                      height={18}
                    />
                    {board.likeCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["pagination"]}>{renderPageNumbers()}</div>
        </>
      )}
    </div>
  );
};

export default BoardList;
