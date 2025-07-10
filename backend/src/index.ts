import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import UserRoutes from './routes/users';
import ProductRoutes from './routes/products';
import CartRoutes from './routes/carts';

dotenv.config();

const PORT = process.env.PORT ?? 1234;
const MONGO_URI = 'mongodb://localhost:27017/compragamer';

const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // esto es para q funcione el envio de token en cookies
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/carts', CartRoutes);

// MongoDB Connection
const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`✅ server connected to MongoDB`);
  } catch (error) {
    console.error('❌ mongoDB connection error:', error);
  }
};

// Start server
app.listen(PORT, () => {
  console.log(`🚀 server listening on port ${PORT}`);
  connectDB();
});
