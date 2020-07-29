import { Product } from 'src/app/models/product';
import { createReducer, Action, on } from '@ngrx/store';
import * as fromActions from '../actions/product.actions'
import { Loadable, LoadingStatus } from 'src/app/models/loadable';

export interface State {
  products: Loadable<Array<Product>>
}

export const initialState: State = {
  products: {value: [], loadingStatus: LoadingStatus.NotLoaded}
}

const productReducer = createReducer(
  initialState,
  on(fromActions.productCreated, (state, {product}) => {
    const products = [...state.products.value, product];
    return {...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)}
  }),
  on(fromActions.loadProducts, state => ({...state, products: new Loadable<Product[]>([], LoadingStatus.Loading)})),
  on(fromActions.productsLoaded, (state, { products }) => ({...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)})),
  on(fromActions.productsLoadError, state => ({...state,  products: new Loadable<Product[]>([], LoadingStatus.Error)})),
  on(fromActions.deleteProduct, (state, { id }) => {
    const products = state.products.value.map(p => p.id === id ? {...p, loadngStatus: LoadingStatus.Loading} : p);
    return {...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)}
  }),
  on(fromActions.productDeleted, (state, { id }) => {
    const products = state.products.value.filter(p => p.id !== id);
    return {...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)}
  }),
  on(fromActions.productDeleteError, (state, { id }) => {
    const products = state.products.value.map(p => p.id === id ? {...p, loadngStatus: LoadingStatus.Error} : p);
    return {...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)}
  }),
  on(fromActions.productUpdated, (state, { product}) => {
    const products = state.products.value.map(p => p.id === product.id ? product : p);
    return {...state, products: new Loadable<Product[]>(products, LoadingStatus.Loaded)}
  })
)

export function reducer(state: State | undefined, action: Action) {
	return productReducer(state, action);
}

export const getProductsStateValue = (state: State) => state.products.value;
export const getProductsStateStatus = (state: State) => state.products.loadingStatus;
