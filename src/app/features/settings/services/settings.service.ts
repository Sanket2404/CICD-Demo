import { Injectable, effect, signal } from '@angular/core';
import { AppSettings } from '../models/settings.models';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly settings = signal<AppSettings>({
    theme: 'light',
    language: 'en',
    notifications: true,
    emailNotifications: true,
    sidebarCollapsed: false,
  });

  readonly settings$ = this.settings.asReadonly();

  constructor() {
    // Load settings from localStorage
    effect(() => {
      const saved = localStorage.getItem('app_settings');
      if (saved) {
        try {
          this.settings.set(JSON.parse(saved));
        } catch (error) {
          console.warn('Failed to parse saved settings', error);
        }
      }
    });

    // Persist settings to localStorage
    effect(() => {
      localStorage.setItem('app_settings', JSON.stringify(this.settings()));
    });
  }

  /**
   * Returns the current settings stored in the signal.
   * Mimics a backend call with a resolved promise.
   */
  getSettings(): Promise<AppSettings> {
    return Promise.resolve(this.settings());
  }

  /**
   * Updates settings locally and returns a resolved promise.
   */
  updateSettings(settings: Partial<AppSettings>): Promise<unknown> {
    this.settings.update(s => ({ ...s, ...settings }));
    return Promise.resolve(settings);
  }

  toggleTheme(): void {
    this.settings.update(s => ({
      ...s,
      theme: s.theme === 'light' ? 'dark' : 'light',
    }));
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.settings.update(s => ({ ...s, theme }));
  }
}
