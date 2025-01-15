import { Link, Outlet } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import styles from "../styles/Layout.module.css";

function Layout() {
  return (
    <>
      <header>
        <img className={styles.coeur} src="images/coeur_logo.png" alt="logo" />
        <img className={styles.logo} src="images/Logo_txt.png" alt="logo" />
        <img
          className={styles.avatar}
          src="images/illustration-avatar-degrade_52683-142426.avif"
          alt="avatar user"
        />
        <BurgerMenu /> {/*n'apparait que sur mobile*/}
      </header>
      <nav>
        <ul>
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
      <Outlet />
      <footer>
        <a href="cgu">CGU</a>
        <img src="images/instagram_icon.png" alt="instagram" />
        <img src="images/facebook.png" alt="facebook" />
        <img src="images/github_icon.png" alt="github" />
        <a href="contact">Contact</a>
      </footer>
    </>
  );
}

export default Layout;
