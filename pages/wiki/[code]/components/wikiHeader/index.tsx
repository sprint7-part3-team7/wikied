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
  const [showSnackBar, setShowSnackBar] = useState(false);

  // 링크 복사 함수
  const handleCopyClick = () => {
    const linkToCopy = `https://www.wikied.kr/${profile.code}`;
    navigator.clipboard
      .writeText(linkToCopy)
      .then(() => {
        setSnackBarMessage('내 위키 링크가 복사되었습니다.');
        setSnackBarType('success');
        setShowSnackBar(true);
        setTimeout(() => setShowSnackBar(false), 3000);
      })
      .catch(() => {
        setSnackBarMessage('복사에 실패했습니다.');
        setSnackBarType('error');
        setShowSnackBar(true);
        setTimeout(() => setShowSnackBar(false), 3000);
      });
  };

  // 다른 사람이 편집 중일 때 에러메시지 표시
  const handleError = () => {
    setSnackBarMessage(
      '다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.',
    );
    setSnackBarType('error');
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 3000);
  };

  const checkParticipationStatus = useCallback(async () => {
    try {
      // 위키 참여 클릭 후 상태 확인
      await checkEditStatus(profile.code);
    } catch (error) {
      console.error('Error during checkEditStatus:', error);
    }
  }, [checkEditStatus, profile.code]);

  useEffect(() => {
    if (!showParticipateBtn) {
      handleError(); // 참여 불가능할 때 스낵바 표시
    } else {
      console.log();
    }
  }, [showParticipateBtn]);

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
            {profile.content &&
              (showParticipateBtn ? (
                <Button
                  className={styles['participate-btn']}
                  color="primary"
                  size="large"
                  onClick={() => {
                    checkParticipationStatus(); // 현재 수정중 여부 확인
                    onParticipateClick(); // 퀴즈 모달 호출
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
                  {showSnackBar && (
                    <div className={styles['snackbar-container-large']}>
                      <SnackBar
                        message={snackBarMessage}
                        type={snackBarType}
                        size="large"
                      />
                    </div>
                  )}
                </>
              ))}
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
      {showSnackBar && snackBarType === 'success' && (
        <div className={styles['snackbar-container-small']}>
          <SnackBar message={snackBarMessage} type="success" size="small" />
        </div>
      )}
    </>
  );
};

export default WikiHeader;
