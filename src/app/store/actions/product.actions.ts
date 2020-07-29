import { createAction, props } from "@ngrx/store";
import { Product } from 'src/app/models/product';

export const createProduct = createAction('[Product] Create product', props<{ product: Product }>());
export const productCreated = createAction('[Product] Product created', props<{ product: Product }>());
export const producCreateError = createAction('[Product] Product not created');

export const loadProducts = createAction('[Product] Load products');
export const productsLoaded = createAction('[Product] Products loaded', props<{ products: Product[] }>());
export const productsLoadError = createAction('[Product] Products not loaded');

export const updateProduct = createAction('[Product] Update product', props<{ id: number, product: Partial<Product> }>());
export const productUpdated = createAction('[Product] Product updated', props<{ product: Product }>());
export const productUpdateError = createAction('[Product] Product not updated');

export const deleteProduct = createAction('[Product] delete product', props<{ id: number }>());
export const productDeleted = createAction('[Product] Product deleted', props<{ id: number }>());
export const productDeleteError = createAction('[Product] Product not deleted', props<{ id: number }>());


