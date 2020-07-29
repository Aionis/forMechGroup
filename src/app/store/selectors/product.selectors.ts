import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducers';

export const getProductState = createFeatureSelector<fromProduct.State>('product');

export const getProductLoadingStatus = createSelector(
	getProductState,
	fromProduct.getProductsStateStatus
);

export const getProducts = createSelector(
	getProductState,
	fromProduct.getProductsStateValue
);
