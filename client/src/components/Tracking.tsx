import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import { TbCirclePlusFilled } from "react-icons/tb";
import style from "../styles/Tracking.module.css";

import Chart from "./Chart";

function Tracking() {
  const [isDataTypeOpen, setIsDataTypeOpen] = useState(false); // détermine si la liste données est ouverte
  const [isPeriodOpen, setIsPeriodOpen] = useState(false); // détermine si la liste période est ouverte
  const handleClickDataType = () => setIsDataTypeOpen((prev) => !prev); // Fonction qui inverse la valeur du state
  const handleClickPeriod = () => setIsPeriodOpen((prev) => !prev); // Fonction qui inverse la valeur du state
  const handleOptionDataType = () => setIsDataTypeOpen(false); // Fonction qui passe le state en false (fermé) après choix option
  const handleOptionPeriod = () => setIsPeriodOpen(false); // Fonction qui passe le state en false (fermé) après choix option
  const optionsData = ["Poids", "Mesures"]; // Const avec les choix de données à afficher
  const optionsPeriod = ["du", "au"]; // Const avec les choix de période à afficher

  return (
    <>
      <section className={style.ButtonsSection}>
        <button
          type="button"
          onClick={handleClickDataType}
          className={style.toggleButton}
        >
          Type de données <AiFillCaretDown />
        </button>
        {isDataTypeOpen && (
          <ul className={style.optionsList}>
            {optionsData.map((option) => (
              <li key={option} className={style.optionItem}>
                <span
                  onClick={handleOptionDataType}
                  onKeyUp={handleOptionDataType}
                  className={style.option}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          className={style.toggleButton}
          onClick={handleClickPeriod}
        >
          Période <SlCalender /> <AiFillCaretDown />
        </button>
        {isPeriodOpen && (
          <ul className={style.optionsList}>
            {optionsPeriod.map((option) => (
              <li key={option} className={style.optionItem}>
                <span
                  onClick={handleOptionPeriod}
                  onKeyUp={handleOptionPeriod}
                  className={style.option}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        )}
        <button type="button" className={style.modifyButton}>
          Modifier mes données
        </button>
      </section>
      <section className={style.GraphSection}>
        <Chart />
      </section>
      <section className={style.NewEntrySection}>
        <button type="button" className={style.NewEntryButton}>
          <TbCirclePlusFilled size={30} />
        </button>
      </section>
    </>
  );
}

export default Tracking;
