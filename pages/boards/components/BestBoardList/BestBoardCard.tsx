"use client";

import React from "react";
import Image from "next/image";
import styles from "./BestBoardList.module.scss";
import likeIcon from "@/assets/icons/ic_heart.svg";
import { Board } from "../boardType";

interface BestBoardCardProps {
  board: Board;
}

const BestBoardCard = ({ board }: BestBoardCardProps) => {
  return (
    <div className={styles["board-card"]}>
      <Image
        src={board.image}
        alt={board.title}
        className={styles["image"]}
        width={250}
        height={131}
      />
      <div className={styles["content"]}>
        <div className={styles["content-title"]}>{board.title}</div>
        <div className={styles["content-info"]}>
          <div className={styles["content-description"]}>
            <p>{board.writer.name}</p>
            <p>{new Date(board.createdAt).toLocaleDateString()}</p>
          </div>
          <div className={styles["like-count"]}>
            <Image src={likeIcon} alt='likeIcon' width={18} />
            <span>{board.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestBoardCard;
