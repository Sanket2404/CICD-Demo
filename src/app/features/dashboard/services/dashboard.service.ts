import { Injectable } from '@angular/core';
import { DashboardData } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getDashboardData(): Promise<DashboardData> {
    // Mock dashboard data with comprehensive information
    return Promise.resolve({
      metrics: [
        {
          id: '1',
          label: 'Active Users',
          value: 1234,
          icon: 'people',
          color: '#1976d2',
          trend: 'up',
          trendValue: '+12%',
          subtitle: 'Total registered users',
        },
        {
          id: '2',
          label: 'Total Revenue',
          value: '$45,320',
          icon: 'attach_money',
          color: '#4caf50',
          trend: 'up',
          trendValue: '+8%',
          subtitle: 'This month',
        },
        {
          id: '3',
          label: 'Pending Orders',
          value: 52,
          icon: 'shopping_cart',
          color: '#ff9800',
          trend: 'down',
          trendValue: '-3%',
          subtitle: 'Awaiting shipment',
        },
        {
          id: '4',
          label: 'Conversion Rate',
          value: '3.2%',
          icon: 'trending_up',
          color: '#e91e63',
          trend: 'neutral',
          trendValue: '0%',
          subtitle: 'Visitors to customers',
        },
      ],
      revenueChart: {
        series: [
          {
            name: 'Revenue',
            data: [12000, 15000, 18000, 21000, 24000, 28000, 32000, 35000, 38000, 41000, 44000, 45320],
          },
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      ordersChart: {
        series: [
          {
            name: 'Orders',
            data: [8, 12, 15, 18, 22, 28, 35, 40, 45, 48, 50, 52],
          },
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      usersChart: {
        series: [
          {
            name: 'New Users',
            data: [50, 65, 80, 95, 110, 140, 170, 200, 240, 280, 310, 350],
          },
        ],
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      recentActivities: [
        {
          id: '1',
          type: 'user_signup',
          title: 'New user registered',
          description: 'john.doe@example.com',
          timestamp: new Date(Date.now() - 2 * 60000),
          actor: 'System',
        },
        {
          id: '2',
          type: 'order_completed',
          title: 'Order completed',
          description: 'Order #12345 shipped',
          timestamp: new Date(Date.now() - 15 * 60000),
          actor: 'Admin',
        },
        {
          id: '3',
          type: 'payment_received',
          title: 'Payment received',
          description: '$1,200 from customer',
          timestamp: new Date(Date.now() - 30 * 60000),
          actor: 'Payment',
        },
        {
          id: '4',
          type: 'user_login',
          title: 'User login',
          description: 'Demo user logged in',
          timestamp: new Date(Date.now() - 45 * 60000),
          actor: 'System',
        },
      ],
      lastUpdated: new Date(),
    });
  }

  getMetrics(): Promise<unknown> {
    return Promise.resolve([]);
  }

  getActivities(): Promise<unknown> {
    return Promise.resolve([]);
  }
}
