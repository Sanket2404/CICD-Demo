import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  type?: 'warning' | 'error' | 'info';
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly data = input<ConfirmDialogData>(
    {
      title: 'Confirm',
      message: 'Are you sure?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      type: 'info',
    },
    {
      alias: 'dialogData',
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) dialogData: ConfirmDialogData | null
  ) {
    if (dialogData) {
      // Data passed through dialog service
    }
  }
}
