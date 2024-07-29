import React, { useState, useEffect } from "react";
import styles from "./BoardList.module.scss";
import { Board } from "./boardType";
import { getArticles } from "./articleApi";
import Image from "next/image";
import searchIcon from "@/assets/icons/ic_search.svg";
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

  useEffect(() => {
    const fetchArticles = async (page: number) => {
      setLoading(true);
      try {
        const data = await getArticles(page, 10, orderOption, searchTerm);
        setBoards(data.list);
        setTotalPages(Math.ceil(data.totalCount / 10));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticles(currentPage);
  }, [currentPage, searchTerm, orderOption]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const renderPageNumbers = () => {
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
  };

  return (
    <div className={styles.boardListContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch}>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              placeholder='제목을 검색해 주세요'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.searchButton} type='submit'>
            검색
          </button>
        </form>
        <OrderDropdown
          options={options}
          selected={orderOption}
          onChange={setOrderOption}
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <table className={styles.boardTable}>
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
          <div className={styles.pagination}>{renderPageNumbers()}</div>
        </>
      )}
    </div>
  );
};

export default BoardList;
