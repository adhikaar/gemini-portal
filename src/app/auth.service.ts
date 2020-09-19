import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Observer, of , empty } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { UserDataType } from '@app/classes/models';
import { UserService } from '@app/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userService: UserService,) {}

  signup(signupmodel:any): Observable<any> {
    let userData: UserDataType = {
      title: signupmodel.signup_title,
      name: signupmodel.signup_name,
      email: signupmodel.signup_email,
      phone: signupmodel.signup_phone,
      dob: signupmodel.signup_dob,
      occupation: signupmodel.signup_occupation,
      password: signupmodel.signup_password,
      is_active: true,
    };
    if(this.userService.email_exists(userData.email)){
      return of({response: "email_exists"});
    }
    if(this.userService.phone_exists(userData.phone)){
      return of({response: "phone_exists"});
    }
    this.userService.loggedin_user_phone = userData.phone;
    this.userService.add_user(userData);
    this.userService.is_loggedin = true;
    return of({response: "success"});
  }

  email_login(loginmodel:any): Observable<any> {
    return of({response: this.userService.email_login(loginmodel.login_phoneemail, loginmodel.login_password)});
  }

  phone_login(loginmodel:any): Observable<any> {
    return of({response: this.userService.phone_login(loginmodel.login_phoneemail, loginmodel.login_password)});
  }

  add_user(new_userData:UserDataType): Observable<any> {
    return of({response: this.userService.add_user(new_userData)});
  }

  update_user(phone:string, new_userData:UserDataType): Observable<any> {
    return of({response: this.userService.update_user(phone, new_userData)});
  }

  activate_user(phone:string): Observable<any> {
    return of({response: this.userService.activate_user(phone)});
  }

  deactivate_user(phone:string): Observable<any> {
    return of({response: this.userService.deactivate_user(phone)});
  }

  delete_user(phone:string): Observable<any> {
    return of({response: this.userService.delete_user(phone)});
  }

  get_user_by_phone(phone:string){
    return of(this.userService.get_user_by_phone(phone));
  }


}
