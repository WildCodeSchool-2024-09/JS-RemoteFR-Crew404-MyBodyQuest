import type { RequestHandler } from "express";

// Import access to data
import userRepository from "./usersRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all users
    if (!req.body.user) {
      res.status(401).json({ message: "User non identifié" });
      return;
    }
    const users = await userRepository.read(req.body.user.id);

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific user based on the provided ID
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    // If the user is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the user in JSON format
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      size: req.body.size,
      objective: req.body.objective,
      initial_weight: req.body.initial_weight,
      desired_weight: req.body.desired_weight,
      weight_frequency: req.body.weight_frequency,
    };
    const response = await userRepository.update(userData, req.body.user.id);

    if (response !== 1) {
      res.status(500).json({ message: "erreur server" });
      return;
    }

    res.status(200).json({ message: "user updated" });
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      sexe: req.body.sexe,
      avatar: req.body.avatar,
      email: req.body.email,
      password: req.body.password,
      birthday_date: req.body.birthday_date,
      size: req.body.size,
      objective: req.body.objective,
      initial_weight: req.body.initial_weight,
      desired_weight: req.body.desired_weight,
      weight_frequency: req.body.weight_frequency,
      current_xp: req.body.current_xp,
      level_id: req.body.level_id,
    };

    // Create the user
    const insertId = await userRepository.create(newUser);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const me: RequestHandler = async (req, res, next) => {
  try {
    /**
     * !TODO
     * Pensez à virer tous les éléménts qui ne sont pas utiles
     */
    const [[user]] = await userRepository.read(req.body.user.id);
    const rest = {
      password: undefined,
      ...user,
    };

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, remove, me };
