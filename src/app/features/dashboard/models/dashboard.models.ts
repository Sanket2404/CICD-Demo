/**
 * Dashboard feature models
 */

export interface DashboardMetric {
  id: string;
  label: string;
  value: number | string;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  subtitle?: string;
}

export interface ChartData {
  series: { name: string; data: number[] }[];
  categories: string[];
}

export interface DashboardData {
  metrics: DashboardMetric[];
  revenueChart?: ChartData;
  ordersChart?: ChartData;
  usersChart?: ChartData;
  recentActivities: Activity[];
  lastUpdated: Date;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: Date;
  actor: string;
}
