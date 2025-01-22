import * as argon2 from "argon2";
import type { RequestHandler } from "express";

const hashPwd: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors du hashage du mot de passe" });
  }
};

export default hashPwd;
