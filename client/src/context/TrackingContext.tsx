import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

export type TrackingData = {
  trackingDate: string | number | Date;
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
    if (trackingData.length === 0) {
      // ✅ Vérifie si c'est vide avant de charger
      const HandleTrackingData = async () => {
        try {
          const response = await api.get("/api/trackings");
          setTrackingData(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      HandleTrackingData();
    }
  }, [trackingData]);

  return (
    <TrackingContext.Provider value={{ trackingData, setTrackingData }}>
      {children}
    </TrackingContext.Provider>
  );
}

export const useTracking = () => useContext(TrackingContext);
