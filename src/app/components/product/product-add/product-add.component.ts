
import { Component, TemplateRef, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Product } from '../product-model';
import { ProductService } from '../product.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
  }
  isValid = true;
  msg = this.isValid ? "Success to insert product" : "Failed to insert the product";
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private productService: ProductService, private router: Router,) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {

  }

  createProduct(): void {
    this.productService.createDatabase(this.product)
      .subscribe(
        data => {
          console.log(data);
          this.modalRef.hide();
          this.isValid = true;
          this.router.navigate(['/products'])
          window.location.reload()
        },
        error => {
          console.log(error);
          this.isValid = false;
        }
      );
  }


}
