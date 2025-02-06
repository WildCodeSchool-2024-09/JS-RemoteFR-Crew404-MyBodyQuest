import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { UserQuest } from "../../types/express/userQuest";

class UserQuests {
  async getCompletedQuestsByCategory(user_id: number, category_id: number) {
    // Read les quêtes validées d'un utilisateur pour une catégorie
    const [rows] = await databaseClient.query<Rows>(
      "SELECT uq.quest_id FROM user_quests uq JOIN quests q ON uq.quest_id = q.id WHERE uq.user_id = ? AND q.category_id = ? AND uq.is_done = 1",
      [user_id, category_id],
    );

    return rows as UserQuest[];
  }

  async getTotalQuestsByCategory(category_id: number) {
    // ReadAll  les quêtes d'une catégorie
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id FROM quests WHERE category_id = ?",
      [category_id],
    );
    return rows.map((row) => row.id);
  }

  async checkUserSuccess(user_id: number, success_id: number) {
    // Read si un succès est déjà attribué à l'utilisateur
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM user_success WHERE user_id = ? AND success_id = ?",
      [user_id, success_id],
    );

    return rows.length > 0;
  }

  async createUserSuccess(user_id: number, success_id: number) {
    // Create un succès pour un utilisateur
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user_success (user_id, success_id) VALUES (?, ?)",
      [user_id, success_id],
    );

    return result.insertId;
  }

  async getSuccessIdByCategory(category_id: number) {
    //Récupérer le success_id d'une catégorie
    const [rows] = await databaseClient.query<Rows>(
      "SELECT success_id FROM categories WHERE id = ?",
      [category_id],
    );

    return rows.length > 0 ? rows[0].success_id : null;
  }
}

export default new UserQuests();
