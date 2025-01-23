import type { RequestHandler } from "express";
import JwtMiddleware from "../../middlewares/JwtMiddleware";

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
    // Fetch the user by email
    const user = await authRepository.read(req.body.email);
    const token = JwtMiddleware.createToken(user); // génération JWT
    res.cookie("jwtToken", token, { httpOnly: true, secure: false }).json(user); // envoi du jwt dans les cookies
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { register, login };
