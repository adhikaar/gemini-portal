import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable , BehaviorSubject , Subscription , of , empty } from 'rxjs';
import { take, map, tap, delay, switchMap, skipWhile } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AppReadmeComponent } from '@app/app-readme/app-readme.component';

import { UserDataType } from '@app/classes/models';
import { EmailOrPhoneValidator } from '@app/directives/emailorphone.directive';
import { UserService } from '@app/user.service';
import { AuthService } from '@app/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.scss']
})
export class AppAuthComponent implements OnInit, OnDestroy {

  isLoading: boolean = false;
  signup_enabled:boolean=false;
  login_auth_view: boolean = true;
  redirected: boolean = false;
  login_stage: string = "initial";
  loginmodel: any = {};
  signupmodel: any = {};

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,) {}

  ngOnInit() {
    this.userService.is_navbar = false;
    this.isLoading = false;
    this.loginmodel = {};
    this.signupmodel = {signup_title:"Mr."};
    this.login_auth_view = true;
    this.redirected = false;
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if(returnUrl!=null){
      this.redirected = true;
    }
  }

  ngOnDestroy() {}

  onSwitchAuthView() {
    this.isLoading = false;
    this.login_auth_view = !this.login_auth_view;
  }

  login_keyDownFunction(event) {
    if(event.keyCode == 13 && this.isLoading == false) {
      this.login();
    }
  }
  signup_keyDownFunction(event) {
    if(event.keyCode == 13 && this.isLoading == false) {
      this.signup();
    }
  }

  login() {
    if(this.isLoading==false){
      this.isLoading = true;
      let login_observable;
      if (this.loginmodel.login_phoneemail){
        this.loginmodel.login_phoneemail = this.loginmodel.login_phoneemail.replace(/\s/g,"");
        if (this.loginmodel.login_phoneemail.indexOf("@") != -1) {
          let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          if (this.loginmodel.login_phoneemail.match(email_regex)!= null) {
            login_observable = this.authService.email_login(this.loginmodel)
          }
          else {
            this.loginmodel.login_password = "";
            this.login_stage = "error";
            this.isLoading = false;
            return;
          }
        }
        else {
          this.loginmodel.login_phoneemail = this.loginmodel.login_phoneemail.slice(-10);
          let phone_regex = /(6|7|8|9)\d{9}/;
          if (this.loginmodel.login_phoneemail.match(phone_regex)!= null) {
            login_observable = this.authService.phone_login(this.loginmodel)
          }
          else {
            this.loginmodel.login_password = "";
            this.login_stage = "error";
            this.isLoading = false;
            return;
          }
        }
        login_observable.subscribe(
          data =>
          {
            if(data.response=="success")
            {
              this.loginmodel.login_username = "";
              this.loginmodel.login_password = "";
              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              this.isLoading = false;
              this.router.navigate([returnUrl || '/dashboard']);
            }
            else if(data.response=="deactivated")
            {
              this.login_stage = "deactivated";
              this.loginmodel.login_username = "";
              this.loginmodel.login_password = "";
              this.isLoading = false;
            }
            else
            {
              this.login_stage = "error";
              this.loginmodel.login_username = "";
              this.loginmodel.login_password = "";
              this.isLoading = false;
            }
        });
      }
    }
  }


  signup(){
    if(this.isLoading==false){
      this.isLoading = true;
      if(this.signupmodel.signup_title==null || !(this.signupmodel.signup_title=="Mr." || this.signupmodel.signup_title=="Ms." || this.signupmodel.signup_title=="Mrs." || this.signupmodel.signup_title=="M/S" || this.signupmodel.signup_title=="")){
        this.snackBar.open("Invalid Title selected.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_name!=null && this.signupmodel.signup_name.length<50 && this.signupmodel.signup_name.length>3){
        this.signupmodel.signup_name=this.signupmodel.signup_name.trim()
      }
      else{
        this.snackBar.open("Name must be between 3-50 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_email!=null){
        this.signupmodel.signup_email=this.signupmodel.signup_email.trim()
        this.signupmodel.signup_email = this.signupmodel.signup_email.replace(/\s/g,"");
        let email_regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (this.signupmodel.signup_email.indexOf("@") == -1 || this.signupmodel.signup_email.match(email_regex) == null) {
          this.snackBar.open("Enter a valid Email.","",{duration: 2000,});
          this.isLoading = false;
          return;
        }
      } else{
        this.snackBar.open("Email required.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_phone!=null){
        this.signupmodel.signup_phone=this.signupmodel.signup_phone.trim()
        this.signupmodel.signup_phone = this.signupmodel.signup_phone.slice(-10);
        let phone_regex = /(6|7|8|9)\d{9}/;
        if (this.signupmodel.signup_phone.match(phone_regex) == null) {
          this.snackBar.open("Enter a valid 10-digit Phone Number without leading +91/0.","",{duration: 2000,});
          this.isLoading = false;
          return;
        }
      } else{
        this.snackBar.open("Phone Number is required.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_dob==null || this.signupmodel.signup_dob.length>50){
        this.snackBar.open("Date of Birth Invalid.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_occupation==null || this.signupmodel.signup_occupation.length>200){
        this.snackBar.open("Occupation must be less than 200 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.signupmodel.signup_password==null || this.signupmodel.signup_password.length<4 || this.signupmodel.signup_password.length>20){
        this.snackBar.open("Password must be between 4-20 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      console.log(this.signupmodel.signup_dob);
      this.authService.signup(this.signupmodel).subscribe(
          data =>
          {
            if(data.response == "email_exists"){
              this.isLoading = false;
              this.snackBar.open("User with this Email already exists.","",{duration: 2000,});
            }
            else if(data.response == "phone_exists"){
              this.isLoading = false;
              this.snackBar.open("User with this Phone Number already exists.","",{duration: 2000,});
            }
            else if(data.response == "success"){
              this.snackBar.open("Your account has been created successfully.","",{duration: 2000,});
              this.signupmodel.signup_title = "";
              this.signupmodel.signup_name = "";
              this.signupmodel.signup_email = "";
              this.signupmodel.signup_phone = "";
              this.signupmodel.signup_dob = null;
              this.signupmodel.signup_password = "";
              let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
              this.router.navigate([returnUrl || '/dashboard']);
              this.isLoading = false;
            }
            else {
              this.snackBar.open("Invalid Request. Please try again.","",{duration: 2000,});
              this.signupmodel.signup_password = "";
              this.isLoading = false;
            }
      });
    }
  }


}
