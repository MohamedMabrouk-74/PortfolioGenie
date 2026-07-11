import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(function Input({ label, name, type = "text", placeholder = "", error = "", ...rest }, ref) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

export default Input;
