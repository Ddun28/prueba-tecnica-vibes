import { Product } from '../../shared/types';
import ProductModel from './models/Product';

export const getProducts = async (params: any) => {
  const {
    search,
    sort = 'price',
    order = 'asc',
    page = 1,
    limit = 10,
    available,
    category
  } = params;

  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } }
    ];
  }

  if (available !== undefined) {
    query.isAvailable = available;
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  const sortOrder = order === 'desc' ? -1 : 1;
  const sortOptions: any = { [sort]: sortOrder };

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    ProductModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .lean() 
      .exec(),
    ProductModel.countDocuments(query)
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    products: products as Product[], 
    total,
    page,
    limit,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
};
 
export const getProductById = async (id: string): Promise<Product | null> => {
  const product = await ProductModel.findOne({ id }).lean().exec();
  return product as Product | null;
};

export const getTopCheapestAvailable = async (top: number = 3): Promise<Product[]> => {
  const products = await ProductModel.find({ isAvailable: true })
    .sort({ price: 1 })
    .limit(top)
    .lean() 
    .exec();
  
  return products as Product[];
};