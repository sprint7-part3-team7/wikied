import React, { useState } from 'react';
import clsx from 'clsx';
import styles from '@/components/wiki/wikiAside/styles.module.scss';

interface UserAttributeProps {
  attributeName: string;
  value: string;
  name: string;
  isEditable: boolean;
  isCurrentUser?: boolean;
  onChange?: (name: string, value: string) => void;
  className?: string;
}

const UserAttribute = ({
  attributeName,
  value,
  name,
  isEditable = false,
  isCurrentUser,
  onChange,
  className,
}: UserAttributeProps) => {
  const [attributeValue, setAttributeValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setAttributeValue(newValue);
    if (onChange) {
      onChange(name, newValue);
    }
  };

  return (
    <div className={clsx(styles['user-attribute'], className)}>
      <span className={styles['attribute-name']}>{attributeName}</span>
      {isEditable && isCurrentUser ? (
        <input
          className={clsx(styles['attribute-value'], {
            [styles['non-editable']]: !isEditable,
          })}
          value={attributeValue}
          onChange={handleChange}
        />
      ) : (
        <span className={styles['attribute-value']}>{value}</span>
      )}
    </div>
  );
};

export default UserAttribute;
