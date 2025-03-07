import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { failed, success } from "../services/toasts";
import style from "../styles/Account.module.css";

export default function Account() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    lastname: user?.lastname || "",
    firstname: user?.firstname || "",
    email: user?.email || "",
    size: user?.size || "",
    objective: user?.objective || "",
    initial_weight: user?.initial_weight || "",
    desired_weight: user?.desired_weight || "",
    weight_frequency: user?.weight_frequency || "",
  });

  if (!user) {
    return <p>Chargement...</p>;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.put(`/api/users/${user.id}`, formData);
      if (response.status === 200) {
        success("Utilisateur bien mis à jour");
      }
    } catch (error) {
      failed("Oups, erreur server");
      console.error("error updating user:", error);
    }
  };

  return (
    <>
      <h1 className={style.acc_title}>Mon compte</h1>
      <section className={style.account}>
        <form onSubmit={handleSubmit} className={style.user}>
          <label className={style.form}>
            Nom d'utilisateur *
            <input
              type="text"
              name="username"
              value={formData.email}
              onChange={handleChange}
              className={style.input}
              id="username"
              required
            />
          </label>
          <label className={style.form}>
            Nom *
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className={style.input}
              id="lastname"
              required
            />
          </label>
          <label className={style.form}>
            Prénom *
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className={style.input}
              id="firstname"
              required
            />
          </label>
          <label className={style.form}>
            Date d'anniversaire
            <input
              type="text"
              name="birthday_date"
              value={
                user.birthday_date
                  ? new Date(user.birthday_date).toLocaleDateString()
                  : ""
              }
              onChange={handleChange}
              className={style.input}
              id="birthday_date"
            />
          </label>
          <label className={style.form}>
            Taille (centimètres) *
            <input
              type="text"
              name="size"
              value={String(formData.size)}
              onChange={handleChange}
              className={style.input}
              id="size"
              required
            />
          </label>
          <label className={style.form}>
            Poids Initial (kilogrammes) *
            <input
              type="text"
              name="original_weight"
              value={String(formData.initial_weight)}
              onChange={handleChange}
              className={style.input}
              id="original_weight"
              required
            />
          </label>
          <label className={style.form}>
            Objectif de poids (kilogrammes) *
            <input
              type="text"
              name="desired_weight"
              value={String(formData.desired_weight)}
              onChange={handleChange}
              className={style.input}
              id="desired_weight"
              required
            />
          </label>

          <button type="submit" className={style.valid}>
            Valider
          </button>
        </form>
      </section>
    </>
  );
}
