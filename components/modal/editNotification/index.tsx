import Image from 'next/image';
import topCloseIcon from '@/assets/icons/close.svg';
import styles from '@/components/modal/editNotification/styles.module.scss';
import NotificationCard from './notificationCard';
import { useState, useEffect } from 'react';

/**
 * @ mockData 사용 (API 연동 후 수정 필요)
 */
const mockNotifications = [
  { id: 1, timeStamp: '1분 전' },
  { id: 2, timeStamp: '5분 전' },
  { id: 3, timeStamp: '10분 전' },
];

interface Notification {
  id: number;
  timeStamp: string;
}

const EditNotification = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  // mockData로 상태 초기화 하는 로직
  const loadMockNotifications = () => {
    setNotifications(mockNotifications);
    setNotificationCount(mockNotifications.length);
  };

  useEffect(() => {
    loadMockNotifications();
  }, []);

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <strong className={styles['title']}>알림 {notificationCount}개</strong>
        <Image src={topCloseIcon} alt="닫기" width={24} height={24} />
      </div>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          timeStamp={notification.timeStamp}
        />
      ))}
    </div>
  );
};

export default EditNotification;
