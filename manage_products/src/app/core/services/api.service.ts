import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {

    baseUrl: string='http://localhost:3000/api'
  constructor(private http: HttpClient) {}
  handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 500:
        // show notification lỗi

        break;
      case 401:
          // logout: xoá localStorage, redirect về login

        break;

      case 400:
        break;

      default:
        break;
    }
    return throwError(() => error);
  }

  get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, options).pipe(catchError(this.handleError));
  }
  post<T>(url: string, body:any,options = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`,body, options).pipe(catchError(this.handleError));
  }
  put<T>(url: string, body:any,options = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`,body, options).pipe(catchError(this.handleError));
  }
  delete<T>(url: string, options = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, options).pipe(catchError(this.handleError));
  }
  
}
