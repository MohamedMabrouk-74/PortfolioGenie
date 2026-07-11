import styles from "./Button.module.css";

const VARIANT_CLASSES = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
};

function Button({ children, variant = "primary", type = "button", disabled = false, onClick, fullWidth = false }) {
  return (
    <button
      type={type}
      className={`${styles.button} ${VARIANT_CLASSES[variant]} ${fullWidth ? styles.fullWidth : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
