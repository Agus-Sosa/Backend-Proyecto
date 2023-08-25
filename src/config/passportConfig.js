import passport from "passport";
import LocalStrategy from 'passport-local';
import { createHash, isValidPassword } from "../utils.js";
import { UsersMongoManager } from "../dao/mongo/UserMongoManager.js";
import githubStrategy from 'passport-github2' 
import { config } from "./config.js";
const userMongo = new UsersMongoManager()

export const initializePassport = () => {
    passport.use('registerStrategy', new LocalStrategy(
        {
            usernameField: "email",
            passReqToCallback: true,
        },
        async (req,username, password, done)=>{
            try {
                const {first_name} = req.body;
                const user = await userMongo.getByEmail(username);
                if(user){
                    return done(null );
                }
                const newUser = {
                    first_name: first_name,
                    email: username,
                    password: createHash(password)
                }
                const userCreated = await userMongo.saveUsers(newUser);
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
                const userLogin = await userMongo.getByEmail(username)
                if(!userLogin) {
                    return done(null, false)
                }
                if(isValidPassword(userLogin, password)){
                    return done(null, userLogin);
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
            const user = await userMongo.getByEmail(profile.username);
            if(!user){
                const newUser = {
                    first_name:'',
                    email: profile.username,
                    password: createHash(profile.id)
                };
                const userCreated = userMongo.saveUsers(newUser)
                return done(null, userCreated)
            } else { 
                return done(null, user)
            }

            } catch (error) {
                return done(error)
            }
        }
    ))

    passport.serializeUser((user, done)=> {
        done(null, user._id);
    })

    passport.deserializeUser(async(id, done)=> {
        const user = await userMongo.getUserById(id)
        done(null, user);
    });


}

