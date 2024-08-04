import Image from 'next/image';
import styles from '@/pages/wiki/[code]/components/wikiHeader/styles.module.scss';
import bold from '@/assets/icons/ic_bold.svg';
import italic from '@/assets/icons/ic_italic.svg';
import underline from '@/assets/icons/ic_underline.svg';
import arrow from '@/assets/icons/ic_arrow.svg';
import bullet from '@/assets/icons/ic_bullet.svg';
import number from '@/assets/icons/ic_number.svg';
import align from '@/assets/icons/align_left.svg';
import image from '@/assets/icons/ic_image.svg';
import video from '@/assets/icons/ic_video.svg';
import link from '@/assets/icons/ic_link.svg';

const EditorBtn = () => {
  return (
    <div className={styles['editor-container']}>
      <div className={styles['editor-wrapper']}>
        <button className={styles['editor-btn']}>
          <Image
            src={bold}
            width={24}
            height={24}
            alt="텍스트 굵게 표시 아이콘"
          />
        </button>
        <button className={styles['editor-btn']}>
          <Image src={italic} width={24} height={24} alt="이탤릭체 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <Image src={underline} width={24} height={24} alt="밑줄 아이콘" />
        </button>
        <div className={styles['dividing-line']}></div>
        <span className={styles['subject']}>제목</span>
        <button className={styles['editor-btn']}>
          <Image src={arrow} width={24} height={24} alt="토글 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <Image src={bullet} width={24} height={24} alt="글머리 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <Image src={number} width={24} height={24} alt="번호 매기기 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <Image src={align} width={24} height={24} alt="정렬 아이콘" />
        </button>
        <div className={styles['dividing-line']}></div>
        <button className={styles['editor-btn']}>
          <Image src={image} width={24} height={24} alt="이미지 첨부 아이콘" />
        </button>
        <div className={styles['dividing-line']}></div>
        <button className={styles['editor-btn']}>
          <Image src={video} width={24} height={24} alt="비디오 첨부 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <Image
            src={link}
            width={24}
            height={24}
            alt="하이퍼링크 추가 아이콘"
          />
        </button>
      </div>
    </div>
  );
};

export default EditorBtn;
