import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import HelloUserDashboard from "../components/HelloUserDashboard";
import ProgressBar from "../components/ProgressBar";
import PreviewTrackingCard from "../components/previewTrackingCard";
import { useAuth } from "../context/AuthContext";
import type { TrackingData } from "../context/TrackingContext";
import api from "../services/api";
import styles from "../styles/Dashboard.module.css";
import type { Quest, User } from "../types/interface";
import Chart from "./Chart";
import PreviewFoodCard from "./PreviewFoodCard";
import PreviewQuestsCard from "./PreviewQuestCard";

function Dashboard() {
  const dataUser = useLoaderData() as User;
  const { handleUpdateUser } = useAuth();
  handleUpdateUser(dataUser);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [trackings, setTrackings] = useState<TrackingData[]>([]);

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

  useEffect(() => {
    const fetchTrackings = async () => {
      try {
        const res = await api.get("/api/trackings");
        setTrackings(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrackings();
  }, []);

  return (
    <main className={styles.mainDashoard}>
      <section className={styles.helloUser}>
        <HelloUserDashboard />
      </section>
      <ProgressBar />
      <section className={styles.widgetsDashboard}>
        <article className={styles.widgetStats}>
          <h2>Mon suivi</h2>
          <Link to="/tracking">
            <Chart selectedDataType="Poids" selectedRange={[null, null]} />
          </Link>
        </article>

        <article className={styles.widgetTracking}>
          <h2>Mes stats</h2>
          {trackings.length > 0 ? (
            <PreviewTrackingCard tracking={trackings[0]} />
          ) : (
            <p>Aucune donnée disponible.</p>
          )}
        </article>

        {/* Aperçu des quêtes */}
        <article className={styles.widgetQuests}>
          <h2 className={styles.myQuests}>Mes Quêtes</h2>
          <PreviewQuestsCard quests={quests} />
        </article>

        {/* Aperçu de la recette */}
        <article className={styles.widgetSeasonalRecipe}>
          <h2>Recette du jour !</h2>
          <PreviewFoodCard />
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
