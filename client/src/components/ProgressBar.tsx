// src/components/ProgressBar.tsx
import ProgressBar from "@ramonak/react-progress-bar";
import { useUserProgress } from "../context/UserProgressContext";
import styles from "../styles/ProgressBar.module.css";

function UserProgressBar() {
  const { userProgress } = useUserProgress();

  // VERIFIER Niveau et current Xp!!!
  return (
    <section className={styles.progressUser}>
      <h2
        className={styles.progressTitle}
      >{`Niveau ${userProgress[0]?.level}`}</h2>
      <ProgressBar
        completed={userProgress[0]?.current_xp}
        maxCompleted={100}
        bgColor="#5DCD8A"
        baseBgColor="#E0E0E0"
        className={styles.levelProgressBar}
      />
    </section>
  );
}

export default UserProgressBar;
