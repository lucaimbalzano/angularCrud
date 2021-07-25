import { Component, OnInit } from '@angular/core';
import { Product } from '../product/product-model';
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts():void{
    this.productService.readDatabase()
      .subscribe(products => this.products = products)
  }


}
