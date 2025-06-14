import express from 'express';
import User from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();

const Authrouter = express.Router();

Authrouter.get('/signup', (req, res) => {
    res.send('hello world');
})

Authrouter.post('/signup', async (req, res) => {
    try {
        //get the user from the request body
        const { username, password } = req.body;

        //validate the user
        if (!username || !password) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        //validate again if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        //------------------------------------------------------------------------------------------------------------------------------

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //generate a token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });


        //create a user and save user
        const newUser = new User({ username, password: hashedPassword, token });
        const saveUser = await newUser.save();

        //result
        res.status(201).json(saveUser);


    } catch (error) {
        res.send(error);
    }
})


export default Authrouter;