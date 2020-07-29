import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as fromActions from '../actions/product.actions'
import { map, switchMapTo, catchError, tap, switchMap, pluck, withLatestFrom, filter, take, takeUntil, mergeMap } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';
import { getProductLoadingStatus } from '../selectors/product.selectors';
import { LoadingStatus } from 'src/app/models/loadable';
import { EMPTY } from 'rxjs';

@Injectable()
export class ProductEffects {
  createProduct$ = createEffect(
		() =>
			this._actions$.pipe(
        ofType(fromActions.createProduct),
        pluck('product'),
        withLatestFrom(this._store.pipe(select(getProductLoadingStatus))),
        filter(([, loadingStatus]) => loadingStatus === LoadingStatus.Loaded),
        switchMap(([product,]) => this.productService.createProduct(product)),
        map(product => fromActions.productCreated({product})),
        // error handling is not necessary in current test task
        catchError(error => {
          console.log(error);
          return EMPTY //fromActions.producCreateError
        })
			),
		{ useEffectsErrorHandler: false }
  );

	loadProducts$ = createEffect(
		() =>
			this._actions$.pipe(
        ofType(fromActions.loadProducts),
        switchMapTo(this.productService.getProducts()),
        map(products => fromActions.productsLoaded({products})),
        catchError(() => fromActions.productsLoadError)
			),
    { useEffectsErrorHandler: false }
  );

	updateProduct$ = createEffect(
		() =>
			this._actions$.pipe(
        ofType(fromActions.updateProduct),
        switchMap(({id, product}) => this.productService.updateProduct(id, product)),
        map(product => fromActions.productUpdated({product})),
        // error handling is not necessary in current test task
        catchError(error => {
          console.log(error);
          return EMPTY //fromActions.productUpdateError
        })
			),
		{ useEffectsErrorHandler: false }
  );

  deleteProduct$ = createEffect(
		() =>
			this._actions$.pipe(
        ofType(fromActions.deleteProduct),
        pluck('id'),
        mergeMap(id =>
          this.productService.deleteProduct(id).pipe(
            map(id => fromActions.productDeleted({id})),
            catchError(error => {
              console.log(error);
              return [fromActions.productDeleteError({id})]
            })
          )
        )
			),
		{ useEffectsErrorHandler: false }
  );

  constructor(
    private readonly _actions$: Actions,
    private readonly productService: ProductService,
    private readonly _store: Store<State>,
	) {}
}
