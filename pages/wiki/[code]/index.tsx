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
  const [profile, setProfile] = useState<any>(null);
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [showParticipateBtn, setShowParticipateBtn] = useState<boolean>();
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [editTimeout, setEditTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [securityAnswer, setSecurityAnswer] = useState<string>('');
  const [responseState, setResponseState] = useState<boolean>(true);

  const router = useRouter();
  const { code } = router.query;

  // 모달 토글
  const handleModalToggle = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = (type: 'error' | 'quiz') => {
    if (type === 'error') {
      setIsErrorModalOpen(false);
    } else if (type === 'quiz') {
      setModalVisible(false);
    }
  };

  // 데이터 조회
  const getList = useCallback(async (code: string) => {
    try {
      const response = await getProfileByCode(code);
      const data = response.data;
      setProfile(data);
      setSectionsData(profile.content || []);
      console.log('sectionsData', sectionsData);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // 현재 수정중 여부 확인
  const checkEditStatus = useCallback(async (code: string) => {
    try {
      const response = await checkProfileEditStatus(code);
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
    }, 300000); // 5분 = 300,000ms

    setEditTimeout(timer);
  };

  // Quiz 컴포넌트에서 securityAnswer 받아오기
  const handleAnswerSubmit = (answer: string) => {
    setSecurityAnswer(answer);
  };

  // 수정 완료 처리
  const handleEditComplete = async (updatedProfile: ProfileDetail) => {
    if (editTimeout) {
      clearTimeout(editTimeout);
    }

    try {
      if (updatedProfile) {
        // FormData 객체 생성
        const formData = new FormData();

        // 프로필 데이터를 FormData에 추가
        formData.append('securityAnswer', securityAnswer); // securityAnswer 추가
        formData.append(
          'securityQuestion',
          updatedProfile.securityQuestion || '',
        );
        formData.append('nationality', updatedProfile.nationality || '');
        formData.append('family', updatedProfile.family || '');
        formData.append('bloodType', updatedProfile.bloodType || '');
        formData.append('nickname', updatedProfile.nickname || '');
        formData.append('birthday', updatedProfile.birthday || '');
        formData.append('sns', updatedProfile.sns || '');
        formData.append('job', updatedProfile.job || '');
        formData.append('mbti', updatedProfile.mbti || '');
        formData.append('city', updatedProfile.city || '');
        if (updatedProfile.image) {
          formData.append('image', updatedProfile.image);
        }
        if (updatedProfile.content) {
          formData.append('content', JSON.stringify(updatedProfile.content));
        }

        // FormData로 API 호출
        await updateProfiles(profile.code, formData);

        console.log('wiki updateProfiles', updatedProfile);

        setProfile(updatedProfile);

        // 수정 후 answer를 사용해 post api 호출
        const response = await updateProfileEditStatus(profile.code, {
          securityAnswer: securityAnswer,
        });

        console.log('API Response:', response.data);

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
          setResponseState(true);
          setShowParticipateBtn(true);
          console.log('showParticipateBtn', showParticipateBtn);
        } else {
          setResponseState(false);
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

  useEffect(() => {
    if (profile) {
      console.log('Profile updated:', profile);
    }
  }, [profile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={clsx(styles['container'], {
          [styles['non-editable']]: !isEditable,
          [styles['non-editable-no-data']]:
            !isEditable && sectionsData.length === 0,
          [styles['editable']]: isEditable,
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
            showParticipateBtn={showParticipateBtn ?? false}
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
            setProfile={setProfile}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            onEditComplete={handleEditComplete}
          />
        </main>
      </div>

      {!isEditable && isModalVisible && responseState && (
        <Modal
          size="large"
          contents={({ size }) => (
            <Quiz
              code={typeof code === 'string' ? code : ''}
              setIsEditable={setIsEditable}
              setIsModalOpen={setModalVisible}
              securityQuestion={profile.securityQuestion}
              size={size}
              onAnswerSubmit={handleAnswerSubmit}
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
