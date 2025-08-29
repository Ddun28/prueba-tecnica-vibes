'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Product } from '@shared/types';
import { api } from '@/app/lib/api';
import Link from 'next/link';
import ProductImageGallery from '@/app/products/[id]/components/ProductImageGallery';
import ProductInfo from '@/app/products/[id]/components/ProductInfo';
import LoadingSkeleton from '@/app/products/[id]/components/LoadingSkeleton';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const productData = await api.getProductById(productId);
      setProduct(productData);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.message === 'NOT_FOUND') {
        notFound(); 
      } else {
        setError(err instanceof Error ? err.message : 'Error al cargar el producto');
      }
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (loading) return <LoadingSkeleton />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="container mx-auto px-4 max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-6xl mb-4">😢</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h1>
            <p className="text-gray-600 mb-8">
              {error || 'El producto que buscas no existe o ha sido removido.'}
            </p>
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold inline-block"
            >
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const additionalImages = [
    'https://images.unsplash.com/photo-1581993192008-63fd1ea7de1a?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574323347407-f5e1ad6d5b2a?w=400&h=300&fit=crop'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">

        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          <span>›</span>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Productos</Link>
          <span>›</span>
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <ProductImageGallery
            productName={product.name}
            mainImage={product.image || '/placeholder-image.jpg'}
            additionalImages={additionalImages}
            isAvailable={product.isAvailable}
          />

          <ProductInfo
            product={product}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            <span>←</span>
            <span>Volver a todos los productos</span>
          </Link>
        </div>
      </div>
    </div>
  );
}