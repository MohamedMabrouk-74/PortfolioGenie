import { NavLink } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>
        <span className={styles.logoMark}>PG</span>
        Portfolio<span className={styles.logoAccent}>Genie</span>
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
          Home
        </NavLink>
        <NavLink to="/builder" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
          Builder
        </NavLink>
        <NavLink to="/preview" className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
          Preview
        </NavLink>
      </nav>

      <button type="button" className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </header>
  );
}

export default Navbar;
