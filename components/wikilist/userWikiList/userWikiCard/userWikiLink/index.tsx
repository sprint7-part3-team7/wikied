import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import LinkIcon from '@/assets/icons/ic_link.svg';
import SnackBar from '@/components/common/snackbar';
import Image from 'next/image';
import { ProfileSummary } from '@/types/wiki';

interface UserLinkProps {
  url: string;
  user: ProfileSummary;
}

const UserWikiLink = ({ url, user }: UserLinkProps) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarSize, setSnackBarSize] = useState<'small' | 'large'>('large');

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowSnackBar(true);
      })
      .catch((err) => {
        console.error('링크 복사에 실패했습니다.', err);
      });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSnackBarSize('small');
      } else {
        setSnackBarSize('large');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            message="내 위키 링크가 복사되었습니다."
            type="success"
            size={snackBarSize}
          />
        </div>
      )}
      <div className={styles['link-container']} onClick={copyToClipboard}>
        <Image src={LinkIcon} alt="링크" width={20} height={20} />
        <span className={styles['link-text']}>
          {'https://www.wikied.kr/' + user.id}
        </span>
      </div>
    </div>
  );
};

export default UserWikiLink;
