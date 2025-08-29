'use client';

import { Product } from '@shared/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const imageUrl = imageError 
    ? '/placeholder-image.jpg' 
    : product.image || '/placeholder-image.jpg';

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 min-w-[250px] h-full flex flex-col overflow-hidden border border-gray-100 hover:border-blue-200">
      <div className="relative h-50 w-full flex-shrink-0">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
          priority={false}
        />

        <button
          onClick={toggleFavorite}
          disabled={!product.isAvailable}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={product.isAvailable ? 
            (isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos') : 
            'Producto no disponible'}
        >
          <span className={`text-lg transition-colors duration-200 ${
            isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}>
            {isFavorite ? '❤️' : '♡'}
          </span>
        </button>

        {!product.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">

        <h3 className="font-semibold text-base mb-2 text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-bold text-blue-600">
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
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>
        
        <div className="flex space-x-2 mt-auto">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium text-center"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}