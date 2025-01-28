import { useState } from "react";
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
      const response = await fetch("http://localhost:3310/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destinataire: formData.email,
          subject: "Contact depuis le site web",
          content: `Nom : ${formData.nom}\nPrénom : ${formData.prenom}\nMessage : ${formData.message}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'envoi du mail.");
      }

      const result = await response.json();
      alert(result.message);

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        question: "",
        probleme: "",
        message: "",
      });
      alert("Message envoyé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Échec de l'envoi du message.");
    }
  };

  return (
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
      />
      <button type="submit" className={style.button}>
        Une question ?
      </button>
      <button type="submit" className={style.button}>
        {" "}
        Signaler un problème{" "}
      </button>
      <textarea
        className={style.message}
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />{" "}
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default Contact;
