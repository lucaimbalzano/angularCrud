import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product-model';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = 'http://localhost:4001/products';
  constructor(private http: HttpClient) { }

  readDatabase(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
      .pipe(
        map(result => result)
      )
  }

  readDatabaseById(id: string | number): Observable<Product> {
    const uri = `${this.url}/${id}`
    return this.http.get<Product>(uri)
      .pipe(
        map(result => result)
      )
  }

  updateDatabase(product: Product): Observable<Product> {
    const uri = `${this.url}//${product.id}`
    return this.http.put<Product>(uri, product)
      .pipe(
        map(result => result)
      )
  }

  createDatabase(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product)
      .pipe(
        map(result => result)
      )
  }

}
