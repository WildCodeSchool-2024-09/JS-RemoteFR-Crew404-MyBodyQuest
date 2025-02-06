import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export type TrackingData = {
  id: number;
  entryDate: Date;
  waistline: number;
  thighCircumference: number;
  chestMeasurement: number;
  buttocksCircumference: number;
  hipCircumference: number;
  calfCircumference: number;
  weight: number;
  comments: string;
  user_id: number;
};

type TrackingContextType = {
  trackingData: TrackingData[];
  setTrackingData: (TrackingData: TrackingData[]) => void;
};
const TrackingContext = createContext<TrackingContextType | null>(null);

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await api.get("/api/trackings");

        // 🔥 Trie directement avant de stocker
        const sortedTrackingData = response.data.sort(
          (a: TrackingData, b: TrackingData) =>
            new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime(),
        );

        setTrackingData(sortedTrackingData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données de suivi :",
          error,
        );
      }
    };

    if (trackingData.length === 0) {
      fetchTrackingData();
    }
  }, [trackingData]);

  return (
    <TrackingContext.Provider value={{ trackingData, setTrackingData }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => useContext(TrackingContext);
