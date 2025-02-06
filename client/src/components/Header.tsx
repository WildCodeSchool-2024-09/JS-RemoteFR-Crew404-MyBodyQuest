import { Link } from "react-router-dom";
import BurgerMenu from "../components/BurgerMenu.tsx";
import { useAuth } from "../context/AuthContext.tsx";
import styles from "../styles/Layout.module.css";

function Header() {
  const { user, handleLogout } = useAuth();
  return (
    <>
      <header className={styles.headercontainer}>
        <Link to="/dashboard">
          <img
            className={styles.coeur}
            src="images/coeur_logo.png"
            alt="logo"
          />
          <img className={styles.logo} src="images/Logo_txt.png" alt="logo" />
        </Link>
        <img
          className={styles.avatar}
          src={
            user?.avatar
              ? `${import.meta.env.VITE_API_URL}/uploads/${user.avatar}`
              : `${import.meta.env.VITE_API_URL}/uploads/avatardefault.svg`
          } //fetch l'avatar de user (une fois le context créé)
          alt="avatar user"
        />
        {user && (
          <button
            type="button"
            onClick={() => handleLogout()}
            className={styles.logoutButton}
          >
            Se déconnecter
          </button>
        )}
        <BurgerMenu /> {/*n'apparait que sur mobile*/}
      </header>
    </>
  );
}

export default Header;
