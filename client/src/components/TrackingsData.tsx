import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useTracking } from "../context/TrackingContext";
import type { TrackingData } from "../context/TrackingContext";
import api from "../services/api";
import { success } from "../services/toasts";
import style from "../styles/Tracking.module.css";

function TrackingsData() {
  const context = useTracking(); // 👈 Utilisation du contexte
  const trackingData = context?.trackingData || []; // Fournit un tableau vide par défaut si le contexte est null
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editData, setEditData] = useState<TrackingData | null>(null); // Données de l'élément en cours d'édition
  const [updatedFields, setUpdatedFields] = useState<TrackingData | null>(null); // Champs mis à jour

  const handleSortOrderChange = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  // Fonction pour mettre à jour les champs modifiés
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TrackingData,
  ) => {
    setUpdatedFields(
      (prevFields) =>
        ({
          ...prevFields,
          [field]: field === "id" ? Number(e.target.value) : e.target.value,
        }) as TrackingData,
    );
  };

  // Fonction pour soumettre la mise à jour au serveur
  const handleUpdate = async (id: number) => {
    try {
      const updatedData = {
        ...editData,
        ...updatedFields,
        entryDate: new Date(
          new Date(
            updatedFields?.entryDate ?? editData?.entryDate ?? "",
          ).getTime() +
            2 * 60 * 60 * 1000,
        )
          .toISOString()
          .split("T")[0],
      };
      await api.put(`/api/trackings/${id}`, updatedData);
      success("Mise à jour réussie:");

      // Mettre à jour le contexte après la mise à jour
      if (context?.setTrackingData) {
        context.setTrackingData(
          trackingData.map((tracking) =>
            tracking.id === id
              ? {
                  ...tracking,
                  ...updatedData,
                  entryDate:
                    new Date(updatedData.entryDate).getTime() +
                    2 * 60 * 60 * 1000,
                }
              : tracking,
          ),
        );
      }
      setEditData(null); // Fermer le mode édition après la mise à jour
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  // Fonction pour activer le mode édition sur une ligne
  const handleEditClick = (tracking: TrackingData) => {
    setEditData(tracking);
    setUpdatedFields({
      id: tracking.id,
      entryDate: tracking.entryDate,
      weight: tracking.weight,
      waistline: tracking.waistline,
      thighCircumference: tracking.thighCircumference,
      chestMeasurement: tracking.chestMeasurement,
      hipCircumference: tracking.hipCircumference,
      calfCircumference: tracking.calfCircumference,
      buttocksCircumference: tracking.buttocksCircumference,
      comments: tracking.comments || "",
      user_id: tracking.user_id,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/trackings/${id}`);
      success("Suppression réussie");

      // Mettre à jour le contexte après la suppression
      if (context?.setTrackingData) {
        context.setTrackingData(
          trackingData.filter((tracking) => tracking.id !== id),
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const sortedTrackingData = [...trackingData].sort((a, b) =>
    sortOrder === "asc"
      ? new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
      : new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime(),
  );

  return (
    <>
      <h2 className={style.TitlePage}>Historique de suivi</h2>
      <div className={style.containerTrackingData}>
        {trackingData.length > 0 ? (
          <table className={style.tableTracking}>
            <thead className={style.tableHead}>
              <tr className={style.tableRow}>
                <th>
                  <button
                    type="button"
                    onClick={handleSortOrderChange}
                    className={style.sort}
                  >
                    Date{" "}
                    {sortOrder === "asc" ? (
                      <FaArrowUpWideShort />
                    ) : (
                      <FaArrowDownWideShort />
                    )}
                  </button>
                </th>
                <th>Poids</th>
                <th>Taille</th>
                <th>Cuisses</th>
                <th>Poitrine</th>
                <th>Hanches</th>
                <th>Mollets</th>
                <th>Fesses </th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody className={style.tableBody}>
              {sortedTrackingData.map((tracking: TrackingData) => (
                <tr key={tracking.id} className={style.tableRow}>
                  <td>{new Date(tracking.entryDate).toLocaleDateString()}</td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={updatedFields?.weight || tracking.weight}
                        onChange={(e) => handleInputChange(e, "weight")}
                      />
                    ) : (
                      tracking.weight
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={updatedFields?.waistline || tracking.waistline}
                        onChange={(e) => handleInputChange(e, "waistline")}
                      />
                    ) : (
                      tracking.waistline
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={
                          updatedFields?.thighCircumference ||
                          tracking.thighCircumference
                        }
                        onChange={(e) =>
                          handleInputChange(e, "thighCircumference")
                        }
                      />
                    ) : (
                      tracking.thighCircumference
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={
                          updatedFields?.chestMeasurement ||
                          tracking.chestMeasurement
                        }
                        onChange={(e) =>
                          handleInputChange(e, "chestMeasurement")
                        }
                      />
                    ) : (
                      tracking.chestMeasurement
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={
                          updatedFields?.hipCircumference ||
                          tracking.hipCircumference
                        }
                        onChange={(e) =>
                          handleInputChange(e, "hipCircumference")
                        }
                      />
                    ) : (
                      tracking.hipCircumference
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={
                          updatedFields?.calfCircumference ||
                          tracking.calfCircumference
                        }
                        onChange={(e) =>
                          handleInputChange(e, "calfCircumference")
                        }
                      />
                    ) : (
                      tracking.calfCircumference
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="number"
                        value={
                          updatedFields?.buttocksCircumference ||
                          tracking.buttocksCircumference
                        }
                        onChange={(e) =>
                          handleInputChange(e, "buttocksCircumference")
                        }
                      />
                    ) : (
                      tracking.buttocksCircumference
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <input
                        type="text"
                        value={updatedFields?.comments || tracking.comments}
                        onChange={(e) => handleInputChange(e, "comments")}
                      />
                    ) : (
                      tracking.comments || "Aucun"
                    )}
                  </td>
                  <td>
                    {editData?.id === tracking.id ? (
                      <button
                        type="submit"
                        onClick={() => handleUpdate(tracking.id)}
                      >
                        Sauvegarder
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEditClick(tracking)}
                      >
                        <FaEdit />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDelete(tracking.id)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={style.noData}>Aucune donnée disponible.</p>
        )}
      </div>
    </>
  );
}

export default TrackingsData;
