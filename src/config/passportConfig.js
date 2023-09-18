import passport from "passport";
import LocalStrategy from 'passport-local';
import { createHash, isValidPassword } from "../utils.js";
import githubStrategy from 'passport-github2' 
import { config } from "./config.js";
import { UserService } from "../Services/users.service.js";

export const initializePassport = () => {
    passport.use('registerStrategy', new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req,username, password, done)=>{
            try {
                const {first_name, last_name, age} = req.body;
                const user = await UserService.getByEmail(username);
                if(user){
                    return done(null );
                }
                const newUser = {
                    first_name: first_name,
                    last_name: last_name,
                    age: age,
                    email: username,
                    password: createHash(password)
                }
                const userCreated = await UserService.saveUser(newUser);
                return done(null, userCreated)

            } catch (error) {
                done(error)
            }
        }
    ));

    passport.use("loginStrategy", new LocalStrategy(
        {
            usernameField: "email"
        },
        async(username, password, done)=> {
            try {
                const user = await UserService.getByEmail(username)
                if(!user) {
                    return done(null, false)
                }
                if(isValidPassword(user, password)){
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error)
            }
        }

    ));

    passport.use('githubLoginStrategy', new githubStrategy(
        {
            clientID: config.github.clientId,
            clientSecret:config.github.clientSecret,
            callBackURL:config.github.callBackUrl,
        },
        async(accesToken, refreshToken, profile, done)=>{
            try {
            console.log('profile', profile);
            const user = await UserService.getByEmail(profile.username);
            if(!user){
                const newUser = {
                    first_name:'',
                    email: profile.username,
                    password: createHash(profile.id)
                };
                const userCreated = UserService.saveUser(newUser)
                return done(null, userCreated)
            } else { 
                return done(null, user)
            }

            } catch (error) {
                return done(error)
            }
        }
    ))

    // Sirve para verificar si el ususario existe en la base de datos
    passport.serializeUser((user, done)=> {
        done(null, user._id);
    })

    passport.deserializeUser(async(id, done)=> {
        const user = await UserService.getUserById(id)
        done(null, user); /* req.user */
    });


}

