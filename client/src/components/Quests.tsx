import QuestsCards from "../components/QuestsCards";
import { CategoryProvider } from "../context/CategoryContext";
import { UserProgressProvider } from "../context/UserProgressContext";
import styles from "../styles/Quests.module.css";
import CategoriesFilter from "./CategoriesFilter";
import ProgressBar from "./ProgressBar";

function Quests() {
  return (
    <UserProgressProvider>
      <CategoryProvider>
        <section className={styles.questsComponent}>
          <h1 className={styles.questsComponentTitle}>Mes Quêtes</h1>
          <ProgressBar />
          <section>
            <CategoriesFilter />
            <QuestsCards />
          </section>
        </section>
      </CategoryProvider>
    </UserProgressProvider>
  );
}

export default Quests;
