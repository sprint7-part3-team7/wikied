import { useState, useRef, ChangeEvent } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Button from '@/components/button';
import styles from '@/components/modal/addImage/styles.module.scss';
import Modal from '..';
import closeIcon from '@/assets/icons/ic_close.svg';
import cameraIcon from '@/assets/icons/ic_camera.svg';

interface AddImageProps {
  size?: 'small' | 'large';
}

const AddImage = ({ size = 'large' }: AddImageProps): JSX.Element => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal size={size}>
      <div className={clsx(styles['container'], styles[size])}>
        <Image className={styles['close-image']} src={closeIcon} alt="닫기" />
        <div className={styles['image-wrapper']}>
          <label htmlFor="file-input" className={styles['image-label']}>
            이미지
          </label>
          <div className={styles['image-input-box']} onClick={handleInputClick}>
            <input
              id="file-input"
              type="file"
              ref={fileInputRef}
              className={styles['image-input']}
              onChange={handleImageChange}
              accept="image/*"
            />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="미리보기"
                className={styles['preview-image']}
              />
            ) : (
              <Image
                className={styles['image']}
                src={cameraIcon}
                alt="카메라"
                width={36}
                height={36}
              />
            )}
          </div>
        </div>
        <Button
          size="small"
          color="disabled"
          alignEnd
          className={styles['button']}
        >
          삽입하기
        </Button>
      </div>
    </Modal>
  );
};

export default AddImage;
