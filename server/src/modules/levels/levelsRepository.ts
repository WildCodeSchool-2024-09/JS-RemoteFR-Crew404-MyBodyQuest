import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Level = {
  id: number;
  xp_max: number;
};

class LevelRepository {
  // The C of CRUD - Create operation

  async create(level: Omit<Level, "id">) {
    // Execute the SQL INSERT query to add a new level to the "levels" table
    const [result] = await databaseClient.query<Result>(
      "insert into levels (xp_max) values (?)",
      [level.xp_max],
    );

    // Return the ID of the newly inserted level
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific level by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from levels where id >= 1",
      [id],
    );

    // Return the first row of the result, which represents the level
    return rows[0] as Level;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all levels from the "level" table
    const [rows] = await databaseClient.query<Rows>("select * from levels");

    // Return the array of levels
    return rows as Level[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing level

  // async update(level: Level) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an level by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new LevelRepository();
