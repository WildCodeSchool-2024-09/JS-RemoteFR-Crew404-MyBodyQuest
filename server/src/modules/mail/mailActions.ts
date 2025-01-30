import type { RequestHandler } from "express";
import { transporter } from "../../../bin/mailer";

const sendMail: RequestHandler = async (req, res) => {
  try {
    // Envoi d'un email vers l'utilisateur pour accusé de reception
    await transporter.sendMail({
      from: "mybodyquest@gmail.com", // sender address
      to: req.body.destinataire, // list of receivers
      subject: "[MyBodyQuest] - Accusé de réception", // Subject line
      text: req.body.content, // plain text body
      html: `
      Votre message : <strong>${req.body.content}</strong>`, // html body
    });

    // Envoi d'un email à `mybodyqyest@gmail` pour les infos du contact
    await transporter.sendMail({
      from: "mybodyquest@gmail.com", // sender address
      to: "mybodyquest@gmail.com", // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.content, // plain text body
      html: `
      User: <strong>${req.body.destinataire}</strong>
      Sujet: <strong>${req.body.subject}</strong>
      Message: <strong>${req.body.content}</strong>`, // html body
    });

    res.json({ message: "Mail envoyé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { sendMail };
