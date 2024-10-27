import {config} from 'dotenv'
config()

const dbConfig = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE, 
    port: process.env.PORT_DATABASE
};

export default dbConfig