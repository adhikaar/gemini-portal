import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./../window.service";
import { Renderer2, ElementRef, ViewChild } from '@angular/core';

import { UserDataType } from '@app/classes/models';
import { UserService } from '@app/user.service';
import { AuthService } from '@app/auth.service';

import {  } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public userService: UserService,
              public authService: AuthService,) { }

  edit_mode:boolean = false;
  model:UserDataType = {title:"", name:"", email:"", phone:"", dob:"", occupation:"", password:"", is_active:false};
  isLoading:boolean = false;

  ngOnInit() {
    this.userService.is_navbar = true;
    this.route.paramMap
    .pipe(switchMap((params: ParamMap) =>{
      if(params != null && params.get('phone') != null)
        return this.authService.get_user_by_phone(String(params.get('phone')))
      else
        return this.authService.get_user_by_phone(this.userService.loggedin_user_phone)
    }))
    .subscribe(data=>{
      if(data.response=="success") {
        this.model = data.userData;
      }
      else{
        this.snackBar.open("Could not get account data. Please try again later.","",{duration: 3000,});
      }
    });
  }

  update_user(){
    if(this.isLoading == false){
      this.isLoading = true;
      if(this.model.title==null || !(this.model.title=="Mr." || this.model.title=="Ms." || this.model.title=="Mrs." || this.model.title=="M/S" || this.model.title=="")){
        this.snackBar.open("Invalid Title selected.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.model.name!=null && this.model.name.length<50 && this.model.name.length>3){
        this.model.name=this.model.name.trim()
      }
      else{
        this.snackBar.open("Name must be between 3-50 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.model.dob==null || this.model.dob.length>50){
        this.snackBar.open("Date of Birth Invalid.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.model.occupation==null || this.model.occupation.length>200){
        this.snackBar.open("Occupation must be less than 200 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      if(this.model.password==null || this.model.password.length<4 || this.model.password.length>20){
        this.snackBar.open("Password must be between 4-20 characters long.","",{duration: 2000,});
        this.isLoading = false;
        return;
      }
      this.authService.update_user(this.model.phone, this.model)
      .subscribe(data =>{
          if(data.response=="success"){
            this.isLoading = false;
            this.snackBar.open("Changes saved successfully.","",{duration: 2000,});
            this.router.navigate(['/dashboard']);
          }
        });
    }
  }


}
