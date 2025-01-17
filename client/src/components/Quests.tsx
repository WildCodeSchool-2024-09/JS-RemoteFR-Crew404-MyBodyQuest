import styles from "../styles/Quests.module.css";
import ProgressBar from "./ProgressBar";

function Quests() {
  return (
    <section className={styles.questsComponent}>
      <ProgressBar />
      <h1>Mes Quêtes</h1>
      <section className={styles.questsArticles}>
        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>15xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Marche lvl 2</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>10xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Petit dej' en folie!</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>10xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Jour de course lvl 1</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>10xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Graines & co</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>30xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Weekend dynamique</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>15xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Gainage lvl 3</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>15xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Marche lvl 1</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>

        <article className={styles.questContent}>
          <section className={styles.questXpContainer}>
            <p className={styles.questXp}>15xp</p>
          </section>
          <section className={styles.questTitleAndObj}>
            <h2>Semaine détox</h2>
            <h3>Objectif</h3>
          </section>
          <section className={styles.questsCheckbox}>
            <input type="checkbox" />
          </section>
        </article>
      </section>
    </section>
  );
}

export default Quests;
