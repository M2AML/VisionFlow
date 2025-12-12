import express from "express"
import {createInsEvent,getInsEventByUser} from "../controllers/insEventControllers.js"

const route = express.Router();
route.post("/insEvent/:id_user/:id_event",createInsEvent);
route.get("/insEvent/user/:id_user",getInsEventByUser)



export default route;

