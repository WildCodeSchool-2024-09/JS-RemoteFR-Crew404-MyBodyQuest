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

export default { register };
