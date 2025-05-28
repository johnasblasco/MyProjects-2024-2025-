import express from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './config.js';
import { Book } from './models/bookModels.js';



//setup app
const app = express();


// middleware
app.use(express.json());



// routes
app.post('/books', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

















const Connection = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Database connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}




Connection();
