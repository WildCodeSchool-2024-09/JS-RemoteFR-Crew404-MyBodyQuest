import type { RequestHandler } from "express";
import { transporter } from "../../../bin/mailer";

const sendMail: RequestHandler = async (req, res) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "mybodyquest@gmail.com", // sender address
      to: req.body.destinataire, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.content, // plain text body
      html: `<b>${req.body.content}</b>`, // html body
    });

    res.json({ message: "Mail envoyé" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default { sendMail };
