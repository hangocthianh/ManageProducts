import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '../models/products';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  productsObs = this.productsSubject.asObservable();

  constructor(private apiService: ApiService) {}

  getProducts(): Observable<Product[]> {
    const url = `products`;
    return this.apiService.get<Product[]>(url).pipe(
      tap((result) => {
        this.productsSubject.next(result);
      })
    );
  }

  getProductsFilter(name: string, categoryId: string): Observable<Product[]> {
    const url = `products?name_like=${name}&categoryId_like=${categoryId}`;
    return this.apiService.get<Product[]>(url);
  }
  createProduct(body: object): Observable<Product> {
    console.log(body);
    const url = `products`;
    return this.apiService.post<Product>(url, body);
  }
  getProductDetail(id: string): Observable<Product> {
    const url = `products/${id}`;
    return this.apiService.get<Product>(url);
  }
  updateProduct(id: string, body: object): Observable<Product> {
    console.log(id, body);
    const url = `products/${id}`;
    return this.apiService.put<Product>(url, body);
  }
  deleteProduct(id: string): Observable<Product> {
    const url = `products/${id}`;
    return this.apiService.delete<Product>(url, id);
  }
}
