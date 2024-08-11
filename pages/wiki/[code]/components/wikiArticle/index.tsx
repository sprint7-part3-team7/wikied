import { useCallback } from 'react';
import { ProfileDetail } from '@/types/wiki';
import Button from '@/components/button';
import styles from '@/pages/wiki/[code]/components/wikiArticle/styles.module.scss';
import Editor from '@/components/editor';
import WikiEditor from '@/components/wikiEditor';

interface WikiArticleProps {
  className: string;
  profile: ProfileDetail;
  onParticipateClick: () => void;
  checkEditStatus: (code: string) => Promise<any>;
  isEditable: boolean;
}

const WikiArticle = ({
  className,
  profile,
  onParticipateClick,
  checkEditStatus,
  isEditable,
}: WikiArticleProps) => {
  const checkParticipationStatus = useCallback(async () => {
    try {
      // 위키 참여 클릭 후 상태 확인
      await checkEditStatus(profile.code);
    } catch (error) {
      console.error('Error during checkEditStatus:', error);
    }
  }, [checkEditStatus, profile.code]);

  return (
    <div className={`${styles['grid-container']} ${className}`}>
      {profile.content && !isEditable ? (
        <div className={styles['grid-item']}>
          <span className={styles['wiki-article-content']}>
            {profile.content}
          </span>
        </div>
      ) : isEditable ? (
        <div className={styles['grid-item']}>
          <span className={styles['wiki-article-content']}>
            {/* 여기에 에디터 컴포넌트 추가 */}
            <WikiEditor />
          </span>
        </div>
      ) : (
        <div className={styles['empty-wiki-container']}>
          <div className={styles['span-btn-wrapper']}>
            <span className={styles['notice']}>
              아직 작성된 내용이 없네요.
              <p />
              위키에 참여해 보세요!
            </span>
            <Button
              className={styles['start-btn']}
              color="primary"
              size="small"
              defaultPadding={true}
              onClick={() => {
                checkParticipationStatus(); // 현재 수정중 여부 재확인
                onParticipateClick(); // 퀴즈 모달 호출
              }}
            >
              시작하기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WikiArticle;
