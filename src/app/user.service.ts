import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, empty } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { UserDataType } from '@app/classes/models';


let SAMPLE_USERS = [
  {
    title: "Mr.",
    name: "Abhishek Kumar",
    email: "abhishek@sample.com",
    phone: "9700234353",
    dob: "1997-08-12T20:17:46.384Z",
    occupation: "Business",
    password: "abc123",
    is_active: true,
  },
  {
    title: "Mrs.",
    name: "Sanjana Singh",
    email: "sanjana@sample.com",
    phone: "9700934353",
    dob: "1994-02-12T20:17:46.384Z",
    occupation: "teacher",
    password: "abc123",
    is_active: true,
  },
  {
    title: "Mr.",
    name: "Raj Pratap",
    email: "raj@sample.com",
    phone: "9400239353",
    dob: "1999-08-19T20:17:46.384Z",
    occupation: "Engineer",
    password: "abc123",
    is_active: true,
  },
  {
    title: "Ms.",
    name: "Kalpana",
    email: "kalpana@sample.com",
    phone: "9700904351",
    dob: "1990-02-02T20:17:46.384Z",
    occupation: "Musician",
    password: "abc123",
    is_active: true,
  },
]

@Injectable({
  providedIn: 'root'
})
export class UserService {

  is_navbar:boolean=true;
  is_loggedin:boolean=false;
  loggedin_user_phone: string;

  constructor(){
    this.is_loggedin=false;
    this.is_navbar=true;
    this.users_array = SAMPLE_USERS;
    this.update_users(this.users_array);
  }

  private users_array: UserDataType[] = [];
  private _users = new BehaviorSubject<UserDataType[]>([]);
  get users() {
    return this._users.asObservable();
  }
  private update_users(new_users:UserDataType[]){
    console.log("UPDATED USERS:");
    console.log(new_users);
    this._users.next(new_users);
  }

  email_exists(email:string){
    let index = this.users_array.findIndex(user => user.email === email);
    if(index<0){
      return false;
    }
    return true;
  }

  phone_exists(phone:string){
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return false;
    }
    return true;
  }

  email_login(email:string, password:string){
    let index = this.users_array.findIndex(user => user.email === email && user.password === password);
    if(index<0){
      return "does_not_exist";
    }
    if(this.users_array[index].is_active==false){
      return "deactivated";
    }
    this.loggedin_user_phone = this.users_array[index].phone;
    this.is_loggedin = true;
    return "success";
  }

  phone_login(phone:string, password:string){
    let index = this.users_array.findIndex(user => user.phone === phone && user.password === password);
    if(index<0){
      return "does_not_exist";
    }
    if(this.users_array[index].is_active==false){
      return "deactivated";
    }
    this.loggedin_user_phone = this.users_array[index].phone;
    this.is_loggedin = true;
    return "success";
  }

  add_user(new_userData:UserDataType){
    let index = this.users_array.findIndex(user => user.email === new_userData.email);
    if(index>-1){
      return "email_exists";
    }
    index = this.users_array.findIndex(user => user.phone === new_userData.phone);
    if(index>-1){
      return "phone_exists";
    }
    this.users_array.push(new_userData);
    this.update_users(this.users_array);
    return "success";
  }

  update_user(phone:string, new_userData:UserDataType){
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return "does_not_exist";
    }
    this.users_array[index].title = new_userData.title;
    this.users_array[index].name = new_userData.name;
    this.users_array[index].dob = new_userData.dob;
    this.users_array[index].occupation = new_userData.occupation;
    this.users_array[index].password = new_userData.password;
    this.update_users(this.users_array);
    return "success";
  }

  activate_user(phone:string){
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return "does_not_exist";
    }
    this.users_array[index].is_active=true;
    this.update_users(this.users_array);
    return "success";
  }

  deactivate_user(phone:string){
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return "does_not_exist";
    }
    this.users_array[index].is_active=false;
    this.update_users(this.users_array);
    return "success";
  }

  delete_user(phone:string){
    if(this.loggedin_user_phone===phone){
      return "not_permitted";
    }
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return "does_not_exist";
    }
    this.users_array.splice(index, 1);
    this.update_users(this.users_array);
    return "success";
  }

  get_user_by_phone(phone:string){
    let index = this.users_array.findIndex(user => user.phone === phone);
    if(index<0){
      return {response: "does_not_exist"};
    }
    return {response: "success", userData: this.users_array[index]};
    }

}
