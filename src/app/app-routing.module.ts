import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products.component';

const routes: Routes = [
  {
    path: 'products',component: ProductsComponent
  },
  {path: '**', redirectTo: 'products'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
