import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './product/products.component';
import { ProductInterceptor } from './core/interceptors/product.interceptor';

import { LocalStorageModule } from 'angular-2-local-storage';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { ProductItemComponent } from './product/products-list/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductsListComponent,
    ProductItemComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalStorageModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
			maxAge: 25
		}),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ProductInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
