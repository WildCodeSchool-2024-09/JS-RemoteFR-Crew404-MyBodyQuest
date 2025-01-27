import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../styles/Contact.module.css";
import styles from "../styles/Layout.module.css";

function Contact() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [probleme, setProbleme] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <header className={styles.headercontainer}>
        <Link to="dashboard">
          <img
            className={styles.coeur}
            src="images/coeur_logo.png"
            alt="logo"
          />
          <img className={styles.logo} src="images/Logo_txt.png" alt="logo" />
        </Link>
        <img
          className={styles.avatar}
          src="images/illustration-avatar-degrade_52683-142426.avif"
          alt="avatar user"
        />
      </header>

      <main>
        <section className={style.inputContainer}>
          <input
            type="nom"
            id="nom"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className={style.userInformation}
          />
          <input
            type="prénom"
            id="prénom"
            placeholder="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className={style.userInformation}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={style.userInformation}
          />
          <input
            type="question"
            id="question"
            placeholder="Une question ?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className={style.nom}
          />
          <input
            type="problème"
            id="problème"
            placeholder="Signaler un problème"
            value={probleme}
            onChange={(e) => setProbleme(e.target.value)}
            className={style.nom}
          />
          <input
            type="message"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={style.nom}
          />
        </section>
      </main>
    </>
  );
}

export default Contact;
