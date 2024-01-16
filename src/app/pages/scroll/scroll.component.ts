import { CommonModule } from '@angular/common';
import { Component,  inject, signal } from '@angular/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {NavbarComponent} from './../../components/navbar/navbar.component';
import { Product } from '../../models/product.model';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-scroll',
  standalone: true,
  imports: [NavbarComponent, CommonModule, ScrollingModule],
  templateUrl: './scroll.component.html',
  styleUrl: './scroll.component.scss'
})
export class ScrollComponent {

  //private http = inject(HttpClient);

  products = signal<Product[]>([]);

  private productService = inject(ProductServiceService)

  //products:Product[]=[];

  constructor(){
  }


  ngOnInit():void {
    //normal
    /*this.productService.getProducts().subscribe(data =>{
        this.products = data;
    });*/

    //signal
    this.productService.getProducts().subscribe(data =>{
      this.products.set(data);
  });
  }

}
