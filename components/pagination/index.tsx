import React from "react";
import styles from "@/components/pagination/styles.module.scss";
import rightArrow from "@/assets/icons/pg_right.svg";
import leftArrow from "@/assets/icons/pg_left.svg";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(startPage + 4, totalPages);

    pageNumbers.push(
      <button
        key='prev'
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Image src={leftArrow} alt='prev' />
      </button>,
    );

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? styles["active"] : ""}
        >
          {i}
        </button>,
      );
    }

    pageNumbers.push(
      <button
        key='next'
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Image src={rightArrow} alt='next' />
      </button>,
    );

    return pageNumbers;
  };

  return <div className={styles["pagination"]}>{renderPageNumbers()}</div>;
};

export default Pagination;
