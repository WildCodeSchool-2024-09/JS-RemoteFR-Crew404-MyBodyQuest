import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import api from "../services/api";
import styles from "../styles/QuestsCards.module.css";
import type { Quest } from "../types/interface";

function QuestsCards() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const { selectedCategory } = useContext(CategoryContext);
  const [filteredQuests, setFilteredQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await api.get("/api/quests");
        const data = res.data;
        setQuests(data);
        setFilteredQuests(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCards();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredQuests(quests);
    } else {
      const filtered = quests.filter(
        (quest) => quest.category_id === selectedCategory.id,
      );
      setFilteredQuests(filtered);
    }
  }, [selectedCategory, quests]);

  return (
    <section className={styles.questsArticles}>
      {filteredQuests.map((quest) => (
        <article key={quest.id} className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>{quest.xp} xp</p>
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
