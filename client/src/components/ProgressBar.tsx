// src/components/ProgressBar.tsx
import ProgressBar from "@ramonak/react-progress-bar";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/ProgressBar.module.css";

function UserProgressBar() {
  const { user } = useAuth();

  // VERIFIER Niveau et current Xp!!!
  return (
    <section className={styles.progressUser}>
      <h2 className={styles.progressTitle}>{`Niveau ${user?.level}`}</h2>
      <ProgressBar
        completed={user?.current_xp || 0}
        maxCompleted={100}
        bgColor="#5DCD8A"
        baseBgColor="#E0E0E0"
        className={styles.levelProgressBar}
      />
    </section>
  );
}

export default UserProgressBar;
