import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  checkProfileEditStatus,
  getProfileByCode,
  updateProfile,
} from '@/services/api/profile';
import { ProfileDetail, Section } from '@/types/wiki';
import WikiHeader from '@/pages/wiki/[code]/components/wikiHeader';
import WikiArticle from '@/pages/wiki/[code]/components/wikiArticle';
import WikiAside from '@/pages/wiki/[code]/components/wikiAside';
import Quiz from '@/components/modal/components/quiz';
import styles from '@/pages/wiki/[code]/styles.module.scss';
import Button from '@/components/button';
import Modal from '@/components/modal';

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
  const [showParticipateBtn, setShowParticipateBtn] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false); // 오류 모달 상태
  const [editTimeout, setEditTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);

  // 모달 토글
  const handleModalToggle = () => {
    setModalVisible(!isModalVisible);
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

  // 수정 타이머 시작
  const startEditTimer = () => {
    if (editTimeout) {
      clearTimeout(editTimeout);
    }

    const timer = setTimeout(() => {
      setIsErrorModalOpen(true); // 5분 후 오류 모달 띄우기
    }, 300000); // 5분 = 300,000ms

    setEditTimeout(timer);
  };

  // 수정 완료 처리
  const handleEditComplete = async () => {
    if (editTimeout) {
      clearTimeout(editTimeout);
    }

    try {
      if (profile) {
        await updateProfile(profile.code, {
          securityAnswer: props.securityAnswer,
          securityQuestion: profile.securityQuestion,
          nationality: profile.nationality,
          family: profile.family,
          bloodType: profile.bloodType,
          nickname: profile.nickname,
          birthday: profile.birthday,
          sns: profile.sns,
          job: profile.job,
          mbti: profile.mbti,
          city: profile.city,
          image: profile.image,
          content: profile.content,
        });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

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
            isEditable={isEditable}
          />
          <div className={styles['space2']}></div>
          <WikiAside
            className={styles['wiki-aside']}
            profile={profile}
            isEditable={isEditable}
            onEditComplete={handleEditComplete}
          />
        </main>
      </div>

      {!isEditable && isModalVisible && (
        <Modal
          size="large"
          contents={({ size }) => (
            <Quiz
              code={typeof code === 'string' ? code : ''}
              setIsEditable={setIsEditable}
              setIsModalOpen={setModalVisible}
              securityQuestion={profile.securityQuestion}
              size={size}
            />
          )}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Wiki;
