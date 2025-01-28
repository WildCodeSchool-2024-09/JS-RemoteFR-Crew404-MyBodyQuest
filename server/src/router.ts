import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import levelsActions from "./modules/levels/levelsActions";

router.get("/api/levels", levelsActions.browse);
router.get("/api/levels/:id", levelsActions.read);
router.post("/api/levels", levelsActions.add);

import {
  hashPwd,
  uploads,
  verifyEmail,
  verifyPwd,
} from "./middlewares/AuthMiddleware";
// Login & Register
import authActions from "./modules/auth/authActions";
router.post(
  "/api/register",
  uploads.single("file"),
  hashPwd,
  authActions.register,
);
router.post("/api/login", verifyEmail, verifyPwd, authActions.login);

import userActions from "./modules/users/usersActions";
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
router.post("/api/quests", questsActions.add);

import categoryActions from "./modules/category/categoryActions";
router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);

import succesActions from "./modules/succes/succesActions";

router.get("/api/succes", succesActions.browse);
router.get("/api/succes/:id", succesActions.read);
router.post("/api/succes", succesActions.add);

import mailActions from "./modules/mail/mailActions";

router.post("/api/mail", mailActions.sendMail);

export default router;
