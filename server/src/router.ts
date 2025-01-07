import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/users/userActions";

router.get("/api/items", userActions.browse);
router.get("/api/items/:id", userActions.read);
router.post("/api/items", userActions.add);

/* ************************************************************************* */

export default router;
