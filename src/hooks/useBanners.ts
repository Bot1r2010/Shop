import { useQuery } from '@tanstack/react-query';
import apiClient from '../api/apiClient';
import { MOCK_BANNERS } from '../api/mockData';
import type { Banner } from '../types';

export const useBanners = () => {
  return useQuery<Banner[]>({
    queryKey: ['banners'],
    queryFn: async () => {
      try {
        const { data } = await apiClient.get('/banners');
        return data;
      } catch {
        return MOCK_BANNERS;
      }
    },
    staleTime: 5 * 60 * 1000,
    initialData: MOCK_BANNERS,
  });
};
