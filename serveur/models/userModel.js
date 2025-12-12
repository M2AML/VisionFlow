import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nom:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,

    },
    motpasse:{
        type: String,
        required: true,

    },

})

export default mongoose.model("User", userSchema)