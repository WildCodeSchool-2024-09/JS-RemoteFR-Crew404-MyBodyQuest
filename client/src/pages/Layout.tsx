import { Outlet } from "react-router-dom";
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
            <a href="suivi">Suivi</a>
          </li>
          <li>
            <a href="mesquetes">Mes quêtes</a>
          </li>
          <li>
            <a href="messucces">Mes succès</a>
          </li>
          <li>
            <a href="alimentation">Alimentation</a>
          </li>
          <li>
            <a href="moncompte">Mon compte</a>
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
