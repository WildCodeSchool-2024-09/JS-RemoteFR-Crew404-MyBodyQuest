import { slide as Menu } from "react-burger-menu";
import "../styles/BurgerMenu.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function BurgerMenu() {
  const user = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Ajout de l'état pour gérer l'ouverture du menu

  useEffect(() => {
    // Fonction pour vérifier la taille de l'écran
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px est un exemple de largeur max pour mobile
    };

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile); // Écoute les changements de taille d'écran
    return () => window.removeEventListener("resize", checkMobile); // Nettoyage
  }, []);

  const handleMenuClose = () => {
    setMenuOpen(false); // Ferme le menu lorsque l'utilisateur clique sur un lien
  };

  if (!isMobile)
    // Rendu uniquement sur mobile
    return null;
  return (
    <Menu
      right
      customBurgerIcon={<img src="images/hamburger.png" alt="icon" />} // Ajout de l'icône du menu
      isOpen={menuOpen} // Ajout de l'état pour gérer l'ouverture du menu
      onStateChange={({ isOpen }) => setMenuOpen(isOpen)} // Met à jour l'état du menu lors de l'ouverture/fermeture
    >
      <Link to="tracking" onClick={handleMenuClose}>
        Suivi
      </Link>
      <Link to="quests" onClick={handleMenuClose}>
        Mes Quêtes
      </Link>
      <Link to="success" onClick={handleMenuClose}>
        Mes Succès
      </Link>
      <Link to="food" onClick={handleMenuClose}>
        Alimentation
      </Link>
      <Link to="account" onClick={handleMenuClose}>
        Mon Compte
      </Link>
      {user && (
        <button type="button" onClick={() => user.handleLogout()}>
          Se déconnecter
        </button>
      )}
    </Menu>
  );
}

export default BurgerMenu;
