import styles from '@/pages/wiki/components/wikiAside/styles.module.scss';
import Image from 'next/image';

interface WikiAsideProps {
  className?: string;
}

const WikiAside: React.FC<WikiAsideProps> = ({ className }) => {
  return (
    <div className={`${styles['user-profile']} ${className}`}>
      {/* <Image src={} width={200} height={200}/> */}
      <div className={styles['image-container']}>
        <div className={styles['image']}>임시 이미지</div>
      </div>
      <div className={styles['user-attribute-container']}>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>거주 도시</span>
          <span className={styles['attribute-value']}>서울</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>MBTI</span>
          <span className={styles['attribute-value']}>INFJ</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>직업</span>
          <span className={styles['attribute-value']}>
            코드잇 콘텐츠 프로듀서
          </span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>SNS 계정</span>
          <span className={styles['attribute-value']}>dlwlehd_official</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>생일</span>
          <span className={styles['attribute-value']}>1999-12-31</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>별명</span>
          <span className={styles['attribute-value']}>없음</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>혈액형</span>
          <span className={styles['attribute-value']}>A</span>
        </div>
        <div className={styles['user-attribute']}>
          <span className={styles['attribute-name']}>국적</span>
          <span className={styles['attribute-value']}>대한민국</span>
        </div>
      </div>
    </div>
  );
};

export default WikiAside;
