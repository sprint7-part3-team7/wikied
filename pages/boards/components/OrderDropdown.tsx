import React, { useState } from "react";
import styles from "./OrderDropdown.module.scss";

interface OrderDropdownProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

const OrderDropdown: React.FC<OrderDropdownProps> = ({
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <span className={styles.arrow}></span>
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`${styles.dropdownItem} ${
                selected === option ? styles.selected : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderDropdown;
