'use client';

import { Product } from '@shared/types';

interface ProductInfoProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductInfo({ 
  product, 
  isFavorite, 
  onToggleFavorite 
}: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div>

        <h1 className="text-xl font-bold text-gray-900 mb-4"> 
          {product.name}
        </h1>
        
        <div className="flex items-center space-x-4 mb-6">

          <span className="text-lg font-bold text-blue-600"> 
            ${product.price}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            product.isAvailable 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {product.isAvailable ? 'En stock' : 'Sin stock'}
          </span>
        </div>

        <p className="text-gray-700 leading-relaxed mb-6">
          {product.description}
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Detalles del producto</h3>
        <div className="grid grid-cols-1 gap-3 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-600 mb-1">Categoría</span>
            <span className="font-medium text-gray-900 capitalize">{product.category}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 mb-1">Disponibilidad</span>
            <span className="font-medium text-gray-900">
              {product.isAvailable ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">

        <button
          onClick={onToggleFavorite}
          className={`px-6 py-3 rounded-lg border transition-all duration-200 flex items-center justify-center space-x-2 ${
            isFavorite
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
          }`}
        >
          <span className="text-xl">{isFavorite ? '❤️' : '♡'}</span>
          <span>{isFavorite ? 'En favoritos' : 'Agregar a favoritos'}</span>
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-center space-x-2 text-blue-800 text-sm">
          <span>🚚</span>
          <span>Envío gratis en 2-3 días</span>
        </div>
      </div>
    </div>
  );
}