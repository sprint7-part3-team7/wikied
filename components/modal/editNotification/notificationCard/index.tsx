import bottomCloseIcon from '@/assets/icons/ic_close.svg';
import circleIcon from '@/assets/icons/circle.svg';
import styles from '@/components/modal/editNotification/notificationCard/styles.module.scss';
import Image from 'next/image';

interface NotificationCardProps {
  timeStamp: string;
}

const NotificationCard = ({ timeStamp }: NotificationCardProps) => {
  return (
    <div className={styles['alert-container']}>
      <div className={styles['alert-header']}>
        <Image
          className={styles['circle-icon']}
          src={circleIcon}
          alt="알림"
          width={5}
          height={5}
        />
        <Image src={bottomCloseIcon} alt="닫기" width={24} height={24} />
      </div>
      <p className={styles['description']}>내 위키가 수정되었습니다.</p>
      <span className={styles['time-stamp']}>{timeStamp}</span>
    </div>
  );
};

export default NotificationCard;
