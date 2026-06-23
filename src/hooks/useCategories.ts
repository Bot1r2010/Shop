import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { MOCK_CATEGORIES } from '../api/mockData';
import type { Category } from '../types';

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('/categories');
        return data;
      } catch {
        return MOCK_CATEGORIES;
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData: MOCK_CATEGORIES,
  });
};
