import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  checkProfileEditStatus,
  getProfileByCode,
  updateProfiles,
  updateProfileEditStatus,
} from '@/services/api/profile';
import { ProfileDetail, Section } from '@/types/wiki';
import WikiHeader from '@/pages/wiki/[code]/components/wikiHeader';
import WikiArticle from '@/pages/wiki/[code]/components/wikiArticle';
import WikiAside from '@/pages/wiki/[code]/components/wikiAside';
import Quiz from '@/components/modal/components/quiz';
import styles from '@/pages/wiki/[code]/styles.module.scss';
import Modal from '@/components/modal';
import Alert from '@/components/modal/components/alert';

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
  const [showParticipateBtn, setShowParticipateBtn] = useState<boolean>('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [editTimeout, setEditTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const closeModal = (type: 'error' | 'quiz') => {
    if (type === 'error') {
      setIsErrorModalOpen(false);
    } else if (type === 'quiz') {
      setModalVisible(false);
    }
  };

  // 모달 토글
  const handleModalToggle = () => {
    setModalVisible(!isModalVisible);
  };

  // 데이터 조회
  const getList = useCallback(async (code: string) => {
    try {
      const response = await getProfileByCode(code);
      const data = response.data;
      setProfile(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // 현재 수정중 여부 확인
  const checkEditStatus = useCallback(async (code: string) => {
    try {
      const response = await checkProfileEditStatus(code);
      // if (response.status === 200) {
      //   setShowParticipateBtn(true);
      // } else {
      //   setShowParticipateBtn(false);
      // }
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
      setIsEditable(false);
    }, 60000); // 5분 = 300,000ms

    setEditTimeout(timer);
  };

  // 수정 완료 처리
  const handleEditComplete = async (updatedProfile: ProfileDetail) => {
    if (editTimeout) {
      clearTimeout(editTimeout);
    }

    try {
      if (updatedProfile) {
        await updateProfiles(profile.code, {
          securityAnswer: updatedProfile.securityAnswer,
          securityQuestion: updatedProfile.securityQuestion,
          nationality: updatedProfile.nationality,
          family: updatedProfile.family,
          bloodType: updatedProfile.bloodType,
          nickname: updatedProfile.nickname,
          birthday: updatedProfile.birthday,
          sns: updatedProfile.sns,
          job: updatedProfile.job,
          mbti: updatedProfile.mbti,
          city: updatedProfile.city,
          image: updatedProfile.image,
          content: updatedProfile.content,
        });
        await updateProfileEditStatus(profile.code, profile.securityAnswer); // 프로필 수정 상태 업데이트

        setIsEditable(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof code === 'string') {
        await getList(code);
        const response = await checkProfileEditStatus(code);
        console.log('checkProfileEditStatus API Response:', response);
        if (response.status === 200) {
          setShowParticipateBtn(true);
          console.log('showParticipateBtn', showParticipateBtn);
        } else {
          setShowParticipateBtn(false);
        }
      }
    };
    fetchData();
  }, [code, showParticipateBtn]);

  useEffect(() => {
    if (isEditable) {
      startEditTimer();
    } else if (editTimeout) {
      clearTimeout(editTimeout);
    }
  }, [isEditable]);

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
            onParticipateClick={handleModalToggle}
            checkEditStatus={checkEditStatus}
            isEditable={isEditable}
          />
          <div className={styles['space2']}></div>
          <WikiAside
            className={styles['wiki-aside']}
            profile={profile}
            setProfile={setProfile}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
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
          onClose={() => closeModal('quiz')}
        />
      )}

      {isErrorModalOpen && (
        <Modal
          size="large"
          contents={({ size }) => (
            <Alert
              title="5분 이상 글을 쓰지 않아 접속이 끊어졌어요."
              description="위키 참여하기를 통해 다시 위키를 수정해 주세요."
              content="확인"
              size={size}
            />
          )}
          onClose={() => closeModal('error')}
        />
      )}
    </>
  );
};

export default Wiki;
