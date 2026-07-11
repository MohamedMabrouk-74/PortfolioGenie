import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import styles from "./HomePage.module.css";

const FEATURES = [
  { icon: "⚡", title: "GitHub import", text: "Pulls your repositories automatically to save you time." },
  { icon: "✨", title: "AI-optimized copy", text: "Rewrites descriptions and About Me to sound recruiter-ready." },
  { icon: "🎨", title: "Polished design", text: "A clean, modern layout that makes your work stand out." },
];

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className={styles.hero}>
        <span className={styles.badge}>AI-Powered Portfolio Builder</span>
        <h1>
          Turn your GitHub into a <span className={styles.gradientText}>standout portfolio</span>
        </h1>
        <p>
          PortfolioGenie analyzes your repositories and helps you write optimized project
          descriptions and a compelling About Me — so you can focus on building, not writing copy.
        </p>
        <div className={styles.heroActions}>
          <Button onClick={() => navigate("/builder")}>Start building — it's free</Button>
          <Button variant="secondary" onClick={() => navigate("/preview")}>
            See live preview
          </Button>
        </div>
      </section>

      <section className={styles.features}>
        {FEATURES.map((feature) => (
          <div key={feature.title} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default HomePage;
