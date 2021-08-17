import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3200
const DB_URI = process.env.DB_URI

export const config = {DB_URI,PORT}
