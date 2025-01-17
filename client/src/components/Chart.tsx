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
import { Line } from "react-chartjs-2";

//enregistre les composants nécessaires pour le graphique
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function Chart() {
  const data = {
    labels: ["janv", "févr", "mars", "avr", "mai", "juin", "juil"],
    datasets: [
      {
        label: "Poids",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "#5dcd8a",
        borderColor: "#5dcd8a",
      },
      {
        label: "Mesures",
        data: [28, 48, 40, 19, 86, 27, 90, 150],
        fill: false,
        backgroundColor: "#7b5cb9",
        borderColor: "#7b5cb9",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Mon évolution",
      },
      legend: {
        position: "top" as const,
      },
    },
  };
  return <Line data={data} options={options} />;
}

export default Chart;
