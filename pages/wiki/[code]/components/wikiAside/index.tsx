import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { ProfileDetail } from '@/types/wiki';
import UserAttribute from '@/pages/wiki/[code]/components/wikiAside/components/userAttribute';
import Button from '@/components/button';
import styles from '@/pages/wiki/[code]/components/wikiAside/styles.module.scss';
import expandIcon from '@/assets/icons/ic_expand.svg';
import fileUploadIcon from '@/assets/icons/ic_camera.svg';
import basicProfileImg from '@/assets/icons/ic_profile.svg';
import Link from 'next/link';

interface WikiAsideProps {
  className: string;
  profile: ProfileDetail;
  isEditable: boolean;
  onEditComplete?: () => void;
}

const WikiAside = ({
  className,
  profile,
  isEditable,
  onEditComplete,
}: WikiAsideProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileDetail>(profile);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nextPreview = URL.createObjectURL(file);
      setPreview(nextPreview);

      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (name: string, value: string) => {
    console.log(`Updating ${name} to ${value}`); // 로그 추가
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', editedProfile); // Save 전에 프로필 데이터 로그 출력
    if (onEditComplete) {
      onEditComplete();
    }
  };

  const attributes = [
    { name: '거주 도시', value: editedProfile.city, key: 'city' },
    { name: 'MBTI', value: editedProfile.mbti, key: 'mbti' },
    { name: '직업', value: editedProfile.job, key: 'job' },
    { name: 'SNS 계정', value: editedProfile.sns, key: 'sns' },
    { name: '생일', value: editedProfile.birthday, key: 'birthday' },
    { name: '별명', value: editedProfile.nickname, key: 'nickname' },
    { name: '혈액형', value: editedProfile.bloodType, key: 'bloodType' },
    { name: '국적', value: editedProfile.nationality, key: 'nationality' },
  ];

  return (
    <>
      <div
        className={clsx(styles['user-profile'], className, {
          [styles['editable']]: isEditable,
          [styles['non-editable']]: !isEditable,
        })}
      >
        {/* 프로필 이미지 부분 */}
        <div className={styles['image-container']}>
          {isEditable ? (
            <div
              className={styles['file-input-wrapper']}
              onClick={handleDivClick}
            >
              <input
                type="file"
                className={styles['file-input']}
                onChange={handleFileChange}
                ref={inputRef}
                accept="image/*"
              />
              {!preview ? (
                <>
                  <img
                    src={fileUploadIcon.src}
                    className={styles['file-upload-icon']}
                    alt="파일 업로드 아이콘"
                  />
                  {profile.image && (
                    <>
                      <div className={styles['overlay']}></div>
                      <img
                        src={profile.image}
                        className={styles['image']}
                        alt="프로필 이미지"
                      />
                    </>
                  )}
                </>
              ) : (
                <img
                  src={preview}
                  className={styles['preview-image']}
                  alt="첨부파일 미리보기"
                />
              )}
            </div>
          ) : profile.image ? (
            <img
              src={profile.image}
              className={styles['image']}
              alt="프로필 이미지"
            />
          ) : (
            <img
              src={basicProfileImg.src}
              className={styles['image']}
              alt="기본 프로필 이미지"
            />
          )}
        </div>

        {/* 프로필 내용 관련 부분 */}
        <div className={styles['user-attribute-container']}>
          {isEditable ? (
            // 수정중: 모든 속성이 보임
            <>
              <div className={styles['attribute-wrapper']}>
                {attributes.map((attr, index) => (
                  <UserAttribute
                    key={index}
                    attributeName={attr.name}
                    value={attr.value}
                    isEditable={isEditable}
                    onChange={handleInputChange}
                  />
                ))}
              </div>
            </>
          ) : (
            // 수정중X
            <div className={styles['non-editable-attribute-container']}>
              {/* 화면 너비에 상관 없이 모두 보이는 속성 3개 */}
              <div className={styles['always-show-user-attribute']}>
                {attributes.slice(0, 3).map((attr, index) => (
                  <UserAttribute
                    key={index}
                    attributeName={attr.name}
                    value={attr.value}
                    isEditable={isEditable}
                  />
                ))}
              </div>
              {/* 그 외 속성: 데스크탑에서 보여질 부분 */}
              <div className={styles['desktop-user-attribute']}>
                {attributes.slice(3, 8).map((attr, index) => (
                  <UserAttribute
                    key={index}
                    attributeName={attr.name}
                    value={attr.value}
                    isEditable={isEditable}
                  />
                ))}
              </div>
              {/* 그 외 속성: 태블릿, 모바일에서 보여질 부분 */}
              {isExpanded && (
                <div className={styles['tablet-mobile-expanded']}>
                  {attributes.slice(3, 8).map((attr, index) => (
                    <UserAttribute
                      key={index}
                      attributeName={attr.name}
                      value={attr.value}
                      isEditable={isEditable}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {/* 토글 버튼 */}
        {!isEditable && (
          <button className={styles['expand-btn']} onClick={handleToggle}>
            <img
              className={styles['expand-icon']}
              src={expandIcon.src}
              alt="더보기 아이콘"
            />
          </button>
        )}
      </div>
      {/* 취소/저장 버튼 */}
      {isEditable && (
        <div className={styles['profile-save-btn']}>
          <Link href={`/wiki/${profile.code}`}>
            <Button
              className={styles['cancel-btn']}
              color="outline"
              size="small"
            >
              취소
            </Button>
          </Link>
          <Button
            className={styles['save-btn']}
            color="primary"
            size="small"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      )}
    </>
  );
};

export default WikiAside;
