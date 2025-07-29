import apiClient from './api-client';
import { User } from '../types/models';

export interface AuthResponse {
    token: string;
    user: User;
    message?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

const AuthService = {
    /**
     * Register a new user with email and password
     * @param userData Registration data
     * @returns Promise with auth response
     */
    register: async (userData: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', userData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    },

    /**
     * Login user with email and password
     * @param credentials Login credentials
     * @returns Promise with auth response
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    },

    /**
     * Initialize Google OAuth login
     */
    initiateGoogleLogin: (): void => {
        window.location.href = `${process.env.REACT_APP_API_URL}/api/auth/google`;
    },

    /**
     * Process the OAuth callback and store the token
     * @param token JWT token from OAuth callback
     */
    handleAuthCallback: (token: string): void => {
        localStorage.setItem('token', token);
    },

    /**
     * Get the currently logged in user
     * @returns Promise with user data
     */
    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<{ user: User }>('/auth/me');
        return response.data.user;
    },

    /**
     * Check if user is authenticated
     * @returns boolean
     */
    isAuthenticated: (): boolean => {
        return localStorage.getItem('token') !== null;
    },

    /**
     * Logout user
     */
    logout: (): void => {
        localStorage.removeItem('token');
    }
};

export default AuthService;