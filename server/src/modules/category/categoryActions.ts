import type { RequestHandler } from "express";

// Import access to data
import categoryRepository from "./categoryRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all items
    const category = await categoryRepository.readAll();

    // Respond with the items in JSON format
    res.json(category);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific item based on the provided ID
    const categoryId = Number(req.params.id);
    const category = await categoryRepository.read(categoryId);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (category == null) {
      res.sendStatus(404);
    } else {
      res.json(category);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read };
