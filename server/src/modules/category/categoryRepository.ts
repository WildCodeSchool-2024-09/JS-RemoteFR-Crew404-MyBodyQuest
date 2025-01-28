import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
  success_id: number;
};

class CategoryRepository {
  // The C of CRUD - Create operation
  // Delete if no administrator has been added or created

  async create(category: Omit<Category, "id">) {
    // Execute the SQL INSERT query to add a new category to the "category" table
    const [result] = await databaseClient.query<Result>(
      "insert into category (name, success_id) values (?, ?)",
      [category.name, category.success_id],
    );

    // Return the ID of the newly inserted category
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific category by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from category where id = ?",
      [id],
    );

    // Return the row of the result, which represents the category
    if (rows.length === 0) {
      throw new Error(`Category with ID ${id} not found`);
    }

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
