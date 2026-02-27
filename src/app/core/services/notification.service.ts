import { Injectable, signal } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly notifications = signal<Notification[]>([]);
  readonly notifications$ = this.notifications.asReadonly();

  private id = 0;

  show(
    message: string,
    type: NotificationType = 'info',
    duration = 5000
  ): void {
    const id = `notification-${++this.id}`;
    const notification: Notification = { id, message, type, duration };

    this.notifications.update(notifs => [...notifs, notification]);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  dismiss(id: string): void {
    this.notifications.update(notifs =>
      notifs.filter(n => n.id !== id)
    );
  }

  dismissAll(): void {
    this.notifications.set([]);
  }
}
