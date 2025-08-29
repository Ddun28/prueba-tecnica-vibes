import express from 'express';
import { getProducts, getProductById, getTopCheapestAvailable } from './products.controller';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await getProducts({
      search: req.query.search as string,
      sort: req.query.sort as string,
      order: req.query.order as string,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 10,
      available: req.query.available ? req.query.available === 'true' : undefined,
      category: req.query.category as string
    });
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ product });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.get('/top/cheapest', async (req, res) => {
  try {
    const top = req.query.top ? parseInt(req.query.top as string) : 3;
    const products = await getTopCheapestAvailable(top);
    
    res.json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

export default router;