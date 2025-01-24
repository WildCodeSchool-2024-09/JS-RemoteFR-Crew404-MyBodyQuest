import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import levelsActions from "./modules/levels/levelsActions";

router.get("/api/levels", levelsActions.browse);
router.get("/api/levels/:id", levelsActions.read);
router.post("/api/levels", levelsActions.add);

import authActions from "./modules/auth/authActions";
import userActions from "./modules/users/usersActions";

router.post("/api/register", authActions.register);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);

import trackingActions from "./modules/tracking/trackingActions";

router.get("/api/trackings", trackingActions.browse);
router.get("/api/trackings/:id", trackingActions.read);
router.post("/api/trackings", trackingActions.add);

import questsActions from "./modules/quests/questsActions";
router.get("/api/quests", questsActions.browse);
router.get("/api/quests/:id", questsActions.read);

import categoryActions from "./modules/category/categoryActions";
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);

import succesActions from "./modules/succes/succesActions";

router.get("/api/succes", succesActions.browse);
router.get("/api/succes/:id", succesActions.read);

export default router;
