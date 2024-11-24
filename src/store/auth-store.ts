import { API_URL } from '@/constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useJournalStore } from './journal-store';
import { useAnalyticsStore } from './analytics-store';
import toast from 'react-hot-toast';

interface AuthState {
 token: string | null;
 user: {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
 } | null;
 login: (email: string, password: string) => Promise<void>;
 register: (name: string, email: string, password: string) => Promise<void>;
 logout: () => void;
}

export const useAuthStore = create<AuthState>()(
 persist(
  (set) => ({
   token: null,
   user: null,
   login: async (email, password) => {
    try {
     const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
     });
     const data = await response.json();

     set({ token: data.data.token, user: data.data.user });

     toast.success('Login successful!');

     // Initialize other stores
     useJournalStore.getState().fetchEntries();
     useAnalyticsStore.getState().fetchAnalytics();
    } catch (error) {
     console.error('Login failed:', error);
     toast.error('Login failed. Please check your credentials.');
    }
   },
   register: async (name, email, password) => {
    try {
     const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
     });
     const data = await response.json();

     set({ token: data.token, user: data.user });

     toast.success('Registration successful! Please log in.');
    } catch (error) {
     console.log('Registration failed:', error);
     toast.error('Registration failed. Please try again.');
    }
   },
   logout: () => {
    set({ token: null, user: null });
    window.location.href = '/auth/login';
   },
  }),
  {
   name: 'auth-storage',
   storage: createJSONStorage(() => ({
    getItem: (name) => {
     const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith(name));
     return cookie ? cookie.split('=')[1] : null;
    },

    setItem: (name, value) => {
     document.cookie = `${name}=${value}; path=/`;
    },

    removeItem: (name) => {
     document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    },
   })),
  }
 )
);
