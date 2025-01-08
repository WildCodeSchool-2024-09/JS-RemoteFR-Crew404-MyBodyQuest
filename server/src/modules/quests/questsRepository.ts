import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Quests = {
  id: number;
  quest_title: string;
  description: string;
  xp: number;
  category_id: number;
};

class QuestsRepository {
  // The C of CRUD - Create operation

  async create(quests: Omit<Quests, "id">) {
    // Execute the SQL INSERT query to add a new quest to the "quests" table
    const [result] = await databaseClient.query<Result>(
      "insert into quests (quest_title, description, xp, category_id) values (?, ?, ?, ?)",
      [quests.quest_title, quests.description, quests.xp, quests.category_id],
    );

    // Return the ID of the newly inserted quest
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific quest by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from quests where id >= 1",
      [id],
    );

    // Return the first row of the result, which represents the quest
    return rows[0] as Quests;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all quests from the "quests" table
    const [rows] = await databaseClient.query<Rows>("select * from quests");

    // Return the array of quests
    return rows as Quests[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing quest

  // async update(quest: Quest) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an quest by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new QuestsRepository();
