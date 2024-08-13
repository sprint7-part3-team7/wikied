import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { ProfileDetail } from '@/types/wiki';
import UserAttribute from '@/components/wiki/wikiAside/userAttribute';
import { imageFileToUrl, getUserInfo } from '@/services/api/profile';
import Button from '@/components/common/button';
import styles from '@/components/wiki/wikiAside/styles.module.scss';
import expandIcon from '@/assets/icons/ic_expand.svg';
import fileUploadIcon from '@/assets/icons/ic_camera.svg';
import basicProfileImg from '@/assets/icons/ic_profile.svg';

interface WikiAsideProps {
  className: string;
  profile: ProfileDetail;
  setProfile: React.Dispatch<React.SetStateAction<ProfileDetail>>;
  isEditable: boolean;
  setIsEditable: (isEditable: boolean) => void;
  onProfileChange: (updatedProfile: ProfileDetail) => void;
  onSave: () => void;
  onCancel: () => void;
}

const WikiAside = ({
  className,
  profile,
  isEditable,
  onProfileChange,
  onSave,
  onCancel,
}: WikiAsideProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [editedProfile, setEditedProfile] = useState<ProfileDetail>(profile);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setEditedProfile(profile);
  }, [profile]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getUserInfo();
        const { data } = response;
        const userId = String(data.profile.id);
        const profileIdStr = String(profile.id);
        setIsCurrentUser(profileIdStr === userId);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrentUser();
  }, [profile.id]);

  const handleToggle = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const nextPreview = URL.createObjectURL(file);
      setPreview(nextPreview);

      const newFileName = `${uuidv4()}.${file.name.split('.').pop()}`;
      const newFile = new File([file], newFileName, { type: file.type });
      setImageFile(newFile);

      try {
        const response = await imageFileToUrl(newFile);
        const imageUrl = response.data.url;
        const updatedProfile = {
          ...editedProfile,
          image: imageUrl,
        };
        setEditedProfile(updatedProfile);
        onProfileChange(updatedProfile);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }

      return () => {
        URL.revokeObjectURL(nextPreview);
      };
    }
  };

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (name: string, value: string) => {
    const updatedProfile = {
      ...editedProfile,
      [name]: value,
    };
    setEditedProfile(updatedProfile);
    onProfileChange(updatedProfile);
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
          <button
            className={clsx(styles['expand-btn'], {
              [styles['expanded']]: isExpanded,
            })}
            onClick={handleToggle}
          >
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
          <span className={styles['user-name']}>{profile.name}</span>
          <Button
            className={styles['cancel-btn']}
            color="outline"
            size="small"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            className={styles['save-btn']}
            color="primary"
            size="small"
            onClick={onSave}
          >
            저장
          </Button>
        </div>
      )}
    </>
  );
};

export default WikiAside;
