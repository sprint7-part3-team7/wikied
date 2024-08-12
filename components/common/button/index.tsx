import styles from '@/components/button/styles.module.scss';
import clsx from 'clsx';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  color:
    | 'primary'
    | 'alert'
    | 'outline'
    | 'disabled'
    | 'main-top'
    | 'main-bottom';
  size?: 'small' | 'large' | 'x-large';
  defaultPadding?: boolean;
  fullWidth?: boolean;
  alignEnd?: boolean;
  className?: string;
  trailingIcon?: React.ReactNode;
}

const Button = ({
  children,
  color = 'primary',
  size = 'large',
  defaultPadding = false,
  fullWidth = false,
  alignEnd = false,
  className,
  trailingIcon,
  ...rest
}: ButtonProps) => {
  const buttonClass = clsx(
    styles.button,
    styles[color],
    styles[size],
    {
      [styles.defaultPadding]: defaultPadding,
      [styles.fullWidth]: fullWidth,
      [styles.alignEnd]: alignEnd,
    },
    className,
  );

  return (
    <button {...rest} className={buttonClass}>
      {children}
      {trailingIcon && <span className={styles['icon']}>{trailingIcon}</span>}
    </button>
  );
};

export default Button;
