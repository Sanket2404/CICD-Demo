import { Injectable, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signal, computed } from '@angular/core';
import {
  User,
  LoginRequest,
  AuthState,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);

  private readonly authState = signal<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  readonly user = computed(() => this.authState().user);
  readonly isAuthenticated = computed(
    () => this.authState().isAuthenticated
  );
  readonly isLoading = computed(() => this.authState().isLoading);
  readonly error = computed(() => this.authState().error);

  constructor() {
    // Restore auth state from localStorage on init
    effect(() => {
      const savedToken = localStorage.getItem('auth_token');
      const savedUser = localStorage.getItem('auth_user');

      if (savedToken && savedUser) {
        try {
          const user = JSON.parse(savedUser) as User;
          this.authState.update(state => ({
            ...state,
            user,
            isAuthenticated: true,
          }));
        } catch (error) {
          this.logout();
        }
      }
    });

    // Persist auth state to localStorage
    effect(() => {
      const state = this.authState();
      if (state.isAuthenticated && state.user) {
        localStorage.setItem('auth_user', JSON.stringify(state.user));
      } else {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    });
  }

  login(credentials: LoginRequest): Promise<User> {
    this.authState.update(state => ({ ...state, isLoading: true, error: null }));

    // Mock login - simulate API call with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyUser: User = {
          id: '1',
          email: credentials.email,
          name: 'Demo User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
          roles: ['admin'],
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const dummyToken = 'dummy-jwt-token-' + Date.now();
        localStorage.setItem('auth_token', dummyToken);

        this.authState.update(state => ({
          ...state,
          user: dummyUser,
          isAuthenticated: true,
          isLoading: false,
        }));

        resolve(dummyUser);
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    this.authState.set({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    this.router.navigate(['/auth/login']).catch(() => {
      // Navigate to login
    });
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
