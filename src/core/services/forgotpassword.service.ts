import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../global';

@Injectable()
export class ForgotpasswordService {

  constructor(
    private http: HttpClient
  ) {
  }
  
  userForgotPassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordotp/', data)
  }

  updatePassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordupdate/', data)
  }

  


}
