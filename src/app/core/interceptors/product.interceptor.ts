import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Product } from 'src/app/models/product';

@Injectable()
export class ProductInterceptor implements HttpInterceptor {

  constructor(private readonly _localStorageService: LocalStorageService) {}

  addValueToDb(product: Product) {
    const products = this._localStorageService.get('dbMock') as Product[];
    this._localStorageService.set('dbMock', products ? [...products, product] : [ product ])
  }
  isElementInDb(id: number): boolean {
    const products = this._localStorageService.get('dbMock') as Product[];
    return products.some(p => p.id === id)
  }
  removeValueInDb(id: number) {
    let products = this._localStorageService.get('dbMock') as Product[];
    products = products.filter(p => p.id !== id);
    this._localStorageService.set('dbMock', products);
  }
  updateValueInDb(product: Product) {
    let products = this._localStorageService.get('dbMock') as Product[];
    products = products.map(p => p.id === product.id ? product : p)
    this._localStorageService.set('dbMock', products);
  }
  calculateId(array: Array<string>) {
    if (array[array.length - 1] !== 'products') {
      return +array[array.length - 1];
    }
    return null;
  }
  delayInt(): number {
    return Math.random() * 500 + 200
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    // i did not add header check, because this task implies only 'product' call

    if (req.method === 'POST') {
      const product = {...req.body as Product, id: Date.now()};
      this.addValueToDb(product);
      return of(new HttpResponse({ body: product })).pipe(delay(this.delayInt()))
    }
    if (req.method === 'GET') {
      const products = this._localStorageService.get('dbMock') as Product[];
      // I do it here instead Product service, because want to use localStorage as backend DB mock for this task
      async function getDataFromJson(): Promise<HttpResponse<Product[]>> {
        let res = await fetch("http://localhost:4200/assets/api/basicData.json");
        let products = await res.json() as Product[];
        this._localStorageService.set('dbMock', products);
        return new HttpResponse({body: products})
      }
      return products.length ?
        of(new HttpResponse({ body: products})).pipe(delay(this.delayInt())) :
        from(getDataFromJson.call(this) as Promise<HttpResponse<Product[]>>);
    }
    if (req.method === 'DELETE') {
      const id = this.calculateId(req.url.split('/'));
      if (this.isElementInDb(id)) {
        this.removeValueInDb(id);
        return of(new HttpResponse({ body: id})).pipe(
          delay(this.delayInt())
        )
      } else {
        throw new HttpErrorResponse({
          error: 'NotExistError',
          status: 500,
          statusText: 'Warning'
        })
      }
    }
    if (req.method === 'PUT') {
      const id = this.calculateId(req.url.split('/'));
      const product = {...req.body as Product, id};
      if(this.isElementInDb(id)) {
        this.updateValueInDb(product);
        return of(new HttpResponse({ body: product})).pipe(
          delay(this.delayInt())
        )
      } else {
        throw new HttpErrorResponse({
          error: 'NotExistError',
          status: 500,
          statusText: 'Warning'
        })
      }
    }
    return next.handle(req);
  }

}
