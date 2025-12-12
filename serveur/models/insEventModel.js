import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,

    },
    id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
    },
    
    id_event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
    }, 
},{ timestamps: true });

    

export default mongoose.model("InsEvent", userSchema)