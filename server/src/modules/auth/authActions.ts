import type { RequestHandler } from "express";

// Import access to data
import authRepository from "./authRepository";

const register: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const users = await authRepository.create(req.body);

    // Respond with the users in JSON format
    res.status(201).json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.email);

    if (!user) {
      res.status(401).json({ message: "Aucun compte existant" });
      return;
    }
    if (user.password !== req.body.password) {
      res.status(401).json({ message: "Email ou mot de passe invalide" });
      return;
    }
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { register, login };
