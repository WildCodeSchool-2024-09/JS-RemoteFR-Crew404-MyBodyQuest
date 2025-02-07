import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HelloUserDashboard from "../components/HelloUserDashboard";
import ProgressBar from "../components/ProgressBar";
import api from "../services/api";
import styles from "../styles/Dashboard.module.css";
import type { Quest } from "../types/interface";
import Chart from "./Chart";
import PreviewFoodCard from "./PreviewFoodCard";
import PreviewQuestsCard from "./PreviewQuestCard";

function Dashboard() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await api.get("/api/quests");
        setQuests(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuests();
  }, []);

  return (
    <main className={styles.mainDashoard}>
      <section className={styles.helloUser}>
        <HelloUserDashboard />
      </section>
      <ProgressBar />
      <section className={styles.widgetsDashboard}>
        <article className={styles.widgetStats}>
          <h2>Mes stats</h2>
          <p> Courbe </p>
          <Link to="/tracking">
            <Chart selectedDataType="Poids" selectedRange={[null, null]} />
          </Link>
        </article>

        <article className={styles.widgetTracking}>
          <h2>Mon Suivi</h2>
        </article>

        {/* Aperçu des quêtes */}
        <article className={styles.widgetQuests}>
          <h2>Mes Quêtes</h2>
          <PreviewQuestsCard quests={quests} />
        </article>

        {/* Aperçu de la recette */}
        <article className={styles.widgetSeasonalRecipe}>
          <h2>Idée recette !</h2>
          <PreviewFoodCard />
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
