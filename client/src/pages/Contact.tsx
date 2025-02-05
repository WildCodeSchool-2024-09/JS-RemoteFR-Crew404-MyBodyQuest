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
    question: "",
    probleme: "",
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
        question: "",
        probleme: "",
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
          <input
            className={style.user_informations}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <textarea
            className={style.message}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            rows={15}
            required
          />
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
