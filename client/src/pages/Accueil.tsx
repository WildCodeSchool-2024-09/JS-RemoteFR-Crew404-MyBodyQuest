import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { failed, success } from "../services/toasts";

import avatar1 from "../assets/images/Avatar Elodie.jpg";
import avatar2 from "../assets/images/Avatar Manon.jpg";
import logo from "../assets/images/Logo site.png";
import logoAvatar from "../assets/images/avatar.png";
import logoModale from "../assets/images/coeur_logo.png";
import mail from "../assets/images/mail.png";
import mdp from "../assets/images/mdp.png";
import api from "../services/api";
import style from "../styles/Accueil.module.css";

function Accueil() {
  const nav = useNavigate();

  const [isConnexionOpen, setConnexionOpen] = useState(false);
  const [isModaleInscriptionOpen, setModaleInscriptionOpen] = useState(false);
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

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const response = await api.post("/api/register", register); // Envoi des données du formulaire d'inscription à l'API     // si le user est bien créé message succes de toastify
      if (response.status === 201) {
        success(`Bonjour ${register.firstname}, ton compte a bien été créé !`);
        setTimeout(() => {
          //Redirection apres 3sec vers dashboard
          nav("/dashboard");
        }, 3000);
      }
    } catch (error) {
      failed("Erreur lors de la création de votre compte. Veuillez réessayer.");
    }
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //empeche rechargement page
    try {
      const response = await api.post("/api/login", login);
      //si le mail password correspondent je redirige vers dashboard
      if (response.status === 200) {
        success(`Bonjour ${register.firstname} !`);
        nav("/dashboard");
      }
    } catch (error) {
      failed("Email ou mot de passe invalide. Veuillez réessayer.");
    }
  };

  return (
    <>
      {/* BOUTON CONNEXION */}

      <header className={style.headercontainer}>
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
      </header>
      {/* MODALE CONNEXION */}
      <main className={style.pageAccueil}>
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
              <h3 className={style.titleh3}>Se connecter</h3>
              <button
                type="button"
                className={style.closeConnexion}
                onClick={() => setConnexionOpen(false)}
              >
                x
              </button>
            </section>

            <form className={style.inputContainer} onSubmit={handleSubmitLogin}>
              <img
                src={mail}
                alt="Icone d'un email"
                className={style.logoMail}
              />
              <input
                type="email"
                id="email-login"
                name="email"
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
                name="password"
                id="password-login"
                placeholder="Votre mot de passe"
                value={login.password}
                className={style.inputField}
                onChange={handleChangeLogin}
              />
              <button type="submit" className={style.buttonConnexion}>
                Connexion
              </button>
            </form>

            <button
              type="button"
              className={style.buttoncreateAccount}
              onClick={() => {
                setConnexionOpen(false);
                setModaleInscriptionOpen(true);
              }}
            >
              Créer un compte
            </button>
          </section>
        </section>

        {/* MODALE D'INSCRIPTION */}
        <form className={style.inputContainer} onSubmit={handleSubmitRegister}>
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
                <h3 className={style.titleh3}>Questionnaire</h3>
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
              <input
                type="text"
                placeholder="Fréquence de pesée"
                className={style.inscriptionInput}
                name="weight_frequency"
                value={register.weight_frequency}
                onChange={handleChangeRegister}
              />
              <section className={style.infosUserContainer}>
                <h3 className={style.titleh3}>Sexe :</h3>
                <label htmlFor="Féminin">Féminin</label>
                <input
                  className={style.input}
                  type="radio"
                  id="Féminin"
                  name="sexe"
                  value="Féminin"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="Masculin">Masculin</label>
                <input
                  className={style.input}
                  type="radio"
                  id="Masculin"
                  name="sexe"
                  value="Masculin"
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
                <h3 className={style.titleh3}>Quel est votre objectif ?</h3>
                <input
                  className={style.input}
                  type="radio"
                  id="perte"
                  name="objective"
                  value="perte"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="perte">Perte de poids</label>
                <input
                  className={style.input}
                  type="radio"
                  id="prise"
                  name="objective"
                  value="prise"
                  onChange={handleChangeRegister}
                />
                <label htmlFor="prise">Prise de masse</label>
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
              <button type="submit" className={style.inscription}>
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
