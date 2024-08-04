import React from 'react';
import clsx from 'clsx';
import styles from '@/pages/wiki/[code]/components/wikiAside/styles.module.scss';

interface UserAttributeProps {
  attributeName: string;
  value: string;
  isEditable: boolean;
  className?: string; // Optional prop for custom styling
}

const UserAttribute = ({
  attributeName,
  value,
  isEditable = false,
  className,
}: UserAttributeProps) => (
  <div className={clsx(styles['user-attribute'], className)}>
    <span className={styles['attribute-name']}>{attributeName}</span>
    {isEditable ? (
      <input
        className={clsx(styles['attribute-value'], {
          [styles['non-editable']]: !isEditable,
        })}
        value={value}
        readOnly={!isEditable}
      />
    ) : (
      <span className={styles['attribute-value']}>{value}</span>
    )}
  </div>
);

export default UserAttribute;
