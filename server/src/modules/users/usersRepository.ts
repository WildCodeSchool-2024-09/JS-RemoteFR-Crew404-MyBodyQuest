import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  sexe: string;
  avatar: string;
  email: string;
  password: string;
  birthday_date?: string;
  size: number;
  objective: string;
  initial_weight: number;
  desired_weight: number;
  weight_frequency: string;
  current_xp: number;
  level_id: number;
};

class UserRepository {
  // The C of CRUD - Create operation

  async create(user: Omit<User, "id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into users (firstname, lastname, sexe, avatar, email, password, birthday_date, size, objective, initial_weight, desired_weight, weight_frequency, current_xp, level_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstname,
        user.lastname,
        user.sexe,
        user.avatar,
        user.email,
        user.password,
        user.birthday_date,
        user.size,
        user.objective,
        user.initial_weight,
        user.desired_weight,
        user.weight_frequency,
        user.current_xp,
        user.level_id,
      ],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where id = ?",
      [id],
    );

    if (rows.length === 0) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all users from the "user" table
    const [rows] = await databaseClient.query<Rows>("select * from users");

    // Return the array of users
    return rows as User[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing user

  // async update(user: User) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove a user by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new UserRepository();
