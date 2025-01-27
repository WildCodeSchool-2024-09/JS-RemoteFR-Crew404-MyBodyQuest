import Login from "../components/Login";
import Register from "../components/Register";

import { useState } from "react";

import avatar1 from "../assets/images/Avatar Elodie.jpg";
import avatar2 from "../assets/images/Avatar Manon.jpg";
import style from "../styles/Accueil.module.css";

function Accueil() {
  const [isModaleInscriptionOpen, setModaleInscriptionOpen] = useState(false);
  return (
    <>
      <main className={style.pageAccueil}>
        <Login setModaleInscriptionOpen={setModaleInscriptionOpen} />
        <Register
          isModaleInscriptionOpen={isModaleInscriptionOpen}
          setModaleInscriptionOpen={setModaleInscriptionOpen}
        />
        {/* ENCART DE BIENVENUE */}
        <section className={style.bienvenue}>
          <h1 className={style.titleh1}>Bienvenue </h1>
          <h2 className={style.titleh2}>
            Une plateforme qui allie bien-être et engagement ludique
          </h2>
          <p className={style.intro}>
            Ce site a été conçu pour répondre aux besoins des personnes
            souhaitant perdre du poids <br />
            ou prendre de la masse en leur offrant un accompagnement
            personnalisé.
          </p>
          <button
            type="button"
            className={style.questionnaire}
            onClick={() => setModaleInscriptionOpen(true)}
          >
            Faisons connaissance
          </button>
        </section>

        {/* CARD D'AVIS USER */}

        <section className={style.conteneur_avis}>
          <section className={style.card_avis}>
            <h3 className={style.note_avis}>3 étoiles</h3>
            <img
              src={avatar1}
              alt="avatar de l'utilisateur"
              className={style.avatar}
            />
            <h4 className={style.titre_avis}>Ceci est le titre de l'avis</h4>
            <p className={style.name_lastname}>John Doe</p>
            <p className={style.date_avis}>09/01/2025</p>
            <p className={style.avis}>Ceci est l'avis de l'utilisateur</p>
          </section>

          <section className={style.card_avis}>
            <h3 className={style.note_avis}>5 étoiles</h3>
            <img
              src={avatar2}
              alt="avatar de l'utilisateur"
              className={style.avatar}
            />
            <h4 className={style.titre_avis}>Ceci est le titre de l'avis</h4>
            <p className={style.name_lastname}>Jane Doe</p>
            <p className={style.date_avis}>10/01/2025</p>
            <p className={style.avis}>Ceci est l'avis de l'utilisateur.</p>
          </section>
        </section>
      </main>
    </>
  );
}

export default Accueil;
