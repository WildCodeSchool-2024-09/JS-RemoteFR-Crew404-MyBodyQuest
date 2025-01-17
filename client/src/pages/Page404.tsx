import { Link } from "react-router-dom";
import styles from "../styles/Page_404.module.css";

function Page_404() {
  return (
    <>
      <section className={styles.error_container}>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
        <span className={styles.zero}>
          <span className={styles.screen_reader_text}>0</span>
        </span>
        <span className={styles.four}>
          <span className={styles.screen_reader_text}>4</span>
        </span>
      </section>
      <Link className={styles.to_home} to="/">
        Accueil
      </Link>
    </>
  );
}

export default Page_404;
