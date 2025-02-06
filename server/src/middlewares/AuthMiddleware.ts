import path from "node:path"; // pour la gestion des chemins
import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import multer from "multer";
import authRepository from "../modules/auth/authRepository";

const configMulter = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    req.body.avatar = uniqueSuffix + path.extname(file.originalname);

    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploads = multer({ storage: configMulter });

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const register = JSON.parse(req.body.register);
    const hash = await argon2.hash(register.password);
    register.password = hash; // remplace le MDP brut par le hashed MDP
    req.body = { ...register, avatar: req.body.avatar }; //prend les clés de register et les remets dans req.body
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
      return;
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
    if (!req.user) {
      res.status(401).json({ message: "Vous n'êtes pas connecté" });
      return;
    }
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

export { hashPwd, verifyEmail, verifyPwd, uploads };
