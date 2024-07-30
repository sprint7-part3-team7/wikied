import React, { useState, useEffect } from "react";
import styles from "./OrderDropdown.module.scss";

interface OrderDropdownProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
}

const OrderDropdown = ({ options, selected, onChange }: OrderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === selected);
    if (selectedOption) {
      setSelectedLabel(selectedOption.label);
    }
  }, [selected, options]);

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className={styles["dropdown"]}>
      <button
        className={styles["dropdown-button"]}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel}
      </button>
      {isOpen && (
        <ul className={styles["dropdown-menu"]}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={styles["dropdown-item"]}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderDropdown;
