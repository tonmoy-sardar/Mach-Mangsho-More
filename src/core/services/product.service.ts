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
  getProductList(id,user_id,params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productslistbycatid/'+id+'/'+user_id+'/?'+params)
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
    if(user_id>0)
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearch/' + user_id + '/?search_key='+searchText)
    }
    else
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearch/?search_key='+searchText)
    }
   
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

  getAllRecipeList(params): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'recipelist/recipe/?'+params)
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

  myOrderList(id,params): Observable<any> {
    console.log(environment.apiEndpoint + 'orderlistbycustid/'+id+'/?'+params);
    return this.http.get(environment.apiEndpoint + 'orderlistbycustid/'+id+'/?'+params)
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
    if(id>0)
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbycatid/' + id + '/?search_key='+keywords)
    }
    else
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbycatid/?search_key='+keywords)
    }
   
  }
  myWishlistSearch(id,keywords): Observable<any> {
    if(id>0)
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbywhishlist/' + id + '/?search_key='+keywords)
    }
    else
    {
      return this.http.get(environment.apiEndpoint + 'productslistsearchbywhishlist/?search_key='+keywords)
    }
  }

  getRepeatOrder(ids): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'repeatorder/?product_id='+ids)
  }

  getSpendingPattern(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'productspendcatwisebyuserid/'+id+'/')
  }
}
