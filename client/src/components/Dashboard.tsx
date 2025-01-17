import HelloUserDashboard from "../components/HelloUserDashboard";
import ProgressBar from "../components/ProgressBar";
import style from "../styles/Dashboard.module.css";

function Dashbord() {

  return (
    <main className={style.mainDashoard}>
      <section className={style.helloUser}>
        <HelloUserDashboard userId={1} />
      </section>
      <ProgressBar />
      <section className={style.widgetsDashboard}>
        <article className={style.widgetStats}>
          <h2>Mes stats</h2>
          <p> Courbe </p>
          <link rel="preload" href="#" as="#" />
        </article>
        <article className={style.widgetTracking}>
          <h2>Mon Suivi</h2>
        </article>
        <article className={style.widgetQuests}>
          <h2>Mes Quêtes</h2>
          <link rel="preload" href="#" as="#" />
          <link rel="preload" href="#" as="#" />
          <link rel="preload" href="#" as="#" />
        </article>
        <article className={style.widgetSeasonalRecipe}>
          <h2>Recette de saison</h2>
          <img
            src="./public/images/Recette_de_saison.png"
            alt="Image_recette_de_saison"
            className={style.imgSeasonalRecipe}
          />
          <p> Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>
      </section>
    </main>
  );
}


export default Dashbord;

