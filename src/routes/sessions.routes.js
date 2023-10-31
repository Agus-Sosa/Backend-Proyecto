import { Router } from "express";
import passport from "passport";
import { SessionsController } from "../controllers/sessions.controller.js";

const router = Router();

// Nuevas rutas con la arquitectura de capas

router.post("/register",passport.authenticate("registerStrategy", {
    failureRedirect: "/api/sessions/fail-register",
  }),
  SessionsController.redirectLogin
);

router.get("/fail-register", SessionsController.fallRegister);

router.post("/login",passport.authenticate("loginStrategy", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  SessionsController.renderCurrent
);

router.get("/fail-login", SessionsController.fallLogin);

router.get("/loginGithub", passport.authenticate("githubLoginStrategy"));

router.get("/github-callback",passport.authenticate("githubLoginStrategy", {
failureRedirect: "/api/sessions/fail-register",
    }),
    SessionsController.redirectProducts
);

router.post("/forgot-password", SessionsController.forgotPassword);

router.post("/logout", SessionsController.logOut);

router.post("/reset-password", SessionsController.resetPassword)

export { router as sessionsRouter };
