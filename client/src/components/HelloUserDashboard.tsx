import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  firstname: string;
}

// Fonction pour récupérer le prénom de l'utilisateur et lui souhaiter la bienvenue
function HelloUserDashboard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  //Récupération de l'id utilisateur
  useEffect(() => {
    const fetchHelloUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
        );
        setUser(response.data.firstname);
      } catch (err) {
        setError("Utilisateur inconnu");
        console.error(err);
      }
    };

    fetchHelloUser();
  }, [userId]);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    // Si l'utilisateur existe, son prénom s'affiche, sinon "Utilisateur" s'affiche.
    <h1>Bonjour {user ? user.firstname : "Utilisateur"}</h1>
  );
}

export default HelloUserDashboard;
