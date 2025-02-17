import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";

import logoModale from "../assets/images/coeur_logo.png";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { failed, success } from "../services/toasts";
import style from "../styles/Accueil.module.css";

interface RegisterProps {
  isModaleInscriptionOpen: boolean;
  setModaleInscriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConnexionOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Register({
  isModaleInscriptionOpen,
  setModaleInscriptionOpen,
  setConnexionOpen,
}: RegisterProps) {
  const { handleRegister } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [register, setRegister] = useState({
    id: 0,
    firstname: "",
    lastname: "",
    avatar: "",
    birthday_date: "",
    size: 0,
    initial_weight: 0,
    desired_weight: 0,
    weight_frequency: "",
    sexe: "",
    objective: "",
    email: "",
    password: "",
    current_xp: 0,
    level: 1,
  });

  const handleChangeRegister = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  //Etape pour push l'image sur le réseau

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
    }
    formData.append("register", JSON.stringify(register));
    try {
      const response = await api.post("/api/register", formData); // Envoi des données du formulaire d'inscription à l'API
      if (response.status === 201) {
        handleRegister(register);
        success(`Bonjour ${register.firstname}, ton compte a bien été créé !`);
        setTimeout(() => {
          setModaleInscriptionOpen(false);
          setConnexionOpen(true);
        }, 1000);
      } else {
        failed(
          "Erreur lors de la création de votre compte. Veuillez réessayer.",
        );
      }
    } catch (error) {
      console.error("Erreur API : ", error);
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
                type="date"
                placeholder="Date de naissance"
                className={style.inscriptionInput}
                name="birthday_date"
                value={register.birthday_date}
                onChange={handleChangeRegister}
              />
              <section className={style.size}>
                <input
                  type="number"
                  placeholder="Taille"
                  className={style.inscriptionInput}
                  name="size"
                  value={register.size}
                  onChange={handleChangeRegister}
                />
              </section>
              <section className={style.weight}>
                <input
                  type="number"
                  placeholder="Votre poids actuel"
                  className={style.inscriptionInput}
                  name="initial_weight"
                  value={register.initial_weight}
                  onChange={handleChangeRegister}
                />
                <input
                  type="number"
                  placeholder="Votre poids souhaité"
                  className={style.inscriptionInput}
                  name="desired_weight"
                  value={register.desired_weight}
                  onChange={handleChangeRegister}
                />
              </section>
              <select
                className={style.inscriptionInput}
                name="weight_frequency"
                id="weight_frequency"
                onChange={handleChangeRegister}
              >
                <option value="">Choisissez une fréquence de pesée</option>
                <option value="1">1 fois/semaine</option>
                <option value="2">1 fois/2 semaines</option>
              </select>
              <section className="sexe">
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
              </section>
              <section className={style.infosUserContainer}>
                {previewImage ? (
                  <img
                    src={previewImage}
                    className={style.logoAvatar}
                    alt="Prévisualisation de l'image"
                  />
                ) : (
                  <RxAvatar size={60} />
                )}
                <label htmlFor="file">Ajouter une photo</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </section>
              <section className={style.objectif}>
                <h3 className={style.titleh3}>Quel est votre objectif ?</h3>
                <label htmlFor="perte">
                  <input
                    className={style.input}
                    type="radio"
                    id="perte"
                    name="objective"
                    value="perte"
                    onChange={handleChangeRegister}
                  />
                  Perte de poids
                </label>
                <label htmlFor="prise">
                  <input
                    className={style.input}
                    type="radio"
                    id="prise"
                    name="objective"
                    value="prise"
                    onChange={handleChangeRegister}
                  />
                  Prise de masse
                </label>
              </section>
              <section className={style.inputContainer}>
                <IoMail size={15} />
                <input
                  type="email"
                  id="email-create"
                  placeholder="Votre email"
                  value={register.email}
                  name="email"
                  onChange={handleChangeRegister}
                  className={style.inputField}
                />
                <FaLock size={15} />
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
