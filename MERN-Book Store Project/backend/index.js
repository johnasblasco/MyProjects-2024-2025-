import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Server } from 'socket.io';
import axios from 'axios';

import { PORT, MONGO_URL } from './config.js';
import bookRoutes, { init } from './routes/bookRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type']
}));

// Routes
app.use('/books', bookRoutes);

// Start server and connect to DB
const startServer = async () => {
	try {
		// Connect to MongoDB
		await mongoose.connect(MONGO_URL);
		console.log('Database connected');

		// Start Express server
		const server = app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`);
		});

		// Initialize Socket.IO
		const io = new Server(server, {
			cors: { origin: '*' }
		});


		// EMIT SOME DATA TO ALL CLIENTS

		io.on('connection', async (socket) => {
			console.log('A user connected:', socket.id);

			try {

				const data = async () => {
					try {

						const response = await axios.get('http://localhost:8000/books');
						io.emit('liveBooks', response.data.data);

					} catch (error) {
						console.log(error)
					}
				}

				await data();
			} catch (error) {
				console.log(error);
			}
		});

		init(io);

	} catch (error) {
		console.error('Error starting server:', error);
	}


};

startServer();
