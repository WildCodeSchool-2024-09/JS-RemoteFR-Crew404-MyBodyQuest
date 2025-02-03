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
import { useState } from "react";
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

function TrackingChart() {
  const trackingContext = useTracking(); // On récupère les données depuis le contexte
  const trackingData = trackingContext ? trackingContext.trackingData : []; // Gérer le cas où trackingContext est null
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Etat pour le tri des dates

  // Fonction pour trier les données
  const sortedTrackingData = [...trackingData].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
      : new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
  );

  // Préparation des données pour le graphique
  const chartData = {
    labels: sortedTrackingData.map((tracking) =>
      new Date(tracking.entryDate).toLocaleDateString(),
    ), // Les dates sous forme lisible
    datasets: [
      {
        label: "Poids (kg)",
        data: sortedTrackingData.map((tracking) => tracking.weight), // Les poids à afficher
        borderColor: "rgb(133,201,143)", // Couleur de la courbe
        fill: true, // Ne pas remplir l'aire sous la courbe
      },
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Évolution du poids",
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: "linear" as const,
        title: {
          display: true,
          text: "Poids (kg)",
        },
      },
    },
  };

  return (
    <div>
      {/* Bouton pour changer l'ordre de tri */}
      <button
        type="button"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        Trier par date {sortOrder === "asc" ? "↓" : "↑"}
      </button>

      {/* Affichage du graphique */}
      <Line data={chartData} options={options} />
    </div>
  );
}

export default TrackingChart;
