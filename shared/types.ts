export interface Product {
  id: string;
  name: string;
  price: number;
  isAvailable: boolean;
  category: string;
  image: string;
  description?: string;
 
  sku?: string;
  stock?: number;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsQueryParams {
  search?: string;
  sort?: 'price' | 'name' | 'rating' | 'createdAt';
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  available?: boolean;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductResponse {
  product: Product;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp?: string;
}

export interface GetTopCheapestAvailableParams {
  products: Product[];
  top?: number;
}

export interface SortOption {
  value: string;
  label: string;
  field: string;
  order: 'asc' | 'desc';
}

export interface FilterOption {
  id: string;
  name: string;
  type: 'checkbox' | 'radio' | 'range';
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FilterState {
  search: string;
  category: string;
  available: boolean | null;
  minPrice: number;
  maxPrice: number;
  sort: string;
  order: 'asc' | 'desc';
}

export interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: FilterState;
  pagination: PaginationState;
  setFilters: (filters: Partial<FilterState>) => void;
  setPage: (page: number) => void;
  refreshProducts: () => void;
}

export interface ProductCardProps {
  product: Product;
  className?: string;
  onAddToFavorites?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
}

export interface ProductListProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
}

export interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: PaginationState;
  refetch: () => void;
}

export interface SearchFormValues {
  search: string;
  category: string;
  available: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
  order: string;
}

export enum ProductCategory {
  GLOVES = 'gloves',
  HEADGEAR = 'headgear',
  BAG = 'bag',
  CLOTHING = 'clothing',
  EYEWEAR = 'eyewear',
  FOOTWEAR = 'footwear',
  SAFETY = 'safety',
  HEARING = 'hearing',
  TOOLS = 'tools'
}

export enum AvailabilityStatus {
  ALL = 'all',
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable'
}

export interface TopCheapestResponse {
  products: Product[];
  count: number;
  top: number;
  totalAvailable: number;
}