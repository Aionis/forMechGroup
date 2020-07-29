import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { Subject, Observable } from 'rxjs';
import { Router, CanDeactivate } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input() product: Product;
  @Output() productSubmit = new Subject<Product>();
  @Output() closeForm = new Subject();
  productForm: FormGroup;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'name': new FormControl(this.product?.name, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      'price': new FormControl(this.product?.price, [Validators.required, Validators.max(1000000)]),
      'countLeft': new FormControl(this.product?.countLeft, [Validators.required, Validators.max(100)])
    })

  }
  onSubmit() {
    this.productSubmit.next(this.productForm.value as Product)
  }
  onClose() {
    this.product ? this.closeForm.next() : this.router.navigate(['/products']);
  }
}
