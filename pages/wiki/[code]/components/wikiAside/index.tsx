import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { ProfileDetail } from '@/types/wiki';
import UserAttribute from '@/pages/wiki/[code]/components/wikiAside/components/userAttribute';
import { updateProfiles, imageFileToUrl } from '@/services/api/profile';
import Button from '@/components/button';
import styles from '@/pages/wiki/[code]/components/wikiAside/styles.module.scss';
import expandIcon from '@/assets/icons/ic_expand.svg';
import fileUploadIcon from '@/assets/icons/ic_camera.svg';
import basicProfileImg from '@/assets/icons/ic_profile.svg';
import { getUsers } from '@/services/api/user';

interface WikiAsideProps {
  className: string;
  profile: ProfileDetail;
  setProfile: React.Dispatch<React.SetStateAction<ProfileDetail>>;
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
  onEditComplete?: (updatedProfile: ProfileDetail) => void;
}

const WikiAside = ({
  className,
  profile,
  setProfile,
  isEditable,
  setIsEditable,
  onEditComplete,
}: WikiAsideProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileDetail>(profile);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // 현재 사용자 ID 상태 추가
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getUsers();
        console.log('API Response:', response);

        const { data } = response; // 응답에서 데이터 추출
        const userId = String(data.profile.id); // 현재 사용자 ID 추출
        const profileIdStr = String(profile.id); // 프로필 ID 문자열로 변환

        console.log('profile.id:', profileIdStr);
        console.log('userId:', userId);

        // 현재 사용자인지 여부를 설정
        setIsCurrentUser(profileIdStr === userId);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchCurrentUser();
  }, [profile.id]);

  const handleCancelClick = () => {
    setIsEditable(false);
    setEditedProfile(profile); // 취소 시 원래 프로필로 복원
  };

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nextPreview = URL.createObjectURL(file);
      setPreview(nextPreview);

      // 파일명 영어로 변환
      const newFileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const newFile = new File([file], newFileName, { type: file.type });
      setImageFile(newFile); // 파일 상태 업데이트

      // 파일 URL을 해제 (클린업)
      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (name: string, value: string) => {
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (imageFile) {
        const response = await imageFileToUrl(imageFile);
        const imageUrl = response.data.url;

        const updatedProfile = {
          ...editedProfile,
          image: imageUrl,
        };

        // FormData 객체 생성
        const formData = new FormData();

        // updatedProfile의 각 필드를 FormData에 추가
        Object.keys(updatedProfile).forEach((key) => {
          const value = updatedProfile[key as keyof typeof updatedProfile];

          if (typeof value === 'string' || typeof value === 'number') {
            formData.append(key, String(value)); // string으로 변환하여 추가
          } else if (value instanceof Blob) {
            formData.append(key, value); // Blob일 경우 직접 추가
          }
        });

        if (onEditComplete) {
          onEditComplete(updatedProfile); // 업데이트된 프로필 전달
        }
        setIsEditable(false);
      }
    } catch (err) {
      console.error(err);
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
    { name: '내용', value: editedProfile.content, key: 'content' },
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
          {isEditable && isCurrentUser ? (
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
                  {profile.image || !isEditable ? (
                    <>
                      <div className={styles['overlay']}></div>
                      <img
                        src={profile.image || basicProfileImg.src}
                        className={styles['image']}
                        alt="프로필 이미지"
                      />
                    </>
                  ) : (
                    <img
                      src={basicProfileImg.src}
                      className={styles['image']}
                      alt="기본 프로필 이미지"
                    />
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
              key={profile.image}
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
            <>
              <div className={styles['attribute-wrapper']}>
                {attributes.map((attr, index) => (
                  <UserAttribute
                    key={index}
                    attributeName={attr.name}
                    name={attr.key}
                    value={attr.value}
                    isEditable={isEditable}
                    isCurrentUser={isCurrentUser}
                    onChange={(name, value) => handleInputChange(name, value)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className={styles['non-editable-attribute-container']}>
              <div className={styles['always-show-user-attribute']}>
                {attributes.slice(0, 3).map((attr, index) => (
                  <UserAttribute
                    key={index}
                    name={attr.key}
                    attributeName={attr.name}
                    value={attr.value}
                    isEditable={isEditable}
                  />
                ))}
              </div>
              <div className={styles['desktop-user-attribute']}>
                {attributes.slice(3, 8).map((attr, index) => (
                  <UserAttribute
                    key={index}
                    name={attr.key}
                    attributeName={attr.name}
                    value={attr.value}
                    isEditable={isEditable}
                  />
                ))}
              </div>
              {isExpanded && (
                <div className={styles['tablet-mobile-expanded']}>
                  {attributes.slice(3, 8).map((attr, index) => (
                    <UserAttribute
                      key={index}
                      name={attr.key}
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
      {isEditable && (
        <div className={styles['profile-save-btn']}>
          <Button
            className={styles['cancel-btn']}
            color="outline"
            size="small"
            onClick={handleCancelClick}
          >
            취소
          </Button>
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
