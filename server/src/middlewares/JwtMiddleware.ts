import jwt from "jsonwebtoken";
import "dotenv/config";

const APP_SECRET = process.env.APP_SECRET as string;

const createToken = (payload: object) => {
  return jwt.sign(payload, APP_SECRET);
};

const verifyToken = (token: string) => {
  return jwt.verify(token, APP_SECRET);
};

export default { createToken, verifyToken };
