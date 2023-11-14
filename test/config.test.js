import dotenv from 'dotenv'
dotenv.config();

export const configTest ={
    mongo:{
        url: process.env.TEST_DB_URL
    }
}
