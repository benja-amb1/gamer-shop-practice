import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

const PORT = process.env.PORT ?? 3000;
const MONGO_URI = 'mongodb://localhost:27017/compragamer';

const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes


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
