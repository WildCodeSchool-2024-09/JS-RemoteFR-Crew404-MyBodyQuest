import { useState } from "react";
import { TbCirclePlusFilled } from "react-icons/tb";
import mesures from "../assets/images/Mesures.jpg";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { failed, success } from "../services/toasts";
import style from "../styles/Tracking.module.css";

function NewTracking() {
  const [isNewEntryOpen, setNewEntryOpen] = useState(false);
  const { user } = useAuth();
  const [newTracking, setNewTracking] = useState({
    entryDate: "",
    waistline: "",
    thighCircumference: "",
    chestMeasurement: "",
    buttocksCircumference: "",
    hipCircumference: "",
    calfCircumference: "",
    weight: "",
    comments: "",
  });
  const handleChangeNewTracking = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewTracking((prevNewTracking) => ({
      ...prevNewTracking,
      [name]: value,
    }));
  };

  const handleSubmitNewTracking = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (user) {
      const trackingData = { ...newTracking, user_id: user.id };
      console.info(trackingData);
      try {
        const response = await api.post("/api/trackings", trackingData);
        if (response.status === 201) {
          setNewEntryOpen(false);
          success("Nouvelle entrée ajoutée !");
        }
      } catch (error) {
        failed("Erreur lors de l'ajout de la nouvelle entrée");
      }
    } else {
      failed("Utilisateur non authentifié");
    }
  };

  return (
    <>
      <section
        className={`${style.modaleNewEntry} ${
          isNewEntryOpen ? style.active : ""
        }`}
      >
        <section className={style.modaleNewEntryContent}>
          <form
            className={style.newEntryContainer}
            onSubmit={handleSubmitNewTracking}
          >
            <label htmlFor="newEntryDate">
              Choisir la date
              <input
                className={style.dateInput}
                type="date"
                name="entryDate"
                value={newTracking.entryDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleChangeNewTracking}
              />
            </label>
            <img src={mesures} alt="Mesures" className={style.mesures} />
            <h3 className="newEntryValue"> Valeurs</h3>
            <label htmlFor="waistline">
              Tour de taille
              <input
                type="number"
                placeholder="cm"
                name="waistline"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.waistline}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="thigh-circumference">
              Tour de cuisses
              <input
                type="number"
                placeholder="cm"
                name="thighCircumference"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.thighCircumference}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="chest-measurement">
              Tour de poitrine
              <input
                type="number"
                placeholder="cm"
                name="chestMeasurement"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.chestMeasurement}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="buttocks-circumference">
              Tour de fesses
              <input
                type="number"
                placeholder="cm"
                name="buttocksCircumference"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.buttocksCircumference}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="hip-circumference">
              Tour de hanches
              <input
                type="number"
                placeholder="cm"
                name="hipCircumference"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.hipCircumference}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="calf-circumference">
              Tour de mollets
              <input
                type="number"
                placeholder="cm"
                name="calfCircumference"
                step="0.01"
                min="0"
                max="200"
                value={newTracking.calfCircumference}
                onChange={handleChangeNewTracking}
              />
            </label>
            <label htmlFor="weight">
              Poids
              <input
                type="number"
                placeholder="kg"
                name="weight"
                step="0.01"
                min="0"
                max="250"
                value={newTracking.weight}
                onChange={handleChangeNewTracking}
              />
            </label>

            <label htmlFor="notes">
              Notes / commentaires
              <input
                type="text"
                placeholder="Commentaires"
                name="comments"
                value={newTracking.comments}
                onChange={handleChangeNewTracking}
              />
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
        <TbCirclePlusFilled size={50} color="#7b5cb9" />
      </button>
    </>
  );
}

export default NewTracking;
