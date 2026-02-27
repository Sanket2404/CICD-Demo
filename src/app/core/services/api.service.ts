import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiResponse, PaginationParams, PaginatedResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  get<T>(endpoint: string): Promise<T> {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`)
      .toPromise()
      .then(response => response?.data || ({} as T));
  }

  post<T>(endpoint: string, body: unknown): Promise<T> {
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body)
      .toPromise()
      .then(response => response?.data || ({} as T));
  }

  put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, body)
      .toPromise()
      .then(response => response?.data || ({} as T));
  }

  delete<T>(endpoint: string): Promise<T> {
    return this.http
      .delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`)
      .toPromise()
      .then(response => response?.data || ({} as T));
  }

  getPaginated<T>(
    endpoint: string,
    params: PaginationParams
  ): Promise<PaginatedResponse<T>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('pageSize', params.pageSize);

    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    return this.http
      .get<ApiResponse<PaginatedResponse<T>>>(`${this.baseUrl}${endpoint}`, {
        params: httpParams,
      })
      .toPromise()
      .then(
        response =>
          response?.data || {
            items: [],
            total: 0,
            page: 1,
            pageSize: 10,
            hasMore: false,
          }
      );
  }
}
