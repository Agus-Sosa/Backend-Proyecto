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

// Funcion para avisarle al usuario que fue eliminado por inactividad
export const accountDeleteEmail = async(userEmail)=> {
  try {
    
    await gmailTransporter.sendMail({
      from: "Ecommerce Backend",
      to: userEmail,
      subject: "Eliminacion de cuenta por inactividad",
      html: `
      <p>Hola,</p>
      <p>Tu cuenta en nuestra plataforma ha sido eliminada debido a la inactividad. Si necesitas informacion, no dudes en contactarnos</p>
      <p>Gracias,</p>
      <p>Equipo de soporte</p>
      `,
    });


  } catch (error) {
    console.log(`Hubo un error ${error.message}`)
  }

}

// Funcion para indicar al usuario premium que su producto fue eliminado
export const deleteProductPremium = async(userEmail)=>{
  try {
    await gmailTransporter.sendMail({
      from: "Ecommerce Backend",
      to: userEmail,
      subject: "Eliminacion de su Producto",
      html: `
      <p>Hola,</p>
      <p>El producto que creo fue eliminado. Si necesitas informacion, no dudes en contactarnos</p>
      <p>Gracias,</p>
      <p>Equipo de soporte</p>
      `,
    });
  } catch (error) {
    console.log(`Hubo un error ${error.message}`)
  }
}


