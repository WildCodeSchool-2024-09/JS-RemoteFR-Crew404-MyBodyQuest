import type { RequestHandler } from "express";

// Import access to data
import levelRepository from "./levelsRepository" 

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all levels
    const levels = await levelRepository.readAll();

    // Respond with the levels in JSON format
    res.json(levels);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific levels based on the provided ID
    const levelId = Number(req.params.id);
    const level = await levelRepository.read(levelId);

    // If the level is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the level in JSON format
    if (level == null) {
      res.sendStatus(404);
    } else {
      res.json(level);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the level data from the request body
    const newLevel = {
      xp_max:req.body.xp_max
    };

    // Create the level
    const insertId = await levelRepository.create(newLevel);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted level
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read , add};
