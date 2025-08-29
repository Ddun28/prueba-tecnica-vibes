import { Product, ProductsResponse, ProductsQueryParams }  from '@shared/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001';

export const api = {

  async getProducts(params?: ProductsQueryParams): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(`${API_BASE}/api/products?${queryParams}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }
    return response.json();
  },

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE}/api/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    const data = await response.json();
    return data.product;
  },

  async getTopCheapestProducts(top: number = 3): Promise<Product[]> {
    const response = await fetch(`${API_BASE}/api/products/top/cheapest?top=${top}`);
    if (!response.ok) {
      throw new Error('Error al obtener productos más baratos');
    }
    const data = await response.json();
    return data.products;
  }
};