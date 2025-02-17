import { useEffect, useState } from "react";
import api from "../services/api";
import type { Success } from "../types/interface";

// Fonction pour récupérer le nom et l'image du succès débloqué
function UserSuccess() {
  const [successes, setSuccess] = useState<Success[]>([]);

  //Récupération de l'id du succès
  useEffect(() => {
    const getSuccess = async () => {
      try {
        const res = await api.get("api/success");
        const data = res.data;
        setSuccess(data);
      } catch (err) {
        console.error(err);
      }
    };
    getSuccess();
  }, []);

  return (
    <section>
      <h1>Mes Succès</h1>
      {successes.length > 0 && (
        <section>
          {successes.map((succes) => (
            <section key={succes.id}>
              <h2>{succes.name}</h2>
              <img src={succes.img} alt={succes.name} />
            </section>
          ))}
        </section>
      )}
    </section>
  );
}

export default UserSuccess;
