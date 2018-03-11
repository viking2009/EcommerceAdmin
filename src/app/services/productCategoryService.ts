import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ProductCategoryForCreation} from '../models/productCategoryForCreation';
import {Observable} from 'rxjs/Observable';
import {ProductCategoryForDisplay} from '../models/productCategoryForDisplay';
import {GlobalService} from './globalService';
import {ProductCategoryTreeForDisplay} from '../models/productCategoryTreeForDisplay';
import {AuthService} from './authService';

@Injectable()
export class ProductCategoryService {
  private url: string;
  private token: string;

  constructor(private http: HttpClient,
              private global: GlobalService,
              private authService: AuthService) {
    this.url = global.servicePath + 'productscategory/';
    this.token = this.authService.getToken();
  }

  addCategory(category: ProductCategoryForCreation): Observable<HttpResponse<ProductCategoryForDisplay>> {
    return this.http.post<ProductCategoryForDisplay>(this.url, category, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getCategoriesTree(): Observable<HttpResponse<ProductCategoryTreeForDisplay[]>> {
    const treeUrl = this.url + 'CategoriesTree';
    return this.http.get<ProductCategoryTreeForDisplay[]>(treeUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  deleteCategory(categoryId): Observable<HttpResponse<any>> {
    const deleteUrl = this.url + categoryId;
    return this.http.delete(deleteUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }

  getParentCategories(): Observable<HttpResponse<ProductCategoryForDisplay[]>> {
    const categoriesUrl = this.url + 'parent';
    return this.http.get<ProductCategoryForDisplay[]>(categoriesUrl, {
      headers: {
        'Authorization': 'Bearer ' + this.token,
        'Content-Type': 'application/json'
      }, observe: 'response'
    });
  }
}