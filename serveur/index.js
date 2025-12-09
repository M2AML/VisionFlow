import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import route from './routes/userRoute.js'

const app = express();
app.use (bodyParser.json());
dotenv.config();

const port = process.env.PORT || 7000;
const mongourl = process.env.MONGO_URL  ;

mongoose
.connect(mongourl) 
.then(() => {
    console.log("db connecter avec succès");
    app.listen(port,() => {
        console.log(`serveur connecter sur le port: ${port}`);

    })
})
.catch((error) => console.log(error));


app.use("/api", route)