import nodemailer from "nodemailer";
import { config } from "./config.js";

const GMAIL_ACCOUNT = config.gmail.account;
const GMAIL_PASSWORD = config.gmail.password;

// Crear el transporte para conectarnos a gmail

const gmailTransporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: GMAIL_ACCOUNT /* Cuenta y contraseña que vamos a utilzar para conectarnos a gmail y utilizar el servicio */,
    pass: GMAIL_PASSWORD,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export { gmailTransporter };
