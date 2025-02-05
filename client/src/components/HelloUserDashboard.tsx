import { useAuth } from "../context/AuthContext";

// Fonction pour récupérer le prénom de l'utilisateur et lui souhaiter la bienvenue
function HelloUserDashboard() {
  const userContext = useAuth();
  //Récupération de l'id utilisateur

  return (
    <div>
      <h1>Bienvenue {userContext.user?.firstname || "Utilisateur"} !</h1>
      {/* Affichage du prénom de l'utilisateur */}
    </div>
  );
}

export default HelloUserDashboard;
