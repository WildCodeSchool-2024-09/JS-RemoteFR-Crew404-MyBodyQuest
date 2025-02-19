import Login from "../components/Login";
import Register from "../components/Register";

import { useState } from "react";

import balance from "../../public/images/balance.png";
import metre_ruban from "../../public/images/metre_ruban.png";
import progress_bar from "../../public/images/progress_bar.png";
import xp_img from "../../public/images/xp_img.png";
import Footer from "../components/Footer";
import style from "../styles/Accueil.module.css";

function Accueil() {
  const [isModaleInscriptionOpen, setModaleInscriptionOpen] = useState(false);
  const [isConnexionOpen, setConnexionOpen] = useState(false);
  return (
    <>
      <main className={style.pageAccueil}>
        <Login
          setModaleInscriptionOpen={setModaleInscriptionOpen}
          setConnexionOpen={setConnexionOpen}
          isConnexionOpen={isConnexionOpen}
        />
        <Register
          isModaleInscriptionOpen={isModaleInscriptionOpen}
          setModaleInscriptionOpen={setModaleInscriptionOpen}
          setConnexionOpen={setConnexionOpen}
        />
        {/* ENCART DE BIENVENUE */}
        <section className={style.bienvenue}>
          <h1 className={style.titleh1}>Bienvenue</h1>
          <h2 className={style.titleh2}>
            Une plateforme qui allie bien-être et engagement ludique
          </h2>
          <section className={style.introSuivi}>
            <h3 className={style.intro}>
              Ce site a été conçu pour répondre aux besoins des personnes
              souhaitant perdre du poids ou prendre de la masse
              <br />
              en leur offrant un accompagnement personnalisé
            </h3>

            <img
              src={metre_ruban}
              alt="img_mètre_ruban"
              className={style.imgMetreRuban}
            />
            <section>
              <ul className={style.lists}>
                <li className={style.listItem}>
                  Suivi avec courbe de progression
                </li>
                <li className={style.listItem}>Statistiques personnalisées</li>
                <li className={style.listItem}>Un maximum de recettes</li>
              </ul>
            </section>
            <img src={balance} alt="img_balance" className={style.balance} />

            <h3 className={style.intro}>
              Et une approche ludique qui rend chaque étape motivante et
              gratifiante
            </h3>
            <img src={xp_img} alt="xp_img" className={style.xp_img} />
            <section>
              <ul className={style.lists}>
                <li className={style.listItem}>Des quêtes à relever</li>
                <li className={style.listItem}>Des niveaux à atteindre</li>
              </ul>
            </section>
            <img
              src={progress_bar}
              alt="progress_bar"
              className={style.progress_bar}
            />
          </section>
          <section className={style.buttonContainer}>
            <button
              type="button"
              className={style.questionnaire}
              onClick={() => setModaleInscriptionOpen(true)}
            >
              Faisons connaissance
            </button>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Accueil;
