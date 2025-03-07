import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../services/api";
import { failed, success } from "../services/toasts";
import style from "../styles/Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await api.post("/api/mail", {
        destinataire: formData.email,
        subject: "Contact depuis le site web",
        content: `\nMessage : ${formData.message}`,
      });

      if (response.status !== 200) {
        throw new Error("Une erreur est survenue lors de l'envoi du mail.");
      }

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        message: "",
      });
      success("Message envoyé avec succès !");
    } catch (error) {
      console.error(error);
      failed("Échec de l'envoi du message.");
    }
  };

  return (
    <>
      <Header />
      <main>
        <form className={style.inputContainer} onSubmit={handleSubmit}>
          <h1 className={style.pageTitle}>Contact</h1>
          {/* Nom Prénom */}
          <div className={style.inputGroup}>
            <input
              className={style.user_informations}
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom"
            />
            <input
              className={style.user_informations}
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Prénom"
            />
          </div>
          {/* Email */}
          <input
            className={style.user_informationsEmail}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          {/* Message */}
          <textarea
            className={style.message}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Votre message"
            rows={15}
            required
          />
          {/* Envoyer */}
          <button className={style.submit_button} type="submit">
            Envoyer
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default Contact;
