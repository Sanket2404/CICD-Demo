import {
  Component,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DashboardMetric } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard-metric',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard-metric.component.html',
  styleUrl: './dashboard-metric.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMetricComponent {
  readonly metric = input.required<DashboardMetric>();
}
