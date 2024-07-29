import React, { useState, useEffect } from "react";
import styles from "./BestBoardList.module.scss";
import { Board } from "./boardType";
import { getArticles } from "./articleApi";
import BestBoardCard from "./BestBoardCard";

const BestBoardList: React.FC = () => {
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
    <div className={styles.bestBoardList}>
      <div className={styles.bestBoardHeader}>
        <h2>베스트 게시글</h2>
        <button className={styles.addBoardButton}>게시물 등록하기</button>
      </div>
      <div className={styles.boardGrid}>
        {bestBoards.map((board) => (
          <BestBoardCard key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default BestBoardList;
