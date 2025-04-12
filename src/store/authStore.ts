import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, LoginCredentials, RegisterData, User, UserRole } from '../types';

// Mock admin and users data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@packnbake.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as UserRole,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
    role: 'user' as UserRole,
  },
];

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      // Check if user is already authenticated
      checkAuthStatus: () => {
        const state = get();
        set({
          isLoading: false,
          isAuthenticated: !!state.user,
        });
      },

      // Login function
      login: async (credentials: LoginCredentials) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find user with matching credentials
        const user = MOCK_USERS.find(
          u => u.email === credentials.email && u.password === credentials.password
        );
        
        if (user) {
          // Create a sanitized user object (without password)
          const authenticatedUser: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
          
          set({
            user: authenticatedUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          return true;
        }
        
        return false;
      },

      // Register function
      register: async (data: RegisterData) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Check if email is already in use
        if (MOCK_USERS.some(u => u.email === data.email)) {
          return false;
        }
        
        // In a real app, you would send this data to your backend
        // Here we're just simulating a successful registration
        const newUser: User = {
          id: `${MOCK_USERS.length + 1}`,
          email: data.email,
          name: data.name,
          role: 'user', // New users are always regular users
        };
        
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      },

      // Logout function
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // Name for localStorage
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
); 