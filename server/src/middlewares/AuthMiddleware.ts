import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import authRepository from "../modules/auth/authRepository";

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash; // remplace le MDP brut par le hashed MDP
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du hashage du mot de passe" });
  }
};

const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const user = await authRepository.read(req.body.email); //recherche de l'utilisateur par son email
    if (!user) {
      res.status(401).json({ message: "Aucun compte existant" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la verification de l'email" });
  }
};

const verifyPwd: RequestHandler = async (req, res, next) => {
  try {
    const user = req.user;
    const isPwdValid = await argon2.verify(user.password, req.body.password);
    if (!isPwdValid) {
      res.status(401).json({ message: "Email ou Mot de passe incorrect" });
    }
    req.body.password = undefined;
    next();
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Erreur lors de la verification du mot de passe" });
  }
};

export { hashPwd, verifyEmail, verifyPwd };
