import { Router } from "express";
import passport from 'passport';
import jwt from 'jsonwebtoken';
import sessionController from '../controllers/sesions.controller.js';

const router = Router();

router.post('/register', passport.authenticate("register", {
        passReqToCallback: true,
        session: false,
        failureRedirect: "api/sessions/failedRegister",
        failureMessage: true,
    }),
    sessionController.register
);
router.get('/failedRegister', sessionController.failedLogin);



router.post('/login', passport.authenticate('login', {
        failureRedirect: '/api/sessions/failedLogin',
        session: false,
    }),
    sessionController.login

);

router.get("failedLogin", sessionController.failedLogin);

router.get("/current", passport.authenticate('current', {
        session: false
    }),
    sessionController.getCurrentUser)

    export default router;