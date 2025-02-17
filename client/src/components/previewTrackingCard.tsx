import type React from "react";
import type { TrackingData } from "../context/TrackingContext";
import style from "../styles/PreviewTrackingCard.module.css";

interface PreviewTrackingCardProps {
  tracking: TrackingData;
}

const PreviewTrackingCard: React.FC<PreviewTrackingCardProps> = ({
  tracking,
}) => {
  return (
    <div className={style.card}>
      <h3 className={style.date}>
        {new Date(tracking.entryDate).toLocaleDateString()}
      </h3>
      <ul className={style.details}>
        <li>
          <strong>Poids:</strong> {tracking.weight} kg
        </li>
        <li>
          <strong>Taille:</strong> {tracking.waistline} cm
        </li>
        <li>
          <strong>Cuisses:</strong> {tracking.thighCircumference} cm
        </li>
        <li>
          <strong>Poitrine:</strong> {tracking.chestMeasurement} cm
        </li>
        <li>
          <strong>Hanches:</strong> {tracking.hipCircumference} cm
        </li>
        <li>
          <strong>Mollets:</strong> {tracking.calfCircumference} cm
        </li>
        <li>
          <strong>Fesses:</strong> {tracking.buttocksCircumference} cm
        </li>
        {tracking.comments && (
          <li>
            <strong>Notes:</strong> {tracking.comments}
          </li>
        )}
      </ul>
    </div>
  );
};

export default PreviewTrackingCard;
