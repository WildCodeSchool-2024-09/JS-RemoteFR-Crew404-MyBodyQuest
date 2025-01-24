import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Success = {
  id: number;
  succes_title: string;
  succes_img: string;
};

class SuccesRepository {
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific success by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from success where id >= 0",
      [id],
    );

    // Return the first row of the result, which represents the success
    return rows[id] as Success;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "success" table
    const [rows] = await databaseClient.query<Rows>("select * from success");

    // Return the array of items
    return rows as Success[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new SuccesRepository();
