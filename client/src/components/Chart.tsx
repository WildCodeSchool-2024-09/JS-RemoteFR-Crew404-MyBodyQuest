import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useTracking } from "../context/TrackingContext";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

type ChartProps = {
  selectedDataType: string;
  selectedRange: [Date | null, Date | null];
};

function TrackingChart({ selectedDataType, selectedRange }: ChartProps) {
  const trackingContext = useTracking(); // On récupère les données depuis le contexte
  const trackingData = trackingContext ? trackingContext.trackingData : []; // Gérer le cas où trackingContext est null
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Etat pour le tri des dates

  // Fonction pour trier les données
  const sortedTrackingData = [...trackingData].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
      : new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
  );

  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      tension: number;
    }[];
  }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Filtrer les données en fonction de la période sélectionnée
    const filteredData = sortedTrackingData.filter((item) => {
      const entryDate = new Date(item.entryDate);
      return (
        (!selectedRange[0] || entryDate >= selectedRange[0]) &&
        (!selectedRange[1] || entryDate <= selectedRange[1])
      );
    });

    const chartDataSet = {
      labels: filteredData.map((tracking) =>
        new Date(tracking.entryDate).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
        }),
      ), // Les dates sous forme lisible
      datasets: [
        {
          label: selectedDataType, // Utiliser le type de données sélectionné
          data: filteredData.map((tracking) => {
            switch (selectedDataType) {
              case "Poids":
                return tracking.weight;
              case "Tour de poitrine":
                return tracking.chestMeasurement;
              case "Tour de hanches":
                return tracking.hipCircumference;
              case "Tour de taille":
                return tracking.waistline;
              case "Tour de cuisses":
                return tracking.thighCircumference;
              case "Tour de mollet":
                return tracking.calfCircumference;
              case "Tour de fesses":
                return tracking.buttocksCircumference;
              // Ajouter d'autres cas pour les types de données
              default:
                return tracking.weight; // Par défaut, afficher le poids
            }
          }), // Données à afficher
          borderColor: "rgb(133,201,143)", // Couleur de la ligne
          tension: 0.1, // Lissage de la courbe
        },
      ],
    };

    // Mettre à jour les données du graphique uniquement si elles ont changé
    setChartData((prevData) => {
      const isDataEqual = prevData.datasets[0]?.data.every(
        (value, index) => value === chartDataSet.datasets[0].data[index],
      );
      // Mettre à jour le chartData uniquement si les données sont différentes
      if (!isDataEqual) {
        return chartDataSet;
      }
      return prevData;
    });
  }, [selectedDataType, selectedRange, sortedTrackingData]); // Enlever trackingData et sortOrder des dépendances

  const options = {
    plugins: {
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        type: "linear" as const,
      },
    },
  };

  return (
    <>
      {/* Bouton pour changer l'ordre de tri */}
      <button
        type="button"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        className={Style.SortButton}
      >
        Date {sortOrder === "asc" ? "↓" : "↑"}
      </button>
      <div className={Style.ChartContainer}>
        {/* Affichage du graphique */}
        <Line data={chartData} options={options} />
      </div>
    </>
  );
}

export default TrackingChart;
