import QuestsCards from "../components/QuestsCards";
import { CategoryProvider } from "../context/CategoryContext";
import styles from "../styles/Quests.module.css";
import CategoriesFilter from "./CategoriesFilter";
import ProgressBar from "./ProgressBar";

function Quests() {
  return (
    <CategoryProvider>
      <section className={styles.questsComponent}>
        <ProgressBar />
        <h1 className={styles.questsComponentTitle}>Mes Quêtes</h1>
        <CategoriesFilter />
        <QuestsCards />
      </section>
    </CategoryProvider>
  );
}

export default Quests;
