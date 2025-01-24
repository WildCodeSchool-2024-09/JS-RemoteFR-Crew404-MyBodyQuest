import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
  success_id: number;
};

class CategoryRepository {
  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from category where id >= 1",
      [id]
    );

    // Return the first row of the result, which represents the category
    return rows[0] as Category;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "category" table
    const [rows] = await databaseClient.query<Rows>("select * from category");

    // Return the array of categories
    return rows as Category[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing category

  // async update(category: Category) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an category by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new CategoryRepository();
