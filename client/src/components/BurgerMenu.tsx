import { slide as Menu } from "react-burger-menu";
import styles from "../styles/BurgerMenu.module.css";

function BurgerMenu() {
  return (
    <Menu>
      <a className={styles.menuItem} href="/suivi">
        Suivi
      </a>
      <a className={styles.menuItem} href="/mes-quetes">
        Mes Quêtes
      </a>
      <a className={styles.menuItem} href="/mes-succes">
        Mes Succès
      </a>
      <a className={styles.menuItem} href="/alimentation">
        Alimentation
      </a>
      <a className={styles.menuItem} href="/mon-compte">
        Mon Compte
      </a>
    </Menu>
  );
}

export default BurgerMenu;
