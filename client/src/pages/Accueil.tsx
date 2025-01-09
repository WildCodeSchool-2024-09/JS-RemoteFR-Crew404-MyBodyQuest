import { useState } from "react";
import avatar1 from "../assets/images/Avatar Elodie.jpg";
import avatar2 from "../assets/images/Avatar Manon.jpg";
import logo from "../assets/images/Logo site.png";
import style from "../styles/Accueil.module.css";

function Accueil() {
  const [isConnexionOpen, setConnexionOpen] = useState(false);
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);
  const [isModaleInscriptionOpen, setModaleInscriptionOpen] = useState(false);
  return (
    <>
      {/* BOUTON CONNEXION */}

      <header>
        <div className={style.logo}>
          <img src={logo} alt="logo MyBodyQuest" />
        </div>
        <button
          type="button"
          className={style.connexion}
          onClick={() => setConnexionOpen(true)}
        >
          Connexion
        </button>

        {/* MODALE CONNEXION */}
        <div
          className={`${style.modaleConnexion} ${
            isConnexionOpen ? style.active : ""
          }`}
        >
          <div className={style.modaleConnexionContent}>
            <h2>Se connecter</h2>
            <p>Votre email</p>
            <p>Votre mot de passe</p>

            <button
              type="button"
              className={style.createAccount}
              onClick={() => {
                setConnexionOpen(false);
                setCreateAccountOpen(true);
              }}
            >
              Créer un compte
            </button>

            <button
              type="button"
              className={style.closeConnexion}
              onClick={() => setConnexionOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>

        {/* MODALE CRÉATION DE COMPTE */}

        <div
          className={`${style.modaleCreateAccount} ${
            isCreateAccountOpen ? style.active : ""
          }`}
        >
          <div className={style.modaleCreateAccountContent}>
            <h2>M'inscrire</h2>
            <p>Votre email</p>
            <p>Votre mot de passe</p>
            <button
              type="button"
              className={style.inscription}
              onClick={() => {
                setCreateAccountOpen(false);
                setModaleInscriptionOpen(true);
              }}
            >
              Inscription
            </button>
            <button
              type="button"
              className={style.closeCreateAccount}
              onClick={() => setCreateAccountOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>

        {/* MODALE INSCRIPTION */}
        <div
          className={`${style.modaleInscription} ${
            isModaleInscriptionOpen ? style.active : ""
          }`}
        >
          <div className={style.modaleInscriptionContent}>
            <h2>Faisons connaissance!</h2>

            <input
              type="text"
              placeholder="Prénom"
              className={style.inscriptionInput}
            />

            <button
              type="button"
              className={style.closeInscription}
              onClick={() => setModaleInscriptionOpen(false)}
            >
              Fermer
            </button>
          </div>
        </div>

        {/* ENCART DE BIENVENUE */}

        <div className={style.bienvenue}>
          <h1>Bienvenue </h1>
          <h2>Une plateforme qui allie bien-être et engagement ludique</h2>
          <p>
            Ce site a été conçu pour répondre aux besoins des personnes
            souhaitant perdre du poids ou prendre de la masse en leur offrant un
            accompagnement personnalisé
          </p>
          <button type="button" className={style.questionnaire}>
            Faire le questionnaire
          </button>
        </div>

        {/* CARD D'AVIS USER */}

        <div className={style.conteneur_avis}>
          <div className={style.card_avis}>
            <h3 className={style.note_avis}>3 étoiles</h3>
            <img src={avatar1} alt="avatar user" className={style.avatar} />
            <h4 className={style.titre_avis}>Ceci est le titre de l'avis</h4>
            <p className={style.name_lastname}>John Doe</p>
            <p className={style.date_avis}>09/01/2025</p>
            <p className={style.avis}>Ceci est l'avis de l'utilisateur</p>
          </div>

          <div className={style.card_avis}>
            <h3 className={style.note_avis}>5 étoiles</h3>
            <img src={avatar2} alt="avatar user" className={style.avatar} />
            <h4 className={style.titre_avis}>Ceci est le titre de l'avis</h4>
            <p className={style.name_lastname}>Jane Doe</p>
            <p className={style.date_avis}>10/01/2025</p>
            <p className={style.avis}>Ceci est l'avis de l'utilisateur.</p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Accueil;
