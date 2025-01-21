import { useState } from "react";
import { Link } from "react-router-dom";
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

  const [register, setRegister] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    file: "",
    birthday_date: "",
    size: "",
    objective: "",
    initial_weight: "",
    desired_weight: "",
    weight_frequency: "",
  });

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  };

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.info(register);
    console.info(login);
  };

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
          {" "}
          Connexion{" "}
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
              <button
                type="button"
                className={style.closeConnexion}
                onClick={() => setConnexionOpen(false)}
              >
                x
              </button>
            </section>

            <form className={style.inputContainer} onSubmit={handleSubmit}>
              <img
                src={mail}
                alt="Icone d'un email"
                className={style.logoMail}
              />
              <input
                type="email"
                id="email-login"
                placeholder="Votre email"
                value={login.email}
                className={style.inputField}
                onChange={handleChangeLogin}
              />
              <img
                src={mdp}
                alt="Icone d'un cadenas"
                className={style.logoMdp}
              />
              <input
                type="password"
                id="password-login"
                placeholder="Votre mot de passe"
                value={login.password}
                className={style.inputField}
                onChange={handleChangeLogin}
              />
            </form>

            <Link to="/dashboard">
              <button type="button" className={style.buttonConnexion}>
                Connexion
              </button>
            </Link>

            <button
              type="button"
              className={style.createAccount}
              onClick={() => {
                setConnexionOpen(false);
                setModaleInscriptionOpen(true);
              }}
            >
              Créer un compte
            </button>
          </section>
        </section>

        {/* MODALE CREATION DE COMPTE */}
        <form className={style.inputContainer} onSubmit={handleSubmit}>
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
                <button
                  type="button"
                  className={style.closeCreateAccount}
                  onClick={() => setCreateAccountOpen(false)}
                >
                  x
                </button>
              </section>

              <section className={style.inputContainer}>
                <img
                  src={mail}
                  alt="Icone d'un email"
                  className={style.logoMail}
                />
                <input
                  type="email"
                  id="email-create"
                  placeholder="Votre email"
                  value={register.email}
                  name="email"
                  onChange={handleChangeRegister}
                  className={style.inputField}
                />
                <img
                  src={mdp}
                  alt="Icone d'un cadenas"
                  className={style.logoMdp}
                />
                <input
                  type="password"
                  id="password-create"
                  placeholder="Votre mot de passe"
                  value={register.password}
                  name="password"
                  onChange={handleChangeRegister}
                  className={style.inputField}
                />
              </section>

              <button
                type="button"
                className={style.buttonInscription}
                onClick={() => {
                  setMessageBienvenue(true);

                  setTimeout(() => {
                    setCreateAccountOpen(false);
                    setMessageBienvenue(false);
                  }, 3000);
                }}
              >
                M'inscrire
              </button>
              {isMessageBienvenue && (
                <section className={style.messageBienvenue}>
                  <h3>Inscription validée ! Bienvenue !</h3>
                </section>
              )}
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
              <input
                type="text"
                placeholder="Prénom"
                className={style.inscriptionInput}
                name="firstname"
                value={register.firstname}
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                placeholder="Nom"
                className={style.inscriptionInput}
                name="lastname"
                value={register.lastname}
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                placeholder="Date de naissance"
                className={style.inscriptionInput}
                name="birthday_date"
                value={register.birthday_date}
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                placeholder="Taille"
                className={style.inscriptionInput}
                name="size"
                value={register.size}
                onChange={handleChangeRegister}
              />
              <input
                type="text"
                placeholder="Votre poids actuel"
                className={style.inscriptionInput}
                name="initial_weight"
                value={register.initial_weight}
                onChange={handleChangeRegister}
              />{" "}
              <input
                type="text"
                placeholder="Votre poids souhaité"
                className={style.inscriptionInput}
                name="desired_weight"
                value={register.desired_weight}
                onChange={handleChangeRegister}
              />
              <section className={style.infosUserContainer}>
                <h3>Sexe :</h3>
                <label htmlFor="feminin">Féminin</label>
                <input
                  type="radio"
                  id="feminin"
                  name="sexe"
                  value="feminin"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="masculin">Masculin</label>
                <input
                  type="radio"
                  id="masculin"
                  name="sexe"
                  value="masculin"
                  onChange={handleChangeRegister}
                />
                <img
                  src={logoAvatar}
                  alt="Icone d'un avatar pour insérer un avatar"
                  className={style.logoAvatar}
                />
                <label htmlFor="file">Ajouter une photo</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  multiple
                  onChange={handleChangeRegister}
                />
              </section>
              <section className={style.objectif}>
                <h3>Quel est votre objectif ?</h3>
                <input
                  type="radio"
                  id="perte"
                  name="objective"
                  value="perte"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="perte">Perte de poids</label>
                <input
                  type="radio"
                  id="prise"
                  name="objective"
                  value="prise"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="prise">Prise de masse</label>
              </section>
              <button
                type="button"
                className={style.inscription}
                onClick={() => {
                  setModaleInscriptionOpen(false);
                  setCreateAccountOpen(true);
                }}
              >
                Créer un compte
              </button>
              <button
                type="button"
                className={style.closeInscription}
                onClick={() => setModaleInscriptionOpen(false)}
              >
                x
              </button>
            </section>
          </section>
        </form>

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
      </header>
    </>
  );
}

export default Accueil;
