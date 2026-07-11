import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>404 — Page not found</h1>
      <Button onClick={() => navigate("/")}>Go back home</Button>
    </div>
  );
}

export default NotFoundPage;
