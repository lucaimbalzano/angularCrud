import { Component, TemplateRef,OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product:Product;
  constructor(private modalService: BsModalService, 
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute 
    ) { }

  isValid = true;
  msg = this.isValid ? "Success to delete the product" : "Failed to delete the product";
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readDatabaseById(id)
          .subscribe(product => 
                this.product = product
            )
  }

  deleteProduct(): void{
      this.productService.deleteById(this.product.id).subscribe(p => {
        this.isValid = true;
        this.router.navigate(['/products'])
      })
  }

}
