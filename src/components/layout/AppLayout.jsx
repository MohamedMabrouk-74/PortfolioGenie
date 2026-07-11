import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
