import { ActionReducerMap } from '@ngrx/store';
import * as fromProduct from './product.reducers';

export const appKey = 'app';

export interface State {
	product: fromProduct.State;
}

export const reducers: ActionReducerMap<State> = {
	product: fromProduct.reducer
};
