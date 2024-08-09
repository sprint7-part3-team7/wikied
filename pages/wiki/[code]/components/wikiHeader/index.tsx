import { useState } from 'react';
import { ProfileDetail, Section } from '@/types/wiki';
import EditorBtn from '@/pages/wiki/[code]/components/wikiHeader/components/editorBtn';
import Button from '@/components/button';
import SnackBar from '@/components/snackbar';
import styles from '@/pages/wiki/[code]/components/wikiHeader/styles.module.scss';
import link from '@/assets/icons/ic_link.svg';

interface WikiHeaderProps {
  className?: string;
  profile: ProfileDetail;
  sections: Section[];
  isEditable: boolean;
  onParticipateClick: () => void;
}

const WikiHeader = ({
  className,
  profile,
  sections,
  isEditable,
  onParticipateClick,
}: WikiHeaderProps) => {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);

  const hasSections = sections.length > 0;

  const handleCopyClick = () => {
    const linkToCopy = `https://www.wikied.kr/${profile.code}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setSnackBarMessage('내 위키 링크가 복사되었습니다.');
        setShowSnackBar(true);
        setTimeout(() => setShowSnackBar(false), 3000);
      })
      .catch((err) => {
        setSnackBarMessage('복사에 실패했습니다.');
        setShowSnackBar(true);
        setTimeout(() => setShowSnackBar(false), 3000);
      });
  };

  return (
    <>
      {isEditable ? (
        <div className={styles['header-container']}>
          <div className={styles['user-name-wrapper']}>
            <span className={styles['user-name']}>{profile.name}</span>
          </div>
          <div></div>
          {/* 임시 사용 */}
          <EditorBtn />
        </div>
      ) : (
        <section className={`${styles['wiki-actions']} ${className}`}>
          <section className={styles['name-and-btn']}>
            <span className={styles['user-name']}>{profile.name}</span>
            {hasSections && (
              <Button
                className={styles['participate-btn']}
                color="primary"
                size="large"
                onClick={onParticipateClick}
              >
                위키 참여하기
              </Button>
            )}
          </section>
          <section className={styles['link']}>
            <section className={styles['link-wrapper']}>
              <img src={link.src} width={20} height={20} alt="링크 아이콘" />
              <button
                onClick={handleCopyClick}
                className={styles['link-copy-btn']}
              >
                <section className={styles['link-address']}>
                  https://www.wikied.kr/{profile.code}
                </section>
              </button>
            </section>
          </section>
        </section>
      )}
      {showSnackBar && (
        <>
          <div className={styles['snackbar-container-large']}>
            <SnackBar message={snackBarMessage} type="success" size="large" />
          </div>
          <div className={styles['snackbar-container-small']}>
            <SnackBar message={snackBarMessage} type="success" size="small" />
          </div>
        </>
      )}
    </>
  );
};

export default WikiHeader;
