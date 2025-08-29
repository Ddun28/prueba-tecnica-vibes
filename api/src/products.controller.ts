import { Product, ProductsQueryParams, ProductsResponse } from '../../shared/types';
import productsData from './data/products.json';

// Cargar productos desde el JSON
const products: Product[] = productsData as Product[];

// Función para obtener productos con filtros
export const getProducts = async (params: ProductsQueryParams): Promise<ProductsResponse> => {
  let filteredProducts = [...products];

  // Filtrar por búsqueda
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  }

  // Filtrar por disponibilidad
  if (params.available !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.isAvailable === params.available
    );
  }

  // Filtrar por categoría
  if (params.category) {
    filteredProducts = filteredProducts.filter(product =>
      product.category.toLowerCase() === params.category?.toLowerCase()
    );
  }

  // Ordenar
  if (params.sort) {
    const order = params.order || 'asc';
    filteredProducts.sort((a, b) => {
      let aValue: any = a[params.sort!];
      let bValue: any = b[params.sort!];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginación
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredProducts.length / limit);

  return {
    products: paginatedProducts,
    total: filteredProducts.length,
    page,
    limit,
    totalPages,
    hasNext: endIndex < filteredProducts.length,
    hasPrev: startIndex > 0
  };
};

// Función para obtener un producto por ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  return products.find(product => product.id === id);
};

// Función para obtener los productos más baratos disponibles
export const getTopCheapestAvailable = async (top: number = 3): Promise<Product[]> => {
  return products
    .filter(product => product.isAvailable)
    .sort((a, b) => a.price - b.price)
    .slice(0, top);
};