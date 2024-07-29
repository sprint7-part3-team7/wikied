"use client";

import React from "react";
import Image from "next/image";
import styles from "./BestBoardList.module.scss";
import likeIcon from "@/assets/icons/ic_heart.svg";
import { Board } from "./boardType";

interface BestBoardCardProps {
  board: Board;
}

const BestBoardCard: React.FC<BestBoardCardProps> = ({ board }) => {
  return (
    <div className={styles.boardCard}>
      <Image
        src={board.image}
        alt={board.title}
        className={styles.image}
        width={250}
        height={131}
      />
      <div className={styles.content}>
        <h3>{board.title}</h3>
        <div className={styles.contentInfo}>
          <div className={styles.contentDescription}>
            <p>{board.writer.name}</p>
            <p>{new Date(board.createdAt).toLocaleDateString()}</p>
          </div>
          <div className={styles.likeCount}>
            <Image src={likeIcon} alt='likeIcon' width={18} />
            <span>{board.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestBoardCard;
