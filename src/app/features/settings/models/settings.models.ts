/**
 * Application settings models
 */

export interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  emailNotifications: boolean;
  sidebarCollapsed: boolean;
}

export interface ThemeSettings {
  primaryColor: string;
  accentColor: string;
}
