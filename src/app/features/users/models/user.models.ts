/**
 * User feature models
 */

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  avatar?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}

export interface UserDetail extends UserItem {
  lastLogin?: Date;
  department?: string;
  phone?: string;
}
