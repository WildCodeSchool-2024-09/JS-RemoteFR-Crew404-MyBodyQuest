import { useEffect, useState } from "react";
import api from "../services/api";
import styles from "../styles/QuestsCards.module.css";
import type { Quest } from "../types/interface";

function QuestsCards() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await api.get("/api/quests");
        const data = res.data;
        setQuests(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCards();
  }, []);

  return (
    <section className={styles.questsArticles}>
      {quests.map((quest) => (
        <article key={quest.id} className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>{quest.xp}</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2 className={styles.questTitle}>{quest.quest_title}</h2>
            <h3 className={styles.questDescription}>{quest.description}</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>
      ))}
    </section>
  );
}

export default QuestsCards;
