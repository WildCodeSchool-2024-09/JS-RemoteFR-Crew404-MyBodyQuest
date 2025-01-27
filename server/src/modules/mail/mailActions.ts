import type { RequestHandler } from "express";

const sendMail: RequestHandler = (req, res) => {
  res.send("Mail sent");
};

export default { sendMail };
