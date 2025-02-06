import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string;
  email: string;
  password: string;
  birthday_date?: string;
  size: number;
  sexe: string;
  objective: string;
  initial_weight: number;
  desired_weight: number;
  weight_frequency: string;
  current_xp: number;
  level_id: number;
};

class AuthRepository {
  // The C of CRUD - Create operation
  // (Register)

  async create(user: Omit<User, "id" | "current_xp" | "level_id">) {
    // Execute the SQL INSERT query to add a new user to the "user" table
    const [result] = await databaseClient.query<Result>(
      "insert into users (firstname, lastname, avatar,email, password, birthday_date,size, sexe, objective, initial_weight, desired_weight, weight_frequency) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)",
      [
        user.firstname,
        user.lastname,
        user.avatar ? user.avatar : "avatardefault.svg",
        user.email,
        user.password,
        user.birthday_date,
        user.size,
        user.sexe,
        user.objective,
        user.initial_weight,
        user.desired_weight,
        user.weight_frequency,
      ],
    );

    // Return the ID of the newly inserted user
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(email: string) {
    // Execute the SQL SELECT query to retrieve a specific user by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where email =?",
      [email],
    );

    // Return the first row of the result, which represents the user
    return rows[0] as User;
  }
}

export default new AuthRepository();
