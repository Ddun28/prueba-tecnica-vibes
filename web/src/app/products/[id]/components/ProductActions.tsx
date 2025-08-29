'use client';

interface ProductActionsProps {
  isAvailable: boolean;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ProductActions({
  isAvailable,
  isFavorite,
  onToggleFavorite,
  quantity,
  onIncrement,
  onDecrement
}: ProductActionsProps) {
  return (
    <div className="space-y-4">
      {isAvailable && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={onDecrement}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              −
            </button>
            <span className="px-4 py-3 font-medium">{quantity}</span>
            <button
              onClick={onIncrement}
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-gray-600">Disponible: 15 unidades</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          disabled={!isAvailable}
          className="flex-1 bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
        >
          <span>🛒</span>
          <span>{isAvailable ? 'Agregar al carrito' : 'Producto agotado'}</span>
        </button>
        
        <button
          onClick={onToggleFavorite}
          className={`px-6 py-4 rounded-xl border transition-all duration-200 flex items-center justify-center space-x-2 ${
            isFavorite
              ? 'border-red-500 bg-red-50 text-red-600'
              : 'border-gray-300 hover:border-gray-400 bg-white text-gray-700'
          }`}
        >
          <span className="text-xl">{isFavorite ? '❤️' : '♡'}</span>
          <span>{isFavorite ? 'En favoritos' : 'Favorito'}</span>
        </button>
      </div>
    </div>
  );
}