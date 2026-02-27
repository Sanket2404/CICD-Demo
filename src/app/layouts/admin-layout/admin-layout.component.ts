import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent, FooterComponent } from '../../shared/components';

interface DashboardCard {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'accent' | 'warn';
  trend?: number;
  status?: 'success' | 'warning' | 'error';
}

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  timestamp: Date;
  user: string;
  icon: string;
}

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatDividerModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  readonly sidebarOpen = signal(true);
  // Hide layout's dashboard summary — feature routes manage their own content
  readonly showDashboard = signal(false);

  readonly menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      label: 'Users',
      icon: 'people',
      route: '/users',
    },
    {
      label: 'Settings',
      icon: 'settings',
      route: '/settings',
    },
  ];

  readonly dashboardCards = signal<DashboardCard[]>([
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      icon: 'trending_up',
      color: 'primary',
      trend: 20.1,
      status: 'success',
    },
    {
      title: 'Active Users',
      value: '2,543',
      icon: 'people',
      color: 'accent',
      trend: 15.3,
      status: 'success',
    },
    {
      title: 'Total Orders',
      value: '1,254',
      icon: 'shopping_cart',
      color: 'warn',
      trend: -4.3,
      status: 'warning',
    },
    {
      title: 'System Load',
      value: '68%',
      icon: 'cloud',
      color: 'primary',
      trend: 5.2,
      status: 'success',
    },
  ]);

  readonly recentActivities = signal<ActivityItem[]>([
    {
      id: 1,
      title: 'New user registered',
      description: 'John Doe created a new account',
      timestamp: new Date(Date.now() - 15 * 60000),
      user: 'System',
      icon: 'person_add',
    },
    {
      id: 2,
      title: 'Order completed',
      description: 'Order #12345 has been shipped',
      timestamp: new Date(Date.now() - 45 * 60000),
      user: 'Admin',
      icon: 'check_circle',
    },
    {
      id: 3,
      title: 'Payment received',
      description: 'Payment of $1,250 received from Customer ABC',
      timestamp: new Date(Date.now() - 2 * 3600000),
      user: 'System',
      icon: 'paid',
    },
    {
      id: 4,
      title: 'System maintenance',
      description: 'Database backup completed successfully',
      timestamp: new Date(Date.now() - 5 * 3600000),
      user: 'Admin',
      icon: 'settings',
    },
  ]);

  readonly notificationCount = computed(
    () => this.recentActivities().length
  );

  protected readonly Math = Math;

  onToggleSidebar(): void {
    this.sidebarOpen.update(open => !open);
  }
}
