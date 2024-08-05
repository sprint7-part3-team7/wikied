import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Profile } from '@/types/wiki';
import UserAttribute from './components/userAttribute';
import styles from '@/pages/wiki/[code]/components/wikiAside/styles.module.scss';
import expandIcon from '@/assets/icons/ic_expand.svg';
import fileUploadIcon from '@/assets/icons/ic_camera.svg';
import Button from '@/components/button';

interface WikiAsideProps {
  className: string;
  profile: Profile;
  isEditable: boolean;
}

const WikiAside = ({ className, profile, isEditable }: WikiAsideProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
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

  const attributes = [
    { name: '거주 도시', value: profile?.city },
    { name: 'MBTI', value: profile?.mbti },
    { name: '직업', value: profile?.job },
    { name: 'SNS 계정', value: profile?.sns },
    { name: '생일', value: profile?.birthday },
    { name: '별명', value: profile?.nickname },
    { name: '혈액형', value: profile?.bloodType },
    { name: '국적', value: profile?.nationality },
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
                id="fileInput"
                className={styles['fileInput']}
                onChange={handleFileChange}
                ref={inputRef}
                accept="image/*"
              />
              {!preview ? (
                <>
                  <Image
                    src={fileUploadIcon}
                    className={styles['fileUploadIcon']}
                    width={36}
                    height={36}
                    alt="파일 업로드 아이콘"
                  />
                  {profile?.image && (
                    <>
                      <div className={styles['overlay']}></div>
                      <img
                        src={profile?.image}
                        className={styles.image}
                        alt="프로필 이미지"
                      />
                    </>
                  )}
                </>
              ) : (
                <img
                  src={preview}
                  className={styles.previewImage}
                  alt="첨부파일 미리보기"
                />
              )}
            </div>
          ) : (
            <img
              className={styles['image']}
              src={profile?.image}
              alt="프로필 이미지"
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
            <Image
              className={styles['expand-icon']}
              src={expandIcon}
              width={24}
              height={24}
              alt="더보기 아이콘"
            />
          </button>
        )}
      </div>
      {/* 취소/저장 버튼 */}
      {isEditable && (
        <div className={styles['profile-save-btn']}>
          <Button className={styles['cancel-btn']} color="outline" size="small">
            취소
          </Button>
          <Button className={styles['save-btn']} color="primary" size="small">
            저장
          </Button>
        </div>
      )}
    </>
  );
};

export default WikiAside;
