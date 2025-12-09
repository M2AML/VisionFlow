import express from "express"

import {create} from "../controllers/userControllers.js"

const route = express.Router();
route.post("/user", create)

export default route;