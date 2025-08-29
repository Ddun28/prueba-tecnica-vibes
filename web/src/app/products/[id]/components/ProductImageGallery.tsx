'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageGalleryProps {
  productName: string;
  mainImage: string;
  additionalImages?: string[];
  isAvailable: boolean;
}

export default function ProductImageGallery({ 
  productName, 
  mainImage, 
  additionalImages = [], 
  isAvailable 
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const allImages = [mainImage, ...additionalImages];
  const displayImage = imageError ? '/placeholder-image.jpg' : allImages[selectedImage];

  return (
    <div className="space-y-6">
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg">
        <div className="relative h-96 w-full">
          <Image
            src={displayImage}
            alt={productName}
            fill
            className="object-cover"
            onError={handleImageError}
            priority
          />
          {!isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <span className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold">
                Agotado
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}