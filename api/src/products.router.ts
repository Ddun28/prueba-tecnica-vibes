import express from 'express';
import { Product, ProductsQueryParams } from '../../shared/types';
import { getProducts, getProductById, getTopCheapestAvailable } from './products.controller';

const router = express.Router();

// GET /api/products - Obtener lista de productos con filtros
router.get('/', async (req, res) => {
  try {
    const queryParams: ProductsQueryParams = {
      search: req.query.search as string,
      sort: req.query.sort as 'price' | 'name',
      order: req.query.order as 'asc' | 'desc',
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      available: req.query.available ? req.query.available === 'true' : undefined,
      category: req.query.category as string
    };

    const result = await getProducts(queryParams);
    res.json(result);
  } catch (error) {
    console.error('Error en GET /api/products:', error);
    res.status(500).json({ 
      error: 'Error al obtener productos',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET /api/products/:id - Obtener un producto específico
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: `El producto con ID ${productId} no existe` 
      });
    }
    
    res.json({ product });
  } catch (error) {
    console.error('Error en GET /api/products/:id:', error);
    res.status(500).json({ 
      error: 'Error al obtener el producto',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

// GET /api/products/top/cheapest - Obtener los productos más baratos disponibles
router.get('/top/cheapest', async (req, res) => {
  try {
    const top = req.query.top ? parseInt(req.query.top as string) : 3;
    const products = await getTopCheapestAvailable(top);
    
    res.json({ 
      products,
      count: products.length,
      top 
    });
  } catch (error) {
    console.error('Error en GET /api/products/top/cheapest:', error);
    res.status(500).json({ 
      error: 'Error al obtener los productos más baratos',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
});

export default router;