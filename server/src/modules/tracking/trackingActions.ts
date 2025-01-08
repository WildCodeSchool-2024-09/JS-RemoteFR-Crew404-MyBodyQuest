import type { RequestHandler } from "express";

// Import access to data
import trackingRepository from "./trackingRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all trackings
    const trackings = await trackingRepository.readAll();

    // Respond with the trackings in JSON format
    res.json(trackings);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific tracking based on the provided ID
    const trackingId = Number(req.params.id);
    const tracking = await trackingRepository.read(trackingId);

    // If the tracking is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the tracking in JSON format
    if (tracking == null) {
      res.sendStatus(404);
    } else {
      res.json(tracking);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the tracking data from the request body
    const newTracking = {
      date: req.body.date,
      mesure_size: req.body.mesure_size,
      mesure_chest: req.body.mesure_chest,
      mesure_breast: req.body.mesure_breast,
      mesure_buttocks: req.body.mesure_buttocks,
      mesure_hips: req.body.mesure_hips,
      mesure_calves: req.body.mesure_calves,
      weight: req.body.weight,
      comments:req.body.comments,
      user_id: req.body.user_id,
    };

    // Create the tracking
    const insertId = await trackingRepository.create(newTracking);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted tracking
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, add };
