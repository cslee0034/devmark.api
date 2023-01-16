import dotenv from "dotenv";
dotenv.config();
const config = {
    development: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: "dev-mark",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    test: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: "dev-mark",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: process.env.DB_PASSWORD,
        database: "dev-mark",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
export default config;
