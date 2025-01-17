import HelloUserDashboard from "../components/HelloUserDashboard";
import ProgressBar from "../components/ProgressBar";
import styles from "../styles/Dashboard.module.css";

function Dashboard() {
  return (
    <main className={styles.mainDashoard}>
      <section className={styles.helloUser}>
        <HelloUserDashboard userId={1} />
      </section>
      <ProgressBar />
      <section className={styles.widgetsDashboard}>
        <article className={styles.widgetStats}>
          <h2>Mes stats</h2>
          <p> Courbe </p>
          <link rel="preload" href="#" as="#" />
        </article>
        <article className={styles.widgetTracking}>
          <h2>Mon Suivi</h2>
        </article>
        <article className={styles.widgetQuests}>
          <h2>Mes Quêtes</h2>
          <link rel="preload" href="#" as="#" />
          <link rel="preload" href="#" as="#" />
          <link rel="preload" href="#" as="#" />
        </article>
        <article className={styles.widgetSeasonalRecipe}>
          <h2>Recette de saison</h2>
          <img
            src="./public/images/Recette_de_saison.png"
            alt="Image_recette_de_saison"
            className={styles.imgSeasonalRecipe}
          />
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>
      </section>
    </main>
  );
}

export default Dashboard;
