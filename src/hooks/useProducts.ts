import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { MOCK_PRODUCTS } from '../api/mockData';
import type { Product } from '../types';

export const useProducts = (categoryId?: number) => {
  return useQuery<Product[]>({
    queryKey: ['products', categoryId],
    queryFn: async () => {
      try {
        const url = categoryId ? `/products?categoryId=${categoryId}` : '/products';
        const { data } = await apiClient.get(url);
        return data;
      } catch {
        if (categoryId) return MOCK_PRODUCTS.filter(p => p.categoryId === categoryId);
        return MOCK_PRODUCTS;
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData: categoryId
      ? MOCK_PRODUCTS.filter(p => p.categoryId === categoryId)
      : MOCK_PRODUCTS,
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get(`/products/${id}`);
        return data;
      } catch {
        const found = MOCK_PRODUCTS.find(p => p.id === id);
        if (!found) throw new Error('Mahsulot topilmadi');
        return found;
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData: MOCK_PRODUCTS.find(p => p.id === id),
  });
};
