import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoAvatar from "../assets/images/avatar.png";
import logoModale from "../assets/images/coeur_logo.png";
import mail from "../assets/images/mail.png";
import mdp from "../assets/images/mdp.png";
import api from "../services/api";
import { failed, success } from "../services/toasts";
import style from "../styles/Accueil.module.css";

interface RegisterProps {
  isModaleInscriptionOpen: boolean;
  setModaleInscriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register({
  isModaleInscriptionOpen,
  setModaleInscriptionOpen,
}: RegisterProps) {
  const nav = useNavigate();
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

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
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
  return (
    <>
      {/* MODALE D'INSCRIPTION */}
      {isModaleInscriptionOpen && (
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
      )}
    </>
  );
}

export default Register;
