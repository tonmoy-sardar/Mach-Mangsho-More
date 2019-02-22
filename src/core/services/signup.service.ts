import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../global';

@Injectable()
export class SignupService {

  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) {
   }

  loginStatus(data): Observable<any> {
    if (data = true) {
      this.getLoggedInStatus.emit(true);
      return
    }
  }

  userSignup(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userregister/', data)
  }
}
