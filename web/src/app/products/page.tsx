'use client';

import { useState, useEffect } from 'react';
import { Product, ProductsResponse } from '@shared/types';
import { api } from '@/app/lib/api';
import ProductCard from '../../../components/ProductCard';
import SearchFilters from '../../../components/SearchFilters';

type OrderType = 'asc' | 'desc';
type AvailabilityType = 'all' | 'available' | 'unavailable';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  });
  
  const [filters, setFilters] = useState({
    search: '',
    sort: 'name',
    order: 'asc' as OrderType,
    available: 'all' as AvailabilityType,
  });

  useEffect(() => {
    loadProducts();
  }, [filters, pagination.page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
        sort: filters.sort,
        order: filters.order
      };

      if (filters.search) {
        params.search = filters.search;
      }

      if (filters.available !== 'all') {
        params.available = filters.available === 'available';
      }

      const data: ProductsResponse = await api.getProducts(params);
      setProducts(data.products);
      setPagination({
        page: data.page,
        limit: data.limit,
        total: data.total,
        totalPages: data.totalPages,
        hasNext: data.hasNext,
        hasPrev: data.hasPrev
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-600 text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Nuestros Productos</h1>
        <p className="text-gray-600">Encuentra los mejores productos de seguridad industrial</p>
      </div>
      
      <SearchFilters
        filters={{ ...filters, page: pagination.page, limit: pagination.limit }}
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron productos</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center space-x-4 mb-4">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={!pagination.hasPrev}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors"
            >
              Anterior
            </button>
            
            <span className="text-gray-600 font-medium">
              Página {pagination.page} de {pagination.totalPages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={!pagination.hasNext}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            Mostrando {products.length} de {pagination.total} productos
          </div>
        </>
      )}
    </div>
  );
}