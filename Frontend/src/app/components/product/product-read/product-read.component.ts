import { Component, OnInit } from '@angular/core';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  products: Product[];
  product: Product;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  retrieveData(): void {
    this.productService.readDatabase()
      .subscribe(
        data => {
          this.products = data;
          console.log("##GET##");
          console.log(data);
        },
        error => {
          console.log("###ERROR##" + error);
        }
      );
  }


}
