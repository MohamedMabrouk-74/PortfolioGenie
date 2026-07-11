import styles from "./Spinner.module.css";

function Spinner({ size = "md" }) {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <span className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}

export default Spinner;
