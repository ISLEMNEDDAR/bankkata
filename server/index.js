import express from 'express';
//import {requestService} from "./utils/request"; // to handle the differnet http request put,get,post
import middlware from "./config/middleware.config";
import {config} from "./config/config.config";
import dbConfig from "./config/db.config"

const app = express();

app.get('/ping',async (req,res)=>{
    res.json({message : "pong"})
})

/*
    middlwares
 */
middlware(app);

/*
    PORT
 */
const PORT = config.PORT;

const server = async ()=>{
    await dbConfig()
    app.listen(PORT,err =>{
        if(err){
            console.error(err)
        }else{
            console.log('App listen to port '+PORT)
        }
    });
}

server().then(() => console.log("connected"))
