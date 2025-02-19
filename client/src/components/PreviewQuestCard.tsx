import { Link } from "react-router-dom";
import styles from "../styles/Dashboard.module.css";
import type { Quest } from "../types/interface";

interface PreviewQuestsCardProps {
  quests: Quest[];
}

function PreviewQuestsCard({ quests }: PreviewQuestsCardProps) {
  return (
    <>
      <section className={styles.questsArticles}>
        {quests.slice(0, 2).map((quest) => (
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
      </section>
      <section className={styles.redirectionButtonQuests}>
        <Link to="/quests">
          <button type="button" className={styles.questsButton}>
            Voir plus de quêtes
          </button>
        </Link>
      </section>
    </>
  );
}

export default PreviewQuestsCard;
