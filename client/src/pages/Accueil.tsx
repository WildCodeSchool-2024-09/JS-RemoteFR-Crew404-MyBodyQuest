import logo from "../assets/images/Logo site.png";
import style from "../styles/Accueil.module.css";

function Accueil() {
  return (
    <>
      <header>
        <div className={style.logo}>
          <img src={logo} alt="logo MyBodyQuest" />
        </div>
        <button type="button" className={style.connexion}>
          Connexion
        </button>
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
      </header>
    </>
  );
}

export default Accueil;
