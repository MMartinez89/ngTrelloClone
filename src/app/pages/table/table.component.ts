import { Component, inject, signal } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';
import {NavbarComponent} from './../../components/navbar/navbar.component'
import {ProductServiceService} from '../../services/product-service.service'
import { Product } from '../../models/product.model';
import {DataSourceProduct} from './data-source'
import {BtnComponent} from '../../components/btn/btn.component'
import {ReactiveFormsModule, FormControl} from '@angular/forms'
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CdkTableModule, NavbarComponent, BtnComponent, ReactiveFormsModule,],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  private productService = inject(ProductServiceService);
  input = new FormControl('', {nonNullable: true});
  //products = signal<Product[]>([]);
  //products: Product[] =[];
  dataSource = new DataSourceProduct;
  //columns =signal<string[]>(['id', 'title', 'price']);
  columns: string[] = ['#No', 'Name', 'price','cover', 'actions' ];
  total = 0;

  ngOnInit(): void {
   /* this.productService.getProducts().subscribe(data =>{
      this.products.set(data);
  });*/
  this.productService.getProducts().subscribe(data =>{
    this.dataSource.init(data);
    this.total =  this.dataSource.getTotal();
  });

  this.input.valueChanges.pipe(debounceTime(300)).subscribe(value =>{
    this.dataSource.find(value);
  });
  }

  update(product: Product){
    this.dataSource.update(product.id, {price: 20})
  }

}
