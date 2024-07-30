import React, { useState, useEffect } from "react";
import styles from "./BestBoardList.module.scss";
import { Board } from "../boardType";
import { getArticles } from "../articleApi";
import BestBoardCard from "./BestBoardCard";

const BestBoardList = () => {
  const [bestBoards, setBestBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async () => {
    try {
      const response = await getArticles(1, 4, "like");
      setBestBoards(response.list);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles["best-board-list"]}>
      <div className={styles["best-board-header"]}>
        <div className={styles["header"]}>베스트 게시글</div>
        <button className={styles["add-board-button"]}>게시물 등록하기</button>
      </div>
      <div className={styles["board-grid"]}>
        {bestBoards.map((board) => (
          <BestBoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BestBoardList;