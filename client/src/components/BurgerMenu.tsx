import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";

function BurgerMenu() {
  return (
    <Menu
      right
      customBurgerIcon={<img src="images/hamburger.png" alt="icon" />} // Ajout de l'icône du menu
      isOpen={false}
      onStateChange={(state) => console.log("Menu is open:", state.isOpen)}
    >
      <a href="/suivi">Suivi</a>
      <a href="/mes-quetes">Mes Quêtes</a>
      <a href="/mes-succes">Mes Succès</a>
      <a href="/alimentation">Alimentation</a>
      <a href="/mon-compte">Mon Compte</a>
    </Menu>
  );
}

export default BurgerMenu;
