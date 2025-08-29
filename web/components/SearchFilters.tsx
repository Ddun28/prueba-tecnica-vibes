'use client';

import { useState } from 'react';

interface Filters {
  search: string;
  sort: string;
  order: 'asc' | 'desc';
  available: 'all' | 'available' | 'unavailable';
  page?: number;
  limit?: number;
}

interface SearchFiltersProps {
  filters: Filters;
  onSearch: (search: string) => void;
  onFilterChange: (filters: Partial<Filters>) => void;
}

export default function SearchFilters({ filters, onSearch, onFilterChange }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Filtros de búsqueda</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar productos
          </label>
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nombre, descripción..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 transition-colors"
            >
              🔍
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ordenar por
          </label>
          <select
            value={filters.sort}
            onChange={(e) => onFilterChange({ sort: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orden
          </label>
          <select
            value={filters.order}
            onChange={(e) => onFilterChange({ order: e.target.value as 'asc' | 'desc' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="asc">Ascendente (A-Z)</option>
            <option value="desc">Descendente (Z-A)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Disponibilidad
          </label>
          <select
            value={filters.available}
            onChange={(e) => onFilterChange({ available: e.target.value as 'all' | 'available' | 'unavailable' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Todos los productos</option>
            <option value="available">Solo disponibles</option>
            <option value="unavailable">Sin stock</option>
          </select>
        </div>
      </form>
    </div>
  );
}