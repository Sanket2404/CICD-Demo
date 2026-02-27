import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { NotificationService } from '../services';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptorService {
  private activeRequests = 0;
  private readonly notificationService = inject(NotificationService);

  get isLoading(): boolean {
    return this.activeRequests > 0;
  }
}

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Avoid intercepting specific requests
  if (req.url.includes('assets')) {
    return next(req);
  }

  return next(req).pipe(
    finalize(() => {
      // Track loading state here if needed
    })
  );
};
