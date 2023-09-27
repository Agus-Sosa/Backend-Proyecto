import dotenv from 'dotenv'
dotenv.config();

export const config = {
    server: {
        port: process.env.PORT || 3000,
        secretSession: process.env.SECRET_SESSION,
        persistence: process.env.PERSISTENCE
    },
    mongo: {
        url: process.env.MONGO_URL
    },
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callBackUrl: process.env.GITHUB_CALLBACK_URL
    }
}