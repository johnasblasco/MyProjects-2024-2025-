import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import Auth from './routes/Auth.js';
import mongoose from 'mongoose';

// intitializtion
env.config();
const app = express();




//middlewares & Routes
app.use(express.json());
app.use(cors());
app.use('/api/auth', Auth);






const startingServer = async () => {
    try {

        //mongodb connect
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected');


        app.listen(process.env.PORT || 1234, () => {
            console.log('server is running on port', process.env.PORT);
        })



    } catch (error) {

    }
}

//starting server
startingServer()