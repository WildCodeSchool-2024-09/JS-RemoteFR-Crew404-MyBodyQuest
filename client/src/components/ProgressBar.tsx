import { Line } from "rc-progress";
import styles from "../styles/ProgressBar.module.css";

function ProgressBar() {
  return (
    // Progession de Niveau et lien vers la page Mes Succès
    <>
      <section className={styles.progressUser}>
        <h2 className={styles.progressTitle}>Niveau N</h2>
        <Line
          percent={60}
          strokeWidth={8}
          trailWidth={8}
          trailColor="#E0E0E0"
          strokeColor="#5DCD8A"
          className={styles.levelProgressBar}
        />
      </section>
    </>
  );
}

export default ProgressBar;
