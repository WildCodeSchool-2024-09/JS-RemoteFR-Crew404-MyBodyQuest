import { useState } from "react";
import DatePicker from "react-datepicker";
import { TbCirclePlusFilled } from "react-icons/tb";
import style from "../styles/Tracking.module.css";
import "../styles/DatePicker.css";
import "react-datepicker/dist/react-datepicker.css"; // Styles de base pour le calendrier
import { FaPencilAlt } from "react-icons/fa";
import mesures from "../assets/images/Mesures.jpg";

import Chart from "./Chart";

function Tracking() {
  const [selectedDataType, setSelectedDataType] = useState(""); // Gère le type de données sélectionné
  //const [selectedPeriod, setSelectedPeriod] = useState(""); // Gère la période sélectionnée
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]); // Gère la plage de dates sélectionnée
  const [startDate, endDate] = selectedRange;
  const [isNewEntryOpen, setNewEntryOpen] = useState(false);

  const optionsData = [
    "Poids",
    "Mesures",
    "Tour de taille",
    "Tour de poitrine",
    "Tour de hanches",
    "Tour de bras",
    "Tour de cuisses",
    "Tour de mollet",
  ]; // Const avec les choix de données à afficher

  const handleDataTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDataType(event.target.value); // Met à jour la valeur sélectionnée
  };

  return (
    <>
      <section className={style.ButtonsSection}>
        <select
          id="dataTypeSelect"
          value={selectedDataType}
          onChange={handleDataTypeChange}
          className={style.toggleButton}
        >
          <option value="" disabled>
            Type de données
          </option>
          {optionsData.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <DatePicker
          selectsRange={true} // Active la sélection d'une plage de dates
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setSelectedRange(update)} // Met à jour la plage sélectionnée
          isClearable={true} // Ajoute un bouton pour effacer la sélection
          placeholderText="Période"
        />

        <button type="button" className={style.modifyButton}>
          <FaPencilAlt /> Modifier mes données
        </button>
      </section>
      <section className={style.GraphSection}>
        <Chart />
      </section>
      <section
        className={`${style.modaleNewEntry} ${
          isNewEntryOpen ? style.active : ""
        }`}
      >
        <section className={style.modaleNewEntryContent}>
          <form className={style.newEntryContainer}>
            <label htmlFor="newEntryDate">
              Choisir la date
              <input type="date" name="entrydate" />
            </label>
            <img src={mesures} alt="Mesures" className={style.mesures} />
            <h3 className="newEntryValue"> Valeurs</h3>
            <label htmlFor="waistline">
              Tour de taille
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="thigh-circumference">
              Tour de cuisses
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="chest-measurement">
              Tour de poitrine
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="buttocks-circumference">
              Tour des fesses
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="hip-circumference">
              Tour de hanches
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="calf-circumference">
              Tour de mollets
              <input
                type="number"
                placeholder="cm"
                step="0.1"
                min="0"
                max="200"
              />
            </label>
            <label htmlFor="weight">
              Poids
              <input
                type="number"
                placeholder="kg"
                step="0.1"
                min="0"
                max="250"
              />
            </label>

            <label htmlFor="weight">
              Notes / commentaires
              <input type="text" placeholder="Commentaires" />
            </label>

            <input type="submit" value="valider" />
          </form>
          <button
            type="button"
            className={style.closeModaleNewEntry}
            onClick={() => setNewEntryOpen(false)}
          >
            x
          </button>
        </section>
      </section>
      <button
        type="button"
        className={style.NewEntryButton}
        onClick={() => {
          setNewEntryOpen(true);
        }}
      >
        <TbCirclePlusFilled size={30} />
      </button>
    </>
  );
}

export default Tracking;
