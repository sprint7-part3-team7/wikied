import Image from 'next/image';
import closeIcon from '@/assets/icons/ic_close.svg';
import styles from '@/components/modal/alert/styles.module.scss';
import Button from '@/components/button';
import clsx from 'clsx';

interface AlertProps {
  title: string;
  description: string;
  content: string;
  size?: 'small' | 'large';
}

const Alert = ({
  title,
  description,
  content,
  size = 'large',
}: AlertProps): JSX.Element => {
  const buttonColor =
    title === '저장하지 않고 나가시겠어요?' ? 'alert' : 'primary';

  return (
    <div className={clsx(styles.container, styles[size])}>
      <Image
        className={styles['close-image']}
        src={closeIcon}
        alt="닫기"
        width={20}
        height={20}
      />
      <div className={styles['contents-wrapper']}>
        <strong className={clsx(styles.title, styles[size])}>{title}</strong>
        <p className={clsx(styles.description, styles[size])}>{description}</p>
      </div>
      <Button color={buttonColor} size="small" defaultPadding alignEnd>
        {content}
      </Button>
    </div>
  );
};

export default Alert;
