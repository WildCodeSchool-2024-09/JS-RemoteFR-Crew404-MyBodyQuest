import { useState } from "react";
import avatar1 from "../assets/images/Avatar Elodie.jpg";
import avatar2 from "../assets/images/Avatar Manon.jpg";
import logo from "../assets/images/Logo site.png";
import logoAvatar from "../assets/images/avatar.png";
import logoModale from "../assets/images/coeur_logo.png";
import mail from "../assets/images/mail.png";
import mdp from "../assets/images/mdp.png";
import style from "../styles/Accueil.module.css";

function Accueil() {
  const [isConnexionOpen, setConnexionOpen] = useState(false);
  const [isCreateAccountOpen, setCreateAccountOpen] = useState(false);
  const [isModaleInscriptionOpen, setModaleInscriptionOpen] = useState(false);
  const [isMessageBienvenue, setMessageBienvenue] = useState(false);

  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");

  return (
    <>
      {/* BOUTON CONNEXION */}

      <header>
        <section className={style.logo}>
          <img src={logo} alt="logo MyBodyQuest" />
        </section>
        <button
          type="button"
          className={style.connexion}
          onClick={() => setConnexionOpen(true)}
        >
          Connexion
        </button>

        {/* MODALE CONNEXION */}

        <section
          className={`${style.modaleConnexion} ${
            isConnexionOpen ? style.active : ""
          }`}
        >
          <section className={style.modaleConnexionContent}>
            <section className={style.textlogoContainer}>
              <img
                src={logoModale}
                alt="logo coeur cardio"
                className={style.logoModale}
              />
              <h3>Se connecter</h3>
            </section>

            <section className={style.inputContainer}>
              <img
                src={mail}
                alt="Icone d'un email"
                className={style.logoMail}
              />
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={style.inputField}
              />
            </section>
            <section className={style.inputContainer}>
              <img
                src={mdp}
                alt="Icone d'un cadenas"
                className={style.logoMdp}
              />
              <input
                type="password"
                id="motdepasse"
                placeholder="Votre mot de passe"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
                className={style.inputField}
              />
            </section>
            <button type="button" className={style.buttonConnexion}>
              Connexion
            </button>

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
          </section>
        </section>

        {/* MODALE CREATION DE COMPTE */}

        <section
          className={`${style.modaleCreateAccount} ${
            isCreateAccountOpen ? style.active : ""
          }`}
        >
          <section className={style.modaleCreateAccountContent}>
            <section className={style.textlogoContainer}>
              <img
                src={logoModale}
                alt="logo coeur cardio"
                className={style.logoModale}
              />
              <h3>M'inscrire</h3>
            </section>

            <section className={style.inputContainer}>
              <img
                src={mail}
                alt="Icone d'un email"
                className={style.logoMail}
              />
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={style.inputField}
              />
            </section>

            <section className={style.inputContainer}>
              <img
                src={mdp}
                alt="Icone d'un cadenas"
                className={style.logoMdp}
              />
              <input
                type="password"
                id="motdepasse"
                placeholder="Votre mot de passe"
                value={motdepasse}
                onChange={(e) => setMotdepasse(e.target.value)}
                className={style.inputField}
              />
            </section>

            <button
              type="button"
              className={style.inscription}
              onClick={() => {
                setCreateAccountOpen(false);
                setModaleInscriptionOpen(true);
              }}
            >
              M'inscrire
            </button>

            <button
              type="button"
              className={style.closeCreateAccount}
              onClick={() => setCreateAccountOpen(false)}
            >
              Fermer
            </button>
          </section>
        </section>

        {/* MODALE D'INSCRIPTION */}
        <section
          className={`${style.modaleInscription} ${
            isModaleInscriptionOpen ? style.active : ""
          }`}
        >
          <section className={style.modaleInscriptionContent}>
            <section className={style.textlogoContainer}>
              <img
                src={logoModale}
                alt="logo coeur cardio"
                className={style.logoModale}
              />
              <h3>Questionnaire</h3>
            </section>

            <section className={style.inputContainer}>
              <input
                type="text"
                placeholder="Prénom"
                className={style.inscriptionInput}
              />
              <input
                type="text"
                placeholder="Nom"
                className={style.inscriptionInput}
              />
              <input
                type="text"
                placeholder="Date de naissance"
                className={style.inscriptionInput}
              />
              <input
                type="text"
                placeholder="Taille"
                className={style.inscriptionInput}
              />
              <input
                type="text"
                placeholder="Votre poids actuel"
                className={style.inscriptionInput}
              />{" "}
              <input
                type="text"
                placeholder="Votre poids souhaité"
                className={style.inscriptionInput}
              />
            </section>
            <section className={style.infosUserContainer}>
              <form>
                <h3>Sexe :</h3>
                <input type="radio" id="feminin" name="sexe" value="feminin" />
                <label htmlFor="feminin">Féminin</label>

                <input
                  type="radio"
                  id="masculin"
                  name="sexe"
                  value="masculin"
                />
                <label htmlFor="masculin">Masculin</label>
              </form>

              <img
                src={logoAvatar}
                alt="Icone d'un avatar pour insérer un avatar"
                className={style.logoAvatar}
              />
              <h3>Ajouter une photo</h3>

              <section className={style.objectif}>
                <form>
                  <h3>Quel est votre objectif ?</h3>

                  <input
                    type="radio"
                    id="perte"
                    name="objectif"
                    value="perte"
                  />
                  <label htmlFor="perte">Perte de poids</label>

                  <input
                    type="radio"
                    id="prise"
                    name="objectif"
                    value="prise"
                  />
                  <label htmlFor="prise">Prise de masse</label>
                </form>
              </section>
            </section>
            <button
              type="button"
              className={style.buttonInscription}
              onClick={() => {
                setMessageBienvenue(true);
                setTimeout(() => {
                  setMessageBienvenue(false);
                  setModaleInscriptionOpen(false);
                }, 3000);
              }}
            >
              Créer un compte
            </button>

            {isMessageBienvenue && (
              <section className={style.messageBienvenue}>
                <h3>Inscription validée ! Bienvenue !</h3>
              </section>
            )}
            <button
              type="button"
              className={style.closeInscription}
              onClick={() => setModaleInscriptionOpen(false)}
            >
              Fermer
            </button>
          </section>
        </section>

        {/* ENCART DE BIENVENUE */}

        <section className={style.bienvenue}>
          <h1>Bienvenue </h1>
          <h2>Une plateforme qui allie bien-être et engagement ludique</h2>
          <p>
            Ce site a été conçu pour répondre aux besoins des personnes
            souhaitant perdre du poids ou prendre de la masse en leur offrant un
            accompagnement personnalisé
          </p>
          <button
            type="button"
            className={style.questionnaire}
            onClick={() => setModaleInscriptionOpen(true)}
          >
            On fait connaissance ?
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
      </header>
    </>
  );
}

export default Accueil;
