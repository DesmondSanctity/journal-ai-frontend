import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
 token: string | null;
 user: {
  id: string;
  email: string;
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
    const response = await fetch('http://localhost:8787/api/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    set({ token: data.token, user: data.user });
   },
   register: async (name, email, password) => {
    const response = await fetch('http://localhost:8787/api/auth/register', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    set({ token: data.token, user: data.user });
   },
   logout: () => set({ token: null, user: null }),
  }),
  {
   name: 'auth-storage',
  }
 )
);
