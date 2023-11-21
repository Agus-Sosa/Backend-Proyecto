import { UserService } from "../Services/users.service.js";
import { generateEmailToken, recoveryEmail } from "../helpers/gmail.js";
import { logger } from "../helpers/logger.js";
import { validateToken, createHash } from "../utils.js";

export class SessionsController {
  static redirectLogin = (req, res) => {
    res.redirect("/login");
  };

  static fallRegister = (req, res) => {
    res.render("register", {
      error: "No se pudo registrar el usuario",
      style: "register.css",
    });
  };

  static renderCurrent = (req, res) => {
    const user = req.user;
    logger.info(`Renderizando la vista de perfil para el usuario ${user}`);
    res.render("current", { user, stye: "current.css" });
  };

  static fallLogin = (req, res) => {
    res.render("login", {
      error: "Error al iniciar sesion",
      style: "login.css",
    });
  };

  static redirectProducts = (req, res) => {
    res.redirect("/products");
  };

  static logOut = (req, res) => {
    const user = req.user;
    req.logOut((error) => {
      if (error) {
        logger.error(`Error al cerrar la sesion ${error}`);
        return res.render("products", {
          error: "No fue posible cerrar sesion",
        });
      } else {
        user.last_connection = new Date();
        UserService.updateUser(user._id, user)
        req.session.destroy((error) => {
          logger.info("Se cerro la sesion");
          if (error)
            return res.render("products", {
              error: "No fue posible cerrar sesion",
            });
          res.redirect("/login");
        });
      }
    });
  };

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await UserService.getByEmail(email);
      
      if (!user) {
        res.status(401).json({
          status: "error",
          message: "No fue posible restablecer la contraseña",
        });
      }
      const token = generateEmailToken(email,2*60); /* Generamos token de 3 min */
      await recoveryEmail(req,email, token);

      res.send("correo enviado");
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  };

  static resetPassword = async(req, res)=> {
    try {
      const token = req.query.token;
      const {newPassword}= req.body;
      const validEmail = validateToken(token)
      if(validEmail){
        const user = await UserService.getByEmail(validEmail);
          if(user){
            user.password = createHash(newPassword);
            await UserService.updateUser(user._id, user)
            res.send("Se actualizo la contraseña <a href='/login'>Volver a Iniciar Sesion</a> ")
          } else {
            return res.send('El usuario no existe <a href="/login">Volver al inicio de sesion</a>')
          }
      } else {
        return res.send('El token ha caducado')
      }
    } catch (error) {
      res.status(404).send("Error al restablecer la contraseña")
    }
  }
}
