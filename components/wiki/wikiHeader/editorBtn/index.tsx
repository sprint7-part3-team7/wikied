import styles from '@/pages/wiki/[code]/components/wikiHeader/components/editorBtn/styles.module.scss';
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
          <img src={bold.src} alt="텍스트 굵게 표시 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <img src={italic.src} alt="이탤릭체 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <img src={underline.src} alt="밑줄 아이콘" />
        </button>
        <div className={styles['dividing-line']}></div>
        <span className={styles['subject']}>제목</span>
        <button className={styles['editor-btn']}>
          <img src={arrow.src} alt="토글 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <img src={bullet.src} alt="글머리 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <img src={number.src} alt="번호 매기기 아이콘" />
        </button>
        <button className={styles['editor-btn']}>
          <img src={align.src} alt="정렬 아이콘" />
        </button>
        <div className={styles['dividing-line']}></div>
        <button className={styles['editor-btn']}>
          <img
            src={image.src}
            width={24}
            height={24}
            alt="이미지 첨부 아이콘"
          />
        </button>
        <div className={styles['dividing-line']}></div>
        <button className={styles['editor-btn']}>
          <img
            src={video.src}
            width={24}
            height={24}
            alt="비디오 첨부 아이콘"
          />
        </button>
        <button className={styles['editor-btn']}>
          <img
            src={link.src}
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
