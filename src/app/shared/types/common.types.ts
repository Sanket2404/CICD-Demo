/**
 * Common types used across the application
 */

export interface PageMeta {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
}

export interface Breadcrumb {
  label: string;
  url: string;
}

export interface TableState<T> {
  items: T[];
  total: number;
  loading: boolean;
  error: string | null;
}
