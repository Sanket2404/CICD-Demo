import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { UserService } from '../../services/user.service';
import { createUsersSignals } from '../../store/user.signals';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly store = createUsersSignals();

  readonly users = this.store.users;
  readonly total = this.store.total;
  readonly page = this.store.page;
  readonly pageSize = this.store.pageSize;
  readonly isLoading = this.store.isLoading;
  readonly error = this.store.error;

  readonly displayedColumns = ['name', 'email', 'role', 'status', 'actions'];
  readonly isDeleting = signal(false);

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.store.setLoading(true);

    this.userService
      .getUsers({
        page: this.page(),
        pageSize: this.pageSize(),
      })
      .then(data => {
        this.store.setUsers(data);
      })
      .catch(error => {
        this.store.setError(error instanceof Error ? error.message : 'Unknown error');
      });
  }

  onPageChange(event: PageEvent): void {
    this.store.setLoading(true);

    this.userService
      .getUsers({
        page: event.pageIndex + 1,
        pageSize: event.pageSize,
      })
      .then(data => {
        this.store.setUsers(data);
      })
      .catch(error => {
        this.store.setError(error instanceof Error ? error.message : 'Unknown error');
      });
  }

  onDelete(id: string, name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.isDeleting.set(true);
      this.userService
        .deleteUser(id)
        .then(() => {
          this.store.deleteUser(id);
        })
        .catch(error => {
          this.store.setError(error instanceof Error ? error.message : 'Delete failed');
          this.isDeleting.set(false);
        })
        .finally(() => {
          setTimeout(() => {
            this.isDeleting.set(false);
          }, 500);
        });
    }
  }
}
