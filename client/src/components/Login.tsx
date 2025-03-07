import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { failed, success } from "../services/toasts"; // Ensure this path is correct or update it to the correct path

import logo from "../assets/images/Logo site.png";
import logoModale from "../assets/images/coeur_logo.png";
import api from "../services/api";
import style from "../styles/Accueil.module.css";

interface RegisterProps {
  setModaleInscriptionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setConnexionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConnexionOpen: boolean;
}

function Login({
  setModaleInscriptionOpen,
  setConnexionOpen,
  isConnexionOpen,
}: RegisterProps) {
  const { handleLogin } = useAuth();
  const nav = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //empeche rechargement page
    try {
      const response = await api.post("/api/login", login);
      //si le mail password correspondent je redirige vers dashboard
      if (response.status === 200) {
        const firstname = response.data.firstname;
        success(`Bonjour ${firstname} !`);
        nav("/dashboard");
        handleLogin(response.data);
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
              <section className={style.inputconnexion}>
                <IoMail size={15} />
                <input
                  type="email"
                  id="email-login"
                  name="email"
                  placeholder="Votre email"
                  value={login.email}
                  className={style.inputField}
                  onChange={handleChangeLogin}
                />
              </section>
              <section className={style.inputconnexion2}>
                <FaLock className={style.logoMdp} size={15} />
                <input
                  type="password"
                  name="password"
                  id="password-login"
                  placeholder="Votre mot de passe"
                  value={login.password}
                  className={style.inputField}
                  onChange={handleChangeLogin}
                />
              </section>
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
      </main>
    </>
  );
}

export default Login;
