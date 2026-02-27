import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerComponent } from '../../../../shared/components';
import { DashboardService } from '../../services/dashboard.service';
import { createDashboardSignals } from '../../store/dashboard.signals';
import { DashboardMetricComponent } from '../../components/dashboard-metric/dashboard-metric.component';
import { RevenueChartComponent } from '../../components/revenue-chart/revenue-chart.component';
import { OrdersChartComponent } from '../../components/orders-chart/orders-chart.component';
import { UsersChartComponent } from '../../components/users-chart/users-chart.component';


@Component({
  selector: 'app-dashboard-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    LoadingSpinnerComponent,
    DashboardMetricComponent,
    RevenueChartComponent,
    OrdersChartComponent,
    UsersChartComponent,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardOverviewComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  private readonly store = createDashboardSignals();

  readonly metrics = this.store.metrics;
  readonly activities = this.store.activities;
  readonly revenueChart = this.store.revenueChart;
  readonly ordersChart = this.store.ordersChart;
  readonly usersChart = this.store.usersChart;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;

  ngOnInit(): void {
    this.loadDashboard();
  }

  private loadDashboard(): void {
    this.store.setLoading(true);

    this.dashboardService
      .getDashboardData()
      .then(data => {
        this.store.setData(data);
      })
      .catch(error => {
        this.store.setError(error instanceof Error ? error.message : 'Unknown error');
      });
  }

  onRefresh(): void {
    this.loadDashboard();
  }
}
