import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../global';

@Injectable()
export class ProfileService {
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) { }

  getProfile(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'userprofile/' + id + '/')
  }
  updateUserProfile(id, data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userprofileupdate/' + id, data)
  }

  updateUserImage(id, option): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/' + id, option)
  }

  updateProfileStatus(data): Observable<any> {
    if (data = true) {
      this.getProfileUpdateStatus.emit(true);
      return
    }
  }

  addressList(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/' + id + '/')
  }

  updateUserImageNew(id, option): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/' + id, option)
  }
  submitAddress(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'addcustomeraddress/', data)
  }

  getPinCode(pincode): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'deliverslotbypincode/' + pincode + '/')
  }

  deleteMyAddress(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'deletecustomeraddress/' +id)
  }

  myAddressDetails(id): Observable<any> {
    return this.http.get(environment.apiEndpoint + 'listcustomeraddressbyid/' +id)
  }
}
