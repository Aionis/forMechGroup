import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) {}

  readonly connectionString = 'http://aionis.com/api';

  // Create
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.connectionString}/products`, product);
  }
  // Read
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.connectionString}/products`);
  }
  // Update
  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.connectionString}/products/${id}`, product);
  }
  // Delete
  deleteProduct(id: number): Observable<number> {
    return this.http.delete<number>(`${this.connectionString}/products/${id}`);
  }

}
