import { ProfileDetail, Section } from '@/types/wiki';
import Blockquote from '@/pages/wiki/[code]/components/wikiArticle/components/blockquote';
import Button from '@/components/button';
import styles from '@/pages/wiki/[code]/components/wikiArticle/styles.module.scss';
import { useCallback } from 'react';

interface WikiArticleProps {
  className: string;
  sections: Section[];
  profile: ProfileDetail;
  onParticipateClick: () => void;
  checkEditStatus: (code: string) => Promise<any>;
}

const WikiArticle = ({
  className,
  sections,
  profile,
  onParticipateClick,
  checkEditStatus,
}: WikiArticleProps) => {
  const hasSections = sections.length > 0;

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
      {hasSections ? (
        sections.map((section, index) => (
          <div key={index} className={styles['grid-item']}>
            <span className={styles['wiki-article-title']}>
              {section.title}
            </span>
            <div className={styles['separator']} />
            <span className={styles['wiki-article-content']}>
              {section.content}
            </span>
            {index === 1 && (
              <Blockquote>
                여기는 Block Quote를 나타내는 영역이에요.
                <p />
                이런 식으로 텍스트가 늘어나면 영역도 같이 늘어나게 됩니다.
                <p />
                여기는 Block Quote를 나타내는 영역이에요.
                <p />
                이런 식으로 텍스트가 늘어나면 영역도 같이 늘어나게 됩니다.
                <p />
              </Blockquote>
            )}
          </div>
        ))
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
