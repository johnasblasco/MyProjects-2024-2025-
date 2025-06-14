import mongoose from "mongoose";


// make a schema

const useSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', useSchema);
export default User;
