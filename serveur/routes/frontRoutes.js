import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Page d'accueil
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/accueil.html"));
});

// Page liste des participants
router.get("/listepart", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Client/views/listepart.html"));
});

// Page liste des événements
router.get("/listeeve", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/listeeve.html"));
});

// Page création événement
router.get("/creation", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/creation.html"));
});
router.get("/compte", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/compte.html"));
});
router.get("/connexion", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/connexion.html"));
});
router.get("/inscrip", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/inscrip.html"));
});

export default router;
