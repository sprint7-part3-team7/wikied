import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import LinkIcon from '@/assets/icons/ic_link.svg';
import Image from 'next/image';
import SnackBar from '@/components/snackbar';

interface UserLinkProps {
  url: string;
}

const UserWikiLink = ({ url }: UserLinkProps) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        setShowSnackBar(true);
      })
      .catch(err => {
        console.error('링크 복사에 실패했습니다.', err);
      });
  };

  useEffect(() => {
    if (showSnackBar) {
      const timer = setTimeout(() => {
        setShowSnackBar(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSnackBar]);

  return (
    <div className={styles['container']}>
      {showSnackBar && (
        <div className={styles['snackbar-wrapper']}>
          <SnackBar
            message="링크가 클립보드에 복사되었습니다."
            type="success"
            size="small"
          />
        </div>
      )}
      <div className={styles['link-container']} onClick={copyToClipboard}>
        <Image src={LinkIcon} alt="Link icon" width={20} height={20} />
        <span className={styles['link-text']}>{url}</span>
      </div>
    </div>
  );
};


export default UserWikiLink;
