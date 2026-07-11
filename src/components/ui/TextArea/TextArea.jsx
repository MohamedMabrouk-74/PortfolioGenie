import { forwardRef } from "react";
import styles from "../Input/Input.module.css";

const TextArea = forwardRef(function TextArea(
  { label, name, rows = 5, placeholder = "", error = "", ...rest },
  ref
) {
  return (
    <div className={styles.field}>
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        ref={ref}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        style={{ resize: "vertical", fontFamily: "inherit" }}
        {...rest}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

export default TextArea;
