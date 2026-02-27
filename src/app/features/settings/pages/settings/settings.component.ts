import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { SettingsService } from '../../services/settings.service';
import { LoadingSpinnerComponent } from '../../../../shared/components';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);

  readonly settings = this.settingsService.settings$;
  isLoading = false;

  ngOnInit(): void {
    this.loadSettings();
  }

  private loadSettings(): void {
    this.isLoading = true;
    this.settingsService
      .getSettings()
      .then()
      .catch(error => {
        console.error('Failed to load settings', error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  onSave(): void {
    const settings = this.settings();
    this.settingsService
      .updateSettings(settings)
      .then()
      .catch(error => {
        console.error('Failed to save settings', error);
      });
  }

  onThemeToggle(): void {
    this.settingsService.toggleTheme();
  }
}
