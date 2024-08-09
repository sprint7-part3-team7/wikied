import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  getProfileByCode,
  checkProfileEditStatus,
  updateProfileEditStatus,
} from '@/services/api/profile';
import { ProfileDetail, ProfileEditStatus, Section } from '@/types/wiki';
import WikiHeader from '@/pages/wiki/[code]/components/wikiHeader';
import WikiArticle from '@/pages/wiki/[code]/components/wikiArticle';
import WikiAside from '@/pages/wiki/[code]/components/wikiAside';
// import AccessControl from '@/pages/wiki/[code]/components/accessControl';
import QuizModal from '@/components/modal/quiz';
import styles from '@/pages/wiki/[code]/styles.module.scss';
import Alert from '@/components/modal/alert';

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

  // 모달 토글 함수
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getList = useCallback(async (code: string) => {
    try {
      const response = await getProfileByCode(code);
      const data = response.data;

      const userId = localStorage.getItem('userId');
      const userProfileCode = localStorage.getItem('userProfileCode');

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
      console.log('profile: ' + profile);

      // Mock 데이터 사용 (추후 삭제)
      setSectionsData([
        {
          title: '01. 개요',
          content:
            '코드잇의 콘텐츠 프로듀서이자, 프론트엔드 엔지니어. 포도마켓의 프론트엔드 엔지니어 출신이다.',
        },
        {
          title: '02. 취미',
          content:
            '식물을 키우는 것을 좋아한다. 바질이나 로즈마리 같은 허브류부터, 파, 당근 같은 채소류까지 다양하게 키우는 것으로 알려져 있다.',
        },
        {
          title: '03. 여담',
          content:
            '걸어다니는 사전이라고 불릴 정도로 다양한 분야의 지식을 두루 소유하고 있다.',
        },
        {
          title: '04. 취향',
          content:
            '가위바위보를 좋아한다. 후식을 먹는다거나, 점심에 추가 금액을 내야 한다거나, 편의점에서 뭘 사 와야 하는 경우, 거의 항상 가위바위보를 제안한다. 제안을 많이 하다 보니 자신이 걸리는 경우도 꽤 많은데, 크게 개의치 않아 하는 것 같다. 영국에서 살았던 영향인지, 근본을 중시하는 것으로 보인다. 예를 들어 피자는 근본 토핑으로만 이루어진 피자(치즈 피자, 페퍼로니 피자)를 가장 선호한다. 근본에 어울리지 않는 토핑(불고기, 파인애플, 새우 등)이 추가된 피자는 선호하지 않는다.',
        },
      ]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    // 하드코딩된 값 저장 (추후 삭제)
    localStorage.setItem('email', 'dongil@gmail.com');
    localStorage.setItem('password', '12341234');
    localStorage.setItem('userId', '801');
    localStorage.setItem(
      'userProfileCode',
      'c9dbd714-cd72-4427-b982-ba44dc15ec91',
    );
    localStorage.setItem(
      'accessToken',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODAxLCJ0ZWFtSWQiOiI3LTciLCJzY29wZSI6ImFjY2VzcyIsImlhdCI6MTcyMzE4NjIwMiwiZXhwIjoxNzIzMTg4MDAyLCJpc3MiOiJzcC13aWtpZWQifQ.CMNFPWGau9FKvRspEQAsD4V-hwqENjjqO3cutvpHR2E',
    );

    if (typeof code === 'string') {
      getList(code);
    }
  }, [code, getList]);

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
            sections={sectionsData}
            isEditable={isEditable}
            onParticipateClick={handleModalToggle}
          />
          <div className={styles['space1']}></div>
          <WikiArticle
            className={styles['wiki-article']}
            sections={sectionsData}
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
