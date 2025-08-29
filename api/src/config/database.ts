import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    console.log('Usando JSON como fallback');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.log('Error de conexión, usando JSON');
  } 
};

export default connectDB;