import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { gmailTransporter } from "../config/gmail.config.js";

const SERCRET_TOKEN = config.gmail.secretToken;

// generar token
export const generateEmailToken = (email, expireTime) => {
  const token = jwt.sign({ email }, SERCRET_TOKEN, { expiresIn: expireTime });
  return token;
};

// Funcion para generar enlace con token
export const recoveryEmail = async (req, userEmail, emailToken) => {
  try {
    // con este metodo hacemos que detecte el dominio de nuestra aplicacion de forma mas dinamica
    const domain = `${req.protocol}://${req.get("host")}`;
    const link = `${domain}/reset-password?token=${emailToken}`;
    // Enviar el correo con el enlace para reestablecer contraseña
    await gmailTransporter.sendMail({
      from: "ecommerce backend",
      to: userEmail,
      subject: "Restablece tu contraseña",
      html: `
      <p>Hola,</p>
      <p>Has solicitado restablecer tu contraseña en nuestra plataforma. Para proceder, haz clic en el siguiente enlace:</p>
      <p><a href=${link}>Restablecer Contraseña</a></p>
      <p>Si no has solicitado el restablecimiento de contraseña, puedes ignorar este mensaje.</p>
      <p>Gracias,</p>
      <p>Tu equipo de soporte</p>
      `,
    });
  } catch (error) {
    console.log(`Hubo un error ${error.message}`);
  }
};
