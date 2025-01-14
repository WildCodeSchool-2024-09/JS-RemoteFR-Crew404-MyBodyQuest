import { Line } from "rc-progress";
import style from "../styles/ProgressBar.module.css";

function ProgressBar() {
  return (
    // Progession de Niveau et lien vers la page Mes Succès
    <>
      <section className={style.progressUser}>
        <h2 className={style.progressTitle}>Niveau N</h2>
        <Line
          percent={60}
          strokeWidth={8}
          trailWidth={8}
          trailColor="#E0E0E0"
          strokeColor="#5DCD8A"
          className={style.levelProgressBar}
        />
      </section>
    </>
  );
}

export default ProgressBar;
