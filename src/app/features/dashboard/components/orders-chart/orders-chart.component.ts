import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '../../models/dashboard.models';

@Component({
  selector: 'app-orders-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="chart-placeholder">Orders chart</div>`,
  styles: [`.chart-placeholder{height:220px;display:flex;align-items:center;justify-content:center;color:rgba(0,0,0,0.6)}`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersChartComponent {
  readonly chartData = input.required<ChartData>();
}
