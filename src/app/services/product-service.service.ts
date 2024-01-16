import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';



@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(){
    return this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products');
  }
}
