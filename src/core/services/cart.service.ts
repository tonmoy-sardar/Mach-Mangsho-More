import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../global';

@Injectable()
export class CartService {
  @Output() getCartNumberStatus: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  cartNumberStatus(data): Observable<any> {
    if (data = true) {
      this.getCartNumberStatus.emit(true);
      return
    }
  }
  
}
