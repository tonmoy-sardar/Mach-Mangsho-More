import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../global';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
  getCategoryList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productcategorylist/')
  }
  getProductList(id,user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistbycatid/'+id+'/'+user_id)
  }
  getTodayspecialList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'todayspecial/'+user_id)
  }
  getAlacartList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'alacart/'+user_id)
  }
  getCombooffertList(user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistbycombo/'+user_id)
  }
 
  getSearchList(searchText,user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistsearch/' + searchText + '/'+user_id)
  }
  getProductDetails(id,user_id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productdetails/'+id+'/'+user_id)
  }
  getFoodValue(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productfoodvalue/'+id)
  }

  getRecipeList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipedetailsbyproduct/'+id)
  }

  getAllRecipeList(): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipelist/recipe/')
  }

  addWishlist(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'whishlist/',data)
  }

  myWishlist(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'whishlistbyuserid/'+id)
  }

  getrecipeDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipedetails/'+id)
  }

  myOrderList(id): Observable<any> {

    return this.http.get(environment.apiEndpoint + 'orderlistbycustid/'+id)
  }

  getriviaDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'producttrivialistbyproductid/'+id)
  }

  addRating(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addRating/',data)
  }
  addReview(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addcomment/',data)
  }

  getorderDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'orderdetailsbyid/'+id)
  }

  getFoodList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productfoodvalue/'+id)
  }
  productSearch(id,keywords): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistsearchbycatid/' + id + '/'+keywords)
  }
  myWishlistSearch(id,keywords): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistsearchbywhishlist/' + id + '/'+keywords)
  }

}
