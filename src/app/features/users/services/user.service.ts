import { Injectable, signal } from '@angular/core';
import { UserItem, UserDetail, CreateUserRequest, UpdateUserRequest } from '../models/user.models';
import { PaginationParams, PaginatedResponse } from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Mock data store
  private mockUsers = signal<UserItem[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'active',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Manager',
      status: 'active',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'User',
      status: 'inactive',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Editor',
      status: 'active',
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '5',
      name: 'Tom Brown',
      email: 'tom@example.com',
      role: 'Viewer',
      status: 'pending',
      createdAt: new Date('2024-02-20'),
    },
  ]);

  getUsers(params: PaginationParams): Promise<PaginatedResponse<UserItem>> {
    return Promise.resolve().then(() => {
      const allUsers = this.mockUsers();
      const start = (params.page - 1) * params.pageSize;
      const end = start + params.pageSize;
      const items = allUsers.slice(start, end);

      return {
        items,
        total: allUsers.length,
        page: params.page,
        pageSize: params.pageSize,
        hasMore: end < allUsers.length,
      };
    });
  }

  getUserById(id: string): Promise<UserDetail> {
    return Promise.resolve().then(() => {
      const user = this.mockUsers().find(u => u.id === id);
      if (!user) {
        throw new Error('User not found');
      }
      return {
        ...user,
        lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000),
        department: 'Engineering',
        phone: '+1-555-0123',
      };
    });
  }

  createUser(data: CreateUserRequest): Promise<UserItem> {
    return Promise.resolve().then(() => {
      const newUser: UserItem = {
        id: String(Date.now()),
        name: data.name,
        email: data.email,
        role: data.role,
        status: 'pending',
        createdAt: new Date(),
      };

      this.mockUsers.update(users => [...users, newUser]);
      return newUser;
    });
  }

  updateUser(id: string, data: UpdateUserRequest): Promise<UserItem> {
    return Promise.resolve().then(() => {
      let updated: UserItem | undefined;
      this.mockUsers.update(users =>
        users.map(u => {
          if (u.id === id) {
            updated = {
              ...u,
              ...data,
            };
            return updated;
          }
          return u;
        })
      );

      if (!updated) {
        throw new Error('User not found');
      }
      return updated;
    });
  }

  deleteUser(id: string): Promise<void> {
    return Promise.resolve().then(() => {
      this.mockUsers.update(users => users.filter(u => u.id !== id));
    });
  }
}
