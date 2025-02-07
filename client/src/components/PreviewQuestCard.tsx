import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import type { Quest } from "../types/interface";

interface PreviewQuestsCardProps {
  quests: Quest[];
}

function PreviewQuestsCard({ quests }: PreviewQuestsCardProps) {
  return (
    <section className={styles.questsArticles}>
      {quests.slice(0, 3).map((quest) => (
        <article key={quest.id} className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>{quest.xp} xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2 className={styles.questTitle}>{quest.quest_title}</h2>
            <h3 className={styles.questDescription}>{quest.description}</h3>
          </section>
        </article>
      ))}
      <Link to="/quests" className={styles.viewMoreButton}>
        Voir plus de quêtes
      </Link>
    </section>
  );
}

export default PreviewQuestsCard;
