import bottomCloseIcon from '@/assets/icons/ic_close.svg';
import circleIcon from '@/assets/icons/circle.svg';
import styles from '@/components/common/modal/components/editNotification/notificationCard/styles.module.scss';
import Image from 'next/image';
import clsx from 'clsx';

interface NotificationCardProps {
  timeStamp: string;
  size: 'small' | 'large';
  onDelete: () => void;
}

const NotificationCard = ({
  timeStamp,
  size,
  onDelete,
}: NotificationCardProps) => {
  const handleDelete = () => {
    onDelete();
  };

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
        <button
          className={clsx(styles['close-button'], styles[size])}
          onClick={handleDelete}
        >
          <Image
            className={clsx(styles['close-icon'], styles[size])}
            src={bottomCloseIcon}
            alt="닫기"
          />
        </button>
      </div>
      <p className={clsx(styles['description'], styles[size])}>
        내 위키가 수정되었습니다.
      </p>
      <span className={clsx(styles['time-stamp'], styles[size])}>
        {timeStamp}
      </span>
    </div>
  );
};

export default NotificationCard;
