export default function Account() {
  return (
    // --------------------------liste des formulaires utilisateurs------------------------------

    <section className="Account">
      <form action="" method="get" className="User">
        <label>
          Nom d'utilisateur * :
          <input type="text" name="username" id="username" required />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="Name">
        <label>
          Nom * :
          <input type="text" name="name" id="name" required />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="firstname">
        <label>
          Prénom * :
          <input type="text" name="firstname" id="firstname" required />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="birthday_date">
        <label>
          Date d'anniversaire :
          <input type="text" name="birthday_date" id="birthday_date" />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="age">
        <label>
          Age :
          <input type="text" name="age" id="age" />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="size">
        <label>
          Taille * :
          <input type="text" name="size" id="size" required />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="original_weight">
        <label>
          Poids Initial * :
          <input
            type="text"
            name="woriginal_weight"
            id="original_weight"
            required
          />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <form action="" method="get" className="desired_weight">
        <label>
          Objectif de poids * :
          <input
            type="text"
            name="desired_weight"
            id="desired_weight"
            required
          />
        </label>
        <button type="button">modifier</button>
      </form>

      {/*---------------------------------------------------------- */}

      <p>Fréquence de pesée</p>
      <button type="button">1 fois/sem</button>
      <button type="button">1 fois/2sem</button>

      {/*---------------------------------------------------------- */}

      <button type="button">Paramètres de notification</button>
      <button type="button">Modifier mon mot de passe</button>
    </section>
  );
}
