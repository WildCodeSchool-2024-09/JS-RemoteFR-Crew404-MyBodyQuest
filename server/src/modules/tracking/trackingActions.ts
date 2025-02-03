import type { RequestHandler } from "express";

// Import access to data
import trackingRepository from "./trackingRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all trackings
    if (!req.body.user) {
      res.status(401).json({
        message: "User non identifié",
      });
      return;
    }
    const trackings = await trackingRepository.read(req.body.user.id);

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
      entryDate: req.body.entryDate,
      waistline: req.body.waistline,
      chestMeasurement: req.body.chestMeasurement,
      thighCircumference: req.body.thighCircumference,
      buttocksCircumference: req.body.buttocksCircumference,
      hipCircumference: req.body.hipCircumference,
      calfCircumference: req.body.calfCircumference,
      weight: req.body.weight,
      comments: req.body.comments,
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
