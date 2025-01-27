import styles from "../styles/Quests.module.css";
import ProgressBar from "./ProgressBar";
import QuestsCards from "./QuestsCards";

function Quests() {
  return (
    <section className={styles.questsComponent}>
      <ProgressBar />
      <h1 className={styles.questsComponentTitle}>Mes Quêtes</h1>

      <QuestsCards />
    </section>
  );
}

export default Quests;
