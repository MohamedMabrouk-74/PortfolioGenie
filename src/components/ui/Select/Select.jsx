import { forwardRef } from "react";
import styles from "./Select.module.css";
import inputStyles from "../Input/Input.module.css";

const Select = forwardRef(function Select({ label, name, options, ...rest }, ref) {
  return (
    <div className={inputStyles.field}>
      {label && (
        <label className={inputStyles.label} htmlFor={name}>
          {label}
        </label>
      )}
      <select id={name} name={name} ref={ref} className={styles.select} {...rest}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
