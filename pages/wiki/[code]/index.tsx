import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  checkProfileEditStatus,
  getProfileByCode,
} from '@/services/api/profile';
import { ProfileDetail, Section } from '@/types/wiki';
import WikiHeader from '@/pages/wiki/[code]/components/wikiHeader';
import WikiArticle from '@/pages/wiki/[code]/components/wikiArticle';
import WikiAside from '@/pages/wiki/[code]/components/wikiAside';
import QuizModal from '@/components/modal/components/quiz';
import styles from '@/pages/wiki/[code]/styles.module.scss';

interface WikiProps {
  className: string;
  profile: ProfileDetail;
  securityAnswer: string;
}

const Wiki = (props: WikiProps) => {
  const router = useRouter();
  const { code } = router.query;

  const [profile, setProfile] = useState<any>(null);
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showParticipateBtn, setShowParticipateBtn] = useState<boolean>(false);

  // 모달 토글
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 데이터 조회
  const getList = useCallback(async (code: string) => {
    try {
      const response = await getProfileByCode(code);
      const data = response.data;

      const userId = localStorage.getItem('userId');
      const userProfileCode = localStorage.getItem('userProfileCode');

      // 참여 가능 여부 확인
      if (
        userId !== null &&
        data.id === Number(userId) &&
        data.code === userProfileCode
      ) {
        setIsEditable(true);
      } else {
        setIsEditable(false);
      }

      setProfile(data);

      // 섹션 데이터가 존재하는 경우 설정
      setSectionsData(profile.content || []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // 현재 수정중 여부 확인
  const checkEditStatus = useCallback(async (code: string) => {
    try {
      const response = await checkProfileEditStatus(code);
      const data = response.data; // registeredAt, userId
      console.log('data' + data);

      if (response.status === 200) {
        setShowParticipateBtn(true);
      } else {
        setShowParticipateBtn(false);
        console.log('response.status: ', response.status);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    if (typeof code === 'string') {
      getList(code);
      checkEditStatus(code);
    }
  }, [code, getList, checkEditStatus]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isEditable && isModalOpen && (
        <div
          className={clsx(styles['quiz-modal-container'], {
            [styles['quiz-modal-open']]: isModalOpen,
            [styles['quiz-modal-close']]: !isModalOpen,
          })}
        >
          <QuizModal
            size="large"
            code={typeof code === 'string' ? code : ''}
            setIsEditable={setIsEditable}
            setIsModalOpen={setIsModalOpen}
            securityQuestion={profile.securityQuestion}
          />
        </div>
      )}
      <div
        className={clsx(styles['container'], {
          [styles['non-editable']]: !isEditable,
          [styles['editable']]: isEditable,
          [styles['no-data']]: sectionsData.length === 0,
        })}
      >
        <main className={styles['wiki-main']}>
          <div className={styles['wiki-padding']}></div>
          <WikiHeader
            className={styles['wiki-header']}
            profile={profile}
            isEditable={isEditable}
            onParticipateClick={handleModalToggle}
            checkEditStatus={checkEditStatus}
            showParticipateBtn={showParticipateBtn}
            code={typeof code === 'string' ? code : ''}
          />
          <div className={styles['space1']}></div>
          <WikiArticle
            className={styles['wiki-article']}
            profile={profile}
            sections={sectionsData}
            onParticipateClick={handleModalToggle}
            checkEditStatus={checkEditStatus}
          />
          <div className={styles['space2']}></div>
          <WikiAside
            className={styles['wiki-aside']}
            profile={profile}
            isEditable={isEditable}
          />
        </main>
      </div>
    </>
  );
};

export default Wiki;
