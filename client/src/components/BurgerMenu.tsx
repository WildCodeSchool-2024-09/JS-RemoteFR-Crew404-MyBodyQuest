import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";
import { useEffect, useState } from "react";

function BurgerMenu() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Fonction pour vérifier la taille de l'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px est un exemple de largeur max pour mobile
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Écoute les changements de taille d'écran
    return () => window.removeEventListener("resize", checkMobile); // Nettoyage
  }, []);

  if (!isMobile)
    // Rendu uniquement sur mobile
    return null;
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
