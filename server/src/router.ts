import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import userActions from "./modules/users/userActions";

router.get("/api/user", userActions.browse);
router.get("/api/user/:id", userActions.read);
router.post("/api/user", userActions.add);

/* ************************************************************************* */

export default router;
