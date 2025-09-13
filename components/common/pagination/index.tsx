import styles from '@/components/common/pagination/styles.module.scss';
import rightArrow from '@/assets/icons/pg_right.svg';
import leftArrow from '@/assets/icons/pg_left.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useClientWidth from '@/hooks/useClientWidth/useClientWidth';

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
  const clientWidth = useClientWidth(); // 화면 너비
  const [pageGroupSize, setPageGroupSize] = useState<number>(5); // 한번에 보여줄 페이지 수

  // 화면 크기에 따라 페이지 그룹 사이즈 변경
  useEffect(() => {
    if (clientWidth >= 330) setPageGroupSize(5);
    else if (clientWidth > 280) setPageGroupSize(4);
    else if (clientWidth > 230) setPageGroupSize(3);
    else if (clientWidth > 180) setPageGroupSize(2);
    else if (clientWidth > 130) setPageGroupSize(1);
    else if (clientWidth > 80) setPageGroupSize(0);
  }, [clientWidth]);

  // 그룹 단위 계산
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize); // 현재 페이지가 속한 그룹 번호
  const startPage = currentGroup * pageGroupSize + 1; // 현재 그룹의 시작 페이지
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages); // 현재 그룹의 마지막 페이지

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // 이전 그룹 버튼
    if (currentGroup > 0) {
      pageNumbers.push(
        <button key="prev" onClick={() => onPageChange(startPage - 1)}>
          <Image src={leftArrow} alt="prev" />
        </button>,
      );
    }

    // 페이지 번호
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={currentPage === i ? styles['active'] : ''}
        >
          {i}
        </button>,
      );
    }

    // 다음 그룹 버튼
    if (endPage < totalPages) {
      pageNumbers.push(
        <button key="next" onClick={() => onPageChange(endPage + 1)}>
          <Image src={rightArrow} alt="next" />
        </button>,
      );
    }
    return pageNumbers;
  };
  return <div className={styles['pagination']}>{renderPageNumbers()}</div>;
};

export default Pagination;
