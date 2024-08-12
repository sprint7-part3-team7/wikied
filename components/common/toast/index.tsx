import React, { useEffect, useState } from 'react';
import styles from '@/components/common/toast/styles.module.scss';
import clsx from 'clsx';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
  duration?: number;
}

const Toast = ({ message, type, onClose, duration = 2000 }: ToastProps) => {
  const [progress, setProgress] = useState(90);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 100 / (duration / 50) : 0));
    }, 50);

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose, duration]);

  return (
    <div className={clsx(styles['toast'], styles[type])} onClick={onClose}>
      <div className={styles['content-wrapper']}>
        <p>{message}</p>
      </div>
      <div className={styles['progress-bar-wrapper']}>
        <div
          className={styles['progress-bar']}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;
