import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '../models/products';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  cateObs = this.categoriesSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getCategories(): Observable<Category[]> {
    const url = 'categories';
    return this.apiService.get<Category[]>(url, {}).pipe(
      tap((result) => {
        this.categoriesSubject.next(result);
      })
    );
  }
}
