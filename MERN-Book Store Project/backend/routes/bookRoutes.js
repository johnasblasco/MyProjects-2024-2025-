import express from 'express';
import { Book } from '../models/bookModels.js';
const router = express.Router();

let io;

export function init(ioInstance) {
	io = ioInstance;
}


// routes
router.post('/', async (req, res) => {
	try {

		// BACKEND VALIDATOR FIRST
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

		io.emit('newBook', book);
		return res.status(201).send({
			book,
			message: 'Book created successfully'

		});


	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
});


router.get('/', async (req, res) => {
	try {
		const books = await Book.find({});
		return res.status(200).json({
			count: books.length,
			data: books
		})



	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
})


router.get('/:id', async (req, res) => {
	try {

		const { id } = req.params;

		const book = await Book.findById(id);
		return res.status(200).json(book);

	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
})


router.put('/:id', async (req, res) => {
	try {
		// BACKEND VALIDATOR FIRST
		if (
			!req.body.title ||
			!req.body.author ||
			!req.body.publishYear
		) {
			return res.status(400).send({
				message: 'Send all required fields: title, author, publishYear'
			});
		}

		// LET'S UPDATE THE BOOK
		const { id } = req.params;
		const result = await Book.findByIdAndUpdate(id, req.body);
		return res.status(200).send({
			data: req.body,
			message: 'Book updated successfully'
		});


	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });
	}
})


router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Book.findByIdAndDelete(id);
		if (!result) {
			return res.status(404).json({ message: 'Book not found' });
		}
		return res.status(200).send({
			data: req.body,
			message: 'Book deleted successfully'
		})

	} catch (error) {
		console.log(error.message);
		res.status(500).send({ message: error.message });

	}

})

export default router;