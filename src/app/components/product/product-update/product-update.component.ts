import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product-model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: Product;
  isValid = true;
  msg = this.isValid ? "Success to update product " : "Failed to update the product ";
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, 
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute 
              ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    console.log(id);
    this.productService.readDatabaseById(id)
          .subscribe(product => this.product = product)
  }

  updateProduct():void{
    this.productService.updateDatabase(this.product)
      .subscribe(p => {
        this.isValid = true;
        this.router.navigate(['/products'])
      })
  }

  showMessage():string{
    return this.msg +" "+ this.product.name;
  }

}
