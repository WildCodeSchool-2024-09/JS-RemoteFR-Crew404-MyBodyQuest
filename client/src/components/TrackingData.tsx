import { useTracking } from "../context/TrackingContext";
import type { TrackingData as TrackingDataType } from "../context/TrackingContext";
import style from "../styles/Tracking.module.css";

function TrackingData() {
  const context = useTracking(); // 👈 Utilisation du contexte
  const trackingData = context?.trackingData || []; // Provide a default empty array if context is null
  return (
    <div className={style.container}>
      <h2 className={style.heading}>Historique de suivi</h2>
      {trackingData.length > 0 ? (
        <ul className={style.list}>
          {trackingData.map((tracking: TrackingDataType) => (
            <li key={tracking.id} className={style.card}>
              <p>
                <strong>Date :</strong>{" "}
                {new Date(tracking.trackingDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Poids :</strong> {tracking.weight} kg
              </p>
              <p>
                <strong>Tour de taille :</strong> {tracking.waistline} cm
              </p>
              <p>
                <strong>Tour de cuisse :</strong> {tracking.thighCircumference}{" "}
                cm
              </p>
              <p>
                <strong>Tour de poitrine :</strong> {tracking.chestMeasurement}{" "}
                cm
              </p>
              <p>
                <strong>Tour de hanches :</strong> {tracking.hipCircumference}{" "}
                cm
              </p>
              <p>
                <strong>Tour de mollet :</strong> {tracking.calfCircumference}{" "}
                cm
              </p>
              <p>
                <strong>Commentaire :</strong> {tracking.comments || "Aucun"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={style.noData}>Aucune donnée disponible.</p>
      )}
    </div>
  );
}

export default TrackingData;
