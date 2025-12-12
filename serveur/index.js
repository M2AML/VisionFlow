import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import route from './routes/userRoute.js';
import routEvent from './routes/eventRoute.js';
import routeInsEvent from './routes/insEventRoute.js';
import routeFront from './routes/frontRoutes.js';

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./../Client/public")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Définition des routes
app.use("/api", route);
app.use("/api", routEvent);
app.use("/api",routeInsEvent);
app.use("/",routeFront)


const port = process.env.PORT || 7000;
const mongourl = process.env.MONGO_URL;

mongoose
.connect(mongourl)
.then(() => {
    console.log("DB connectée avec succès");
    app.listen(port, () => {
    console.log(`Serveur connecté sur le port: ${port}`);
    });
})
.catch((error) => console.log("Erreur de connexion DB:", error));
