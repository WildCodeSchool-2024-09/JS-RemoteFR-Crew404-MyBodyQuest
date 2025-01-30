import { Link, Outlet } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import Footer from "../components/Footer.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import styles from "../styles/Layout.module.css";

function Layout() {
  const user = useAuth();
  return (
    <>
      <header className={styles.headercontainer}>
        <Link to="dashboard">
          <img
            className={styles.coeur}
            src="images/coeur_logo.png"
            alt="logo"
          />
          <img className={styles.logo} src="images/Logo_txt.png" alt="logo" />
        </Link>
        <img
          className={styles.avatar}
          src="images/illustration-avatar-degrade_52683-142426.avif" //fetch l'avatar de user (une fois le context créé)
          alt="avatar user"
        />
        {user && (
          <button
            type="button"
            onClick={() => user.handleLogout()}
            className={styles.logoutButton}
          >
            Se déconnecter
          </button>
        )}
        <BurgerMenu /> {/*n'apparait que sur mobile*/}
      </header>
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
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
