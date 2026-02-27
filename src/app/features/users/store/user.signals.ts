import { signal, computed } from '@angular/core';
import { UserItem } from '../models/user.models';
import { PaginatedResponse } from '../../../core/models';

export interface UsersStore {
  users: UserItem[];
  total: number;
  page: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersStore = {
  users: [],
  total: 0,
  page: 1,
  pageSize: 10,
  isLoading: false,
  error: null,
};

export function createUsersSignals() {
  const store = signal<UsersStore>(initialState);

  return {
    store: store.asReadonly(),
    users: computed(() => store().users),
    total: computed(() => store().total),
    page: computed(() => store().page),
    pageSize: computed(() => store().pageSize),
    isLoading: computed(() => store().isLoading),
    error: computed(() => store().error),

    setLoading: (loading: boolean) => {
      store.update(s => ({ ...s, isLoading: loading }));
    },

    setUsers: (data: PaginatedResponse<UserItem>) => {
      store.update(s => ({
        ...s,
        users: data.items,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
        error: null,
      }));
    },

    setError: (error: string) => {
      store.update(s => ({ ...s, error, isLoading: false }));
    },

    addUser: (user: UserItem) => {
      store.update(s => ({
        ...s,
        users: [...s.users, user],
        total: s.total + 1,
      }));
    },

    updateUser: (id: string, updates: Partial<UserItem>) => {
      store.update(s => ({
        ...s,
        users: s.users.map(u => (u.id === id ? { ...u, ...updates } : u)),
      }));
    },

    deleteUser: (id: string) => {
      store.update(s => ({
        ...s,
        users: s.users.filter(u => u.id !== id),
        total: s.total - 1,
      }));
    },

    reset: () => {
      store.set(initialState);
    },
  };
}
