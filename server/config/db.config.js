import mongoose from "mongoose";
import {config} from "./config.config"

export default async () => {
    mongoose.connection.on("error", async () => {
        try {
            //await sendErrorMessage(`unable to connect to database: ${DB_URI}`);
            throw new Error(`unable to connect to database: ${config.DB_URI}`);
        } catch (e) {}
    });

    mongoose
        .connect(config.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        .then((res) => console.log("conncet to database successfully"))
        .catch((err) => console.log(err));
};
