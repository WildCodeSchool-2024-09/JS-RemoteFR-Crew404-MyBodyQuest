import type { RequestHandler } from "express";

// Import access to data
import succesRepository from "./succesRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all success
    const successes = await succesRepository.readAll();

    // Respond with the success in JSON format
    res.json(successes);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific success based on the provided ID
    const successId = Number(req.params.id);
    const success = await succesRepository.read(successId);

    // If the success is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the success in JSON format
    if (success == null) {
      res.sendStatus(404);
    } else {
      res.json(success);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
