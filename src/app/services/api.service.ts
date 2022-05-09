import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/libs/api.interface';
import { urlJoin } from '../shared/libs/url-join';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: ApiOptions): Observable<ApiResponse<T>> {
    url = this.updateUrl(url);
    return this.http.get<ApiResponse<T>>(url, options);
  }

  post<T>(url: string, body?: unknown, options?: ApiOptions) {
    url = this.updateUrl(url);
    return this.http.post<ApiResponse<T>>(url, body, options);
  }

  put<T>(url: string, body?: unknown, options?: ApiOptions) {
    url = this.updateUrl(url);
    return this.http.put<ApiResponse<T>>(url, body, options);
  }

  delete<T>(url: string, body?: unknown) {
    url = this.updateUrl(url);
    return this.http.delete<ApiResponse<T>>(url, { body });
  }

  updateUrl(url: string) {
    return environment.apiUrl ? urlJoin(environment.apiUrl, url) : url;
    // return url;
  }
}

interface ApiOptions {
  params?: HttpParams | Record<string, string | string[]>;
}
