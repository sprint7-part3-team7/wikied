import { useCallback, useEffect, useState } from 'react';
import { ProfileDetail } from '@/types/wiki';
import EditorBtn from '@/pages/wiki/[code]/components/wikiHeader/components/editorBtn';
import Button from '@/components/button';
import SnackBar from '@/components/snackbar';
import styles from '@/pages/wiki/[code]/components/wikiHeader/styles.module.scss';
import link from '@/assets/icons/ic_link.svg';
import loadingIcon from '@/assets/icons/ic_loading.svg';

interface WikiHeaderProps {
  className?: string;
  profile: ProfileDetail;
  isEditable: boolean;
  onParticipateClick: () => void;
  checkEditStatus: (code: string) => Promise<any>;
  showParticipateBtn: boolean;
  code: string;
}

const WikiHeader = ({
  className,
  profile,
  isEditable,
  onParticipateClick,
  checkEditStatus,
  showParticipateBtn,
  code,
}: WikiHeaderProps) => {
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarType, setSnackBarType] = useState<'success' | 'error'>(
    'success',
  );
  const [showSnackBar, setShowSnackBar] = useState<boolean>(false);
  const [showLinkCopyModal, setShowLinkCopyModal] = useState<boolean>(false);

  const handleCopyClick = () => {
    const linkToCopy = `https://www.wikied.kr/${profile.code}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setSnackBarMessage('내 위키 링크가 복사되었습니다.');
        setSnackBarType('success');
        setShowSnackBar(true);
        setShowLinkCopyModal(true);
      })
      .catch(() => {
        setSnackBarMessage('복사에 실패했습니다.');
        setSnackBarType('error');
        setShowSnackBar(true);
        setShowLinkCopyModal(true);
      });
  };

  const handleError = () => {
    setSnackBarMessage(
      '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.',
    );
    setSnackBarType('error');
    setShowSnackBar(true);
  };

  useEffect(() => {
    if (showSnackBar) {
      const timer = setTimeout(() => {
        setShowSnackBar(false);
        setShowLinkCopyModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSnackBar]);

  const checkParticipationStatus = useCallback(async () => {
    try {
      await checkEditStatus(profile.code);
    } catch (error) {
      console.error('Error during checkEditStatus:', error);
      handleError(); // Handle errors here if needed
    }
  }, [checkEditStatus, profile.code]);

  useEffect(() => {
    if (!showParticipateBtn) {
      handleError();
    }
  }, [showParticipateBtn]);

  return (
    <>
      {isEditable ? (
        <div className={styles['header-container3']}>
          {/* <div className={styles['user-name-wrapper']}>
            <span className={styles['user-name']}>{profile.name}</span>
          </div>
          <div></div>
          <EditorBtn /> */}
        </div>
      ) : (
        <section className={`${styles['wiki-actions']} ${className}`}>
          <section className={styles['name-and-btn']}>
            <span className={styles['user-name']}>{profile.name}</span>
            {profile.content &&
              (showParticipateBtn ? (
                <Button
                  className={styles['participate-btn']}
                  color="primary"
                  size="large"
                  onClick={() => {
                    checkParticipationStatus();
                    onParticipateClick();
                  }}
                >
                  위키 참여하기
                </Button>
              ) : (
                <>
                  <Button
                    className={styles['Editing-btn']}
                    color="disabled"
                    size="large"
                    onClick={onParticipateClick}
                    trailingIcon={
                      <img src={loadingIcon.src} alt="로딩중 아이콘" />
                    }
                  >
                    편집중
                  </Button>
                </>
              ))}
          </section>
          <section className={styles['link']}>
            <section className={styles['link-wrapper']}>
              <img src={link.src} width={20} height={20} alt="링크 아이콘" />
              {showSnackBar && !showParticipateBtn && (
                <div className={styles['snackbar-container-large']}>
                  <SnackBar
                    message={snackBarMessage}
                    type={snackBarType}
                    size="large"
                  />
                </div>
              )}
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
        <div className={styles['snackbar-container-small']}>
          <SnackBar
            message={snackBarMessage}
            type={snackBarType}
            size="small"
          />
        </div>
      )}
    </>
  );
};

export default WikiHeader;
