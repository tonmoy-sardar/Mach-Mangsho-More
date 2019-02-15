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
    console.log(data);
    return this.http.post(environment.apiEndpoint + 'userprofileupdate/' + id, data)
  }

  updateUserImage(id, option): Observable<any> {
    // console.log(body);
    console.log(option)
    console.log(environment.apiEndpoint + 'userprofileimageupdate/' + id);
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/' + id, option)
  }

  // updatemyProfile(id,profileImage,data): Observable<any> {
  //  // return this.http.post(environment.apiEndpoint + 'userUpdate/'+id, data)
  //  const formData: FormData = new FormData();
  //  if (data) {
  //    for (let key in data) {
  //        formData.append(key, data[key])
  //    }
  //    if(profileImage) { 
  //      formData.append('profile_image', profileImage, profileImage.name);
  //    }

  //    console.log(formData);
  //  }
  //  return this.http.post(environment.apiEndpoint + 'userUpdate/'+id, formData)
  // }

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
    return this.http.post(environment.apiEndpoint + 'addcustomeraddress/',data)
  }

}
