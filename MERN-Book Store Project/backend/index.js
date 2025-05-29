import express, { response } from 'express';
import mongoose from 'mongoose';
import { PORT, MONGO_URL } from './config.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';


//--------------------------------------------------Setup Express App
const app = express();


// -------------------------------------------------Middleware
app.use(express.json());

// only allow 5173 to access this api
app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type']
}));



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



// ---------------------------------------------------Routes
app.use('/books', bookRoutes);


Connection();
