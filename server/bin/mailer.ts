import "dotenv/config";
import nodemailer from "nodemailer";

const { MAIL_USER, MAIL_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
});

export { transporter };
