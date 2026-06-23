import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import type { User } from '../types';

interface LoginCredentials { email: string; password: string; }
interface RegisterCredentials { email: string; password: string; name: string; }

const LOCAL_USERS_KEY = 'mockUsers';

const getLocalUsers = (): (User & { password: string })[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const saveLocalUsers = (users: (User & { password: string })[]) => {
  localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
};

export const useCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  const accessToken = localStorage.getItem('accessToken');

  return useQuery<User>({
    queryKey: ['currentUser', userId],
    queryFn: async () => {
      // Local fallback first (works without backend)
      const localUsers = getLocalUsers();
      const local = localUsers.find(u => String(u.id) === userId);
      if (local) {
        const { password: _password, ...user } = local;
        void _password;
        return user;
      }
      try {
        const { data } = await apiClient.get(`/users/${userId}`);
        return data;
      } catch {
        throw new Error('Foydalanuvchi topilmadi');
      }
    },
    enabled: !!accessToken && !!userId,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      // Try real server first
      try {
        const { data } = await apiClient.post('/login', credentials);
        return data;
      } catch {
        // Fallback: local "fake" auth using localStorage
        const localUsers = getLocalUsers();
        const found = localUsers.find(
          u => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password
        );
        if (!found) {
          throw new Error('Email yoki parol noto\'g\'ri');
        }
        const { password: _password, ...user } = found;
        void _password;
        return { accessToken: `local-${found.id}-${Date.now()}`, user };
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.accessToken);
      localStorage.setItem('userId', String(data.user.id));
      queryClient.setQueryData(['currentUser', String(data.user.id)], data.user);
      navigate('/');
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      // Try real server first
      try {
        const { data } = await apiClient.post('/register', credentials);
        return data;
      } catch {
        // Fallback: local "fake" registration
        const localUsers = getLocalUsers();
        const exists = localUsers.some(u => u.email.toLowerCase() === credentials.email.toLowerCase());
        if (exists) {
          throw new Error('Bu email allaqachon ro\'yxatdan o\'tgan');
        }
        const newUser = {
          id: Date.now(),
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        };
        saveLocalUsers([...localUsers, newUser]);
        const { password: _password, ...user } = newUser;
        void _password;
        return { accessToken: `local-${newUser.id}-${Date.now()}`, user };
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.accessToken);
      localStorage.setItem('userId', String(data.user.id));
      queryClient.setQueryData(['currentUser', String(data.user.id)], data.user);
      navigate('/');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('cart'); localStorage.removeItem('favorites'); queryClient.clear();
    navigate('/');
  };
};
