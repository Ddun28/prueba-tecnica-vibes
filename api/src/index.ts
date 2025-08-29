import express from 'express';
import cors from 'cors';
import productsRouter from './products.router';
import { connectDB } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const initializeDatabase = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) return;

  try {
    await connectDB();
    
    const Product = require('./models/Product').default;
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      const seedDatabase = require('./scripts/seed').default;
      await seedDatabase();
    }
  } catch (error) {
    console.log('Usando datos de JSON');
  }
};

initializeDatabase();

app.use('/api/products', productsRouter);

app.get('/api/health', async (req, res) => {
  try {
    let dbStatus = 'disconnected';
    let productCount = 0;
    let dbType = 'JSON';
    
    if (process.env.MONGODB_URI) {
      const mongoose = require('mongoose');
      dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
      dbType = 'MongoDB';
      
      if (dbStatus === 'connected') {
        const Product = require('./models/Product').default;
        productCount = await Product.countDocuments();
      }
    }

    res.json({ 
      status: 'OK', 
      database: { status: dbStatus, type: dbType, productCount }
    });
  } catch (error) {
    res.status(500).json({ status: 'ERROR' });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((error: unknown, req: express.Request, res: express.Response) => {
  res.status(500).json({ error: 'Error interno del servidor' });
}); 

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

export default app;