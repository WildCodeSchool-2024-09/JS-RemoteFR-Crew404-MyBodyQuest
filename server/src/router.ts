import express from "express";

const router = express.Router();

import {
  hashPwd,
  uploads,
  verifyEmail,
  verifyPwd,
} from "./middlewares/AuthMiddleware";
import { verifyToken } from "./middlewares/JwtMiddleware";
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

/* ************************************************************************* */
// Import Middleware
/* ************************************************************************* */
import {
  hashPwd,
  uploads,
  verifyEmail,
  verifyPwd,
} from "./middlewares/AuthMiddleware";
import jwtMiddleware from "./middlewares/JwtMiddleware";

/* ************************************************************************* */
// Auth
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";

router.post(
  "/api/register",
  uploads.single("file"),
  hashPwd,
  authActions.register,
);
router.post("/api/login", verifyEmail, verifyPwd, authActions.login);
router.post("/api/logout", authActions.logout);

/**
 * Toutes les personnes connectées doivent passer pas la vérification de son token
 * Valide, pas expiré, etc.
 */
import mailActions from "./modules/mail/mailActions";

router.post("/api/mail", mailActions.sendMail);

router.use(verifyToken);

/* ************************************************************************* */
// Nous allons mettre un "mur" d'authentification pour tous nos users
/* ************************************************************************* */
// req.body.user: undefined
router.use(jwtMiddleware.verifyToken);
// req.body.user: {id: 2, name: toto...}

/* ************************************************************************* */
// Levels
/* ************************************************************************* */
import levelsActions from "./modules/levels/levelsActions";

router.get("/api/levels", levelsActions.browse);
router.get("/api/levels/:id", levelsActions.read);
router.post("/api/levels", levelsActions.add);

/* ************************************************************************* */
// Users
/* ************************************************************************* */
import userActions from "./modules/users/usersActions";
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users", userActions.add);

/* ************************************************************************* */
// Trackings
/* ************************************************************************* */
import trackingActions from "./modules/tracking/trackingActions";

router.get("/api/trackings", trackingActions.browse);
router.get("/api/trackings/:id", trackingActions.read);
router.post("/api/trackings", trackingActions.add);
router.put("/api/trackings/:id", trackingActions.edit);
router.delete("/api/trackings/:id", trackingActions.remove);

/* ************************************************************************* */
// Quests
/* ************************************************************************* */
import questsActions from "./modules/quests/questsActions";
router.get("/api/quests", questsActions.browse);
router.get("/api/quests/:id", questsActions.read);
router.post("/api/quests", questsActions.add);
router.post("/api/user_quest", questsActions.edit);

/* ************************************************************************* */
// Category
/* ************************************************************************* */
import categoryActions from "./modules/category/categoryActions";
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);

/* ************************************************************************* */
// Success
/* ************************************************************************* */
import succesActions from "./modules/succes/succesActions";
router.get("/api/succes", succesActions.browse);
router.get("/api/succes/:id", succesActions.read);
router.post("/api/succes", succesActions.add);


/* ************************************************************************* */
// User success
/* ************************************************************************* */
import userSuccesssActions from "./modules/userSuccess/userSuccessActions";
router.post("/api/userSuccess", userSuccesssActions.verifyCategories);
router.get("/api/userSuccess/:id", userSuccesssActions.read);

/* ************************************************************************* */
// Mail
/* ************************************************************************* */
import mailActions from "./modules/mail/mailActions";
router.post("/api/mail", mailActions.sendMail);


export default router;
