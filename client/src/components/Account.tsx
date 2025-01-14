import style from "../styles/Account.module.css";

export default function Account() {
  return (
    // --------------------------liste des formulaires utilisateurs------------------------------

    <section className={style.account}>
      <form action="" method="get" className={style.user}>
        <label className={style.form}>
          Nom d'utilisateur * :
          <input
            type="text"
            name="username"
            className={style.input}
            id="username"
            required
          />
        </label>
        <label className={style.form}>
          Nom * :
          <input
            type="text"
            name="lastname"
            className={style.input}
            id="lastname"
            required
          />
        </label>
        <label className={style.form}>
          Prénom * :
          <input
            type="text"
            name="firstname"
            className={style.input}
            id="firstname"
            required
          />
        </label>
        <label className={style.form}>
          Date d'anniversaire :
          <input type="text" name="date" className={style.input} id="date" />
        </label>
        <label className={style.form}>
          Age :
          <input type="text" name="age" className={style.input} id="age" />
        </label>
        <label className={style.form}>
          Taille * :
          <input
            type="text"
            name="size"
            className={style.input}
            id="size"
            required
          />
        </label>
        <label className={style.form}>
          Poids Initial * :
          <input
            type="text"
            name="original_weight"
            className={style.input}
            id="original_weight"
            required
          />
        </label>
        <label className={style.form}>
          Objectif de poids * :
          <input
            type="text"
            name="desired_weight"
            className={style.input}
            id="desired_weight"
            required
          />
        </label>

        <section className={style.frequency}>
          <p>Fréquence de pesée</p>
          <button type="button" className={style.oneweek}>
            1 fois/sem
          </button>
          <button type="button" className={style.twoweek}>
            1 fois/2sem
          </button>
        </section>

        <button type="button" className={style.notif}>
          Paramètres de notification
        </button>
        <button type="button" className={style.pass}>
          Modifier mon mot de passe
        </button>

        <button type="button" className={style.valid}>
          Valider
        </button>
      </form>
    </section>
  );
}
