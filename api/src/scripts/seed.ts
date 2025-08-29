import mongoose from 'mongoose';
import Product from '../models/Product';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const productsDataPath = path.join(__dirname, '../data/products.json');
const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf-8'));

const seedDatabase = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI no configurada');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(productsData);
    await Product.createIndexes();
    await mongoose.connection.close();

  } catch (error) {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    throw error;
  }
};

if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export default seedDatabase;