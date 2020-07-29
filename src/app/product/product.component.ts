import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store, select} from '@ngrx/store';
import { State } from '../store/reducers/product.reducers';
import * as fromActions from '../store/actions/product.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, map, tap } from 'rxjs/operators';
import { Product } from '../models/product';
import { getProducts, getProductLoadingStatus } from '../store/selectors/product.selectors';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit{

  isCreateMode: Observable<boolean>;
  products = this._store.pipe(select(getProducts));
  loadingStatus = this._store.pipe(select(getProductLoadingStatus));

  constructor(private readonly _store: Store<State>, private readonly route: ActivatedRoute, private readonly router: Router) {
    this.isCreateMode = this.route.queryParams.pipe(pluck('create'), map(d => !!d));
  }

  onCreate() {
    this.router.navigate(['/products'], { queryParams: {create: true}});
  }
  onRead() {
    this._store.dispatch(fromActions.loadProducts());
  }
  onProductSubmit(product: Product) {
    this._store.dispatch(fromActions.createProduct({product}));
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    this._store.dispatch(fromActions.loadProducts());
  }
}
