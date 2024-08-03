import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import styles from './styles.module.scss';

interface ArticleOrderDropdownProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

const ArticleOrderDropdown = ({
  options,
  selected,
  onChange,
}: ArticleOrderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const selectedLabel = useMemo(() => {
    const selectedOption = options.find((option) => option.value === selected);
    return selectedOption ? selectedOption.label : '';
  }, [selected, options]);

  const handleOptionClick = useCallback(
    (value: string) => {
      onChange(value);
      setIsOpen(false);
    },
    [onChange],
  );

  const toggleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className={styles['dropdown']} ref={dropdownRef}>
      <button className={styles['dropdown-button']} onClick={toggleDropdown}>
        {selectedLabel}
      </button>
      {isOpen && (
        <ul className={styles['dropdown-menu']}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={styles['dropdown-item']}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(ArticleOrderDropdown);
