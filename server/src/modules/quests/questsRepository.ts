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
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific quest by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from quests where id >= 0",
      [id],
    );

    // Return the first row of the result, which represents the quest
    return rows[id] as Quests;
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
