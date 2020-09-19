import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { UserDataType } from '@app/classes/models';
import { UserService } from '@app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService,
    public snackBar: MatSnackBar) { }

  toAuth(){
    this.router.navigate(['auth']);
  }

  ngOnInit() {
  }

  logout(){
    this.userService.is_loggedin= false;
    this.userService.loggedin_user_phone = null;
    this.snackBar.open("Logged Out Successfully.","",{duration: 2000,});
    this.router.navigate(['']);
 }

}
