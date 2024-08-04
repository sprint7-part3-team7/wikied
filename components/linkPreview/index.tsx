import clsx from 'clsx';
import styles from '@/components/input/styles.module.scss';
import Image from 'next/image';
import link from '@/assets/icons/ic_link.svg';

interface LinkPreviewProps {
  url: string;
  className?: string;
}

const LinkPreview = ({ url, className }: LinkPreviewProps) => {
  return (
    <div className={styles['container']}>
      <div className={styles['icon']}>
        <Image src={link} alt="링크" />
      </div>
      <span className={styles['url']}>{url}</span>
    </div>
  );
};

export default LinkPreview;
