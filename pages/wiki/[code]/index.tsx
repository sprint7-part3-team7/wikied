import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  checkProfileEditStatus,
  getProfileByCode,
  updateProfile,
} from '@/services/api/profile';
import { ProfileDetail, Section } from '@/types/wiki';
import WikiHeader from '@/components/wiki/wikiHeader';
import WikiArticle from '@/components/wiki/wikiArticle';
import WikiAside from '@/components/wiki/wikiAside';
import Quiz from '@/components/common/modal/components/quiz';
import styles from '@/pages/wiki/[code]/styles.module.scss';
import Modal from '@/components/common/modal';
import Alert from '@/components/common/modal/components/alert';

interface WikiProps {
  className: string;
  profile: ProfileDetail;
  securityAnswer: string;
}

const Wiki = (props: WikiProps) => {
  const [profile, setProfile] = useState<any>(null);
  const [sectionsData, setSectionsData] = useState<Section[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [showParticipateBtn, setShowParticipateBtn] = useState<boolean>(true);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [editTimeout, setEditTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [responseState, setResponseState] = useState<boolean>(true);

  const [editorContent, setEditorContent] = useState('');
  const [editedProfile, setEditedProfile] = useState<ProfileDetail>(profile);
  const [editorHtmlContent, setEditorHtmlContent] = useState('');

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
    } catch (err) {
      console.log(err);
    }
  }, []);

  // 현재 수정중 여부 확인
  const checkEditStatus = useCallback(async (code: string) => {
    try {
      const response = await checkProfileEditStatus(code);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    const fetchData = async () => {
      if (typeof code === 'string') {
        await getList(code);
        const response = await checkProfileEditStatus(code);
        if (response.status === 204) {
          setResponseState(true);
          setShowParticipateBtn(true);
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

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleEditorChange = (content: string, htmlContent: string) => {
    setEditorContent(content);
    setEditorHtmlContent(htmlContent);
  };

  const handleProfileChange = (updatedProfile: ProfileDetail) => {
    console.log('Profile updated:', updatedProfile);
    setEditedProfile(updatedProfile);
  };

  // 수정 완료 처리
  const handleSave = async () => {
    if (editTimeout) {
      clearTimeout(editTimeout);
    }

    try {
      console.log('Saving profile:', editedProfile);
      console.log('Saving content:', editorContent);

      const updatedData = {
        securityAnswer: profile.securityAnswer,
        securityQuestion:
          editedProfile?.securityQuestion || profile.securityQuestion,
        nationality: editedProfile?.nationality || profile.nationality,
        family: editedProfile?.family || profile.family,
        bloodType: editedProfile?.bloodType || profile.bloodType,
        nickname: editedProfile?.nickname || profile.nickname,
        birthday: editedProfile?.birthday || profile.birthday,
        sns: editedProfile?.sns || profile.sns,
        job: editedProfile?.job || profile.job,
        mbti: editedProfile?.mbti || profile.mbti,
        city: editedProfile?.city || profile.city,
        image: editedProfile?.image || profile.image,
        content: editorContent || profile.content,
      };

      console.log('Data to be sent:', updatedData);

      const response = await updateProfile(profile.code, updatedData);
      console.log('Update response:', response);

      if (response.data) {
        setProfile(response.data);
        setIsEditable(false);
        alert('프로필이 성공적으로 저장되었습니다.');
        window.location.reload();
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      alert('프로필 저장에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  const handleCancel = () => {
    setIsEditable(false);
    setEditedProfile(profile);
  };

  return (
    <>
      <div
        className={clsx(styles['container'], {
          [styles['non-editable']]: !isEditable,
          [styles['non-editable-no-data']]:
            !isEditable && profile.content.length === 0,
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
            onEditorChange={handleEditorChange}
          />
          <div className={styles['space2']}></div>
          <WikiAside
            className={styles['wiki-aside']}
            profile={profile}
            setProfile={setProfile}
            isEditable={isEditable}
            setIsEditable={setIsEditable}
            onProfileChange={handleProfileChange}
            onSave={handleSave}
            onCancel={handleCancel}
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
              onClose={() => closeModal('error')}
            />
          )}
          onClose={() => closeModal('error')}
        />
      )}
    </>
  );
};

export default Wiki;
