import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { Product } from 'src/app/models/product';
import * as fromActions from '../../../store/actions/product.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {

  @Input() product: Product;
  isEditMode: boolean;

  constructor(private readonly _store: Store<State>) {}

  onDelete(id: number) {
    this._store.dispatch(fromActions.deleteProduct({id}));
  }

  onUpdate(product: Partial<Product>, id: number) {
    this.isEditMode = false;
    this._store.dispatch(fromActions.updateProduct({ id, product}));
  }

}
