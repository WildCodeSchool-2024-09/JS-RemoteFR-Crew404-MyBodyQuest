import { Link } from "react-router-dom";
import styles from "../styles/Layout.module.css";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        <li>
          <Link to="/tracking">Suivi</Link>
        </li>
        <li>
          <Link to="/quests">Mes quêtes</Link>
        </li>
        <li>
          <Link to="/success">Mes succès</Link>
        </li>
        <li>
          <Link to="/food">Alimentation</Link>
        </li>
        <li>
          <Link to="/account">Mon compte</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
