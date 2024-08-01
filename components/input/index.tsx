import React from "react";
import clsx from "clsx";
import styles from "@/components/input/styles.module.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
}

const Input = ({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}: InputProps) => {
  return (
    <div
      className={clsx(
        styles["inputContainer"],
        { [styles["fullWidth"]]: fullWidth },
        className
      )}
    >
      {label && <label className={styles["label"]}>{label}</label>}
      <input
        className={clsx(styles["input"], { [styles["error"]]: error })}
        {...props}
      />
      {error && <p className={styles["errorText"]}>{error}</p>}
    </div>
  );
};

export default Input;
