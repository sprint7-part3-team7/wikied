import { useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Profile } from "@/types/wiki";
import styles from "@/pages/wiki/[code]/components/wikiAside/styles.module.scss";
import expandIcon from "@/assets/icons/ic_expand.svg";
import fileUploadIcon from "@/assets/icons/ic_camera.svg";

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

  return (
    <div
      className={clsx(styles["user-profile"], className, {
        [styles["editable"]]: isEditable,
      })}
    >
      <div className={styles["image-container"]}>
        {isEditable ? (
          <div
            className={styles["file-input-wrapper"]}
            onClick={handleDivClick}
          >
            <input
              type="file"
              id="fileInput"
              className={styles.fileInput}
              onChange={handleFileChange}
              ref={inputRef}
              accept="image/*"
            />
            {!preview ? (
              <>
                <Image
                  src={fileUploadIcon}
                  className={styles["fileUploadIcon"]}
                  width={36}
                  height={36}
                  alt="파일 업로드 아이콘"
                />
                {profile.image && (
                  <>
                    <div className={styles["overlay"]}></div>
                    <img
                      src={profile.image}
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
          <>
            <Image
              className={styles["image"]}
              src={profile?.image}
              width={200}
              height={200}
              alt="프로필 이미지"
            />
          </>
        )}
      </div>
      <div className={styles["user-attribute-container"]}>
        <div className={styles["always-show-user-attribute"]}>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>거주 도시</span>
            <span className={styles["attribute-value"]}>
              {profile ? profile.city : ""}
            </span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>MBTI</span>
            <span className={styles["attribute-value"]}>
              {profile?.mbti ?? ""}
            </span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>직업</span>
            <span className={styles["attribute-value"]}>
              {profile?.job ?? ""}
            </span>
          </div>
        </div>
        {isEditable && (
          <div
            className={clsx(styles["desktop-user-attribute"], {
              [styles["editable-attribute"]]: isEditable,
            })}
          >
            <div className={styles["user-attribute"]}>
              <span className={styles["attribute-name"]}>SNS 계정</span>
              <span className={styles["attribute-value"]}>
                {profile ? profile.sns : ""}
              </span>
            </div>
            <div className={styles["user-attribute"]}>
              <span className={styles["attribute-name"]}>생일</span>
              <span className={styles["attribute-value"]}>
                {profile ? profile.birthday : ""}
              </span>
            </div>
            <div className={styles["user-attribute"]}>
              <span className={styles["attribute-name"]}>별명</span>
              <span className={styles["attribute-value"]}>
                {profile ? profile.nickname : ""}
              </span>
            </div>
            <div className={styles["user-attribute"]}>
              <span className={styles["attribute-name"]}>혈액형</span>
              <span className={styles["attribute-value"]}>
                {profile ? profile.bloodType : ""}
              </span>
            </div>
            <div className={styles["user-attribute"]}>
              <span className={styles["attribute-name"]}>국적</span>
              <span className={styles["attribute-value"]}>
                {profile ? profile.nationality : ""}
              </span>
            </div>
          </div>
        )}
      </div>
      {!isEditable && isExpanded && (
        <div className={styles["selective-show-user-attribute"]}>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>SNS 계정</span>
            <span className={styles["attribute-value"]}>{profile.sns}</span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>생일</span>
            <span className={styles["attribute-value"]}>
              {profile.birthday}
            </span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>별명</span>
            <span className={styles["attribute-value"]}>
              {profile.nickname}
            </span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>혈액형</span>
            <span className={styles["attribute-value"]}>
              {profile.bloodType}
            </span>
          </div>
          <div className={styles["user-attribute"]}>
            <span className={styles["attribute-name"]}>국적</span>
            <span className={styles["attribute-value"]}>
              {profile.nationality}
            </span>
          </div>
        </div>
      )}
      {!isEditable && (
        <button className={styles["expand-btn"]} onClick={handleToggle}>
          <Image
            className={styles["expand-icon"]}
            src={expandIcon}
            width={24}
            height={24}
            alt="토글 버튼 아이콘"
          />
        </button>
      )}
    </div>
    // </div>
  );
};

export default WikiAside;
