import { useState } from "react";
import DatePicker from "react-datepicker";
import { FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import style from "../styles/Tracking.module.css";
import "../styles/DatePicker.css";
import "react-datepicker/dist/react-datepicker.css"; // Styles de base pour le calendrier

import Chart from "./Chart";
import NewTracking from "./NewTracking";

function Tracking() {
  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([null, null]); // Gère la plage de dates sélectionnée
  const [startDate, endDate] = selectedRange;
  const [selectedDataType, setSelectedDataType] = useState<string>("Poids"); // Gère le type de données sélectionné

  const optionsData = [
    "Poids",
    "Tour de taille",
    "Tour de poitrine",
    "Tour de hanches",
    "Tour de fesses",
    "Tour de cuisses",
    "Tour de mollet",
    "Tour de fesses",
  ]; // Const avec les choix de données à afficher

  const handleDataTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedDataType(event.target.value); // Met à jour la valeur sélectionnée
  };

  const nav = useNavigate();

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
      </section>
      <section className={style.GraphSection}>
        <Chart
          selectedDataType={selectedDataType}
          selectedRange={selectedRange}
        />
      </section>
      <section className={style.buttonsData}>
        <NewTracking />
        <button
          type="button"
          className={style.modifyButton}
          onClick={() => nav("/tracking/data")}
        >
          <FaPencilAlt size={10} /> Modifier mes données
        </button>
      </section>
    </>
  );
}

export default Tracking;
