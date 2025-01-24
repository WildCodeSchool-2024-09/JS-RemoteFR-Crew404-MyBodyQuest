import type { RequestHandler } from "express";

// Import access to data
import questsRepository from "./questsRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all Quests
    const quests = await questsRepository.readAll();

    // Respond with the Quests in JSON format
    res.json(quests);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific Quest based on the provided ID
    const questId = Number(req.params.id);
    const quest = await questsRepository.read(questId);

    // If the Quest is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the Quests in JSON format
    if (quest == null) {
      res.sendStatus(404);
    } else {
      res.json(quest);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
