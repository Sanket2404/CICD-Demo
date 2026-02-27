import { signal, computed } from '@angular/core';
import { DashboardData, DashboardMetric, Activity, ChartData } from '../models/dashboard.models';

export interface DashboardStore {
  data: DashboardData | null;
  metrics: DashboardMetric[];
  activities: Activity[];
  revenueChart?: ChartData;
  ordersChart?: ChartData;
  usersChart?: ChartData;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardStore = {
  data: null,
  metrics: [],
  activities: [],
  isLoading: false,
  error: null,
};

export function createDashboardSignals() {
  const store = signal<DashboardStore>(initialState);

  return {
    store: store.asReadonly(),
    data: computed(() => store().data),
    metrics: computed(() => store().metrics),
    activities: computed(() => store().activities),
    revenueChart: computed(() => store().revenueChart),
    ordersChart: computed(() => store().ordersChart),
    usersChart: computed(() => store().usersChart),
    isLoading: computed(() => store().isLoading),
    error: computed(() => store().error),

    setLoading: (loading: boolean) => {
      store.update(s => ({ ...s, isLoading: loading }));
    },

    setData: (data: DashboardData) => {
      store.update(s => ({
        ...s,
        data,
        metrics: data.metrics,
        activities: data.recentActivities,
        revenueChart: data.revenueChart,
        ordersChart: data.ordersChart,
        usersChart: data.usersChart,
        error: null,
        isLoading: false,
      }));
    },

    setError: (error: string) => {
      store.update(s => ({ ...s, error, isLoading: false }));
    },

    reset: () => {
      store.set(initialState);
    },
  };
}

