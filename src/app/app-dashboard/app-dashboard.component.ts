import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { map, delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

import { Inject, HostListener } from "@angular/core";
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./../window.service";
import { Renderer2, ElementRef, ViewChild } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { UserDataType } from '@app/classes/models';
import { UserService } from '@app/user.service';
import { AuthService } from '@app/auth.service';

import {  } from '@fortawesome/free-regular-svg-icons';
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss']
})
export class AppDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public userService: UserService,
              public authService: AuthService,) { }

  private users_sub :Subscription;
  isLoading :boolean = true;
  displayedColumns: string[] = ['name', 'email', 'phone', 'view', 'deactivate', 'delete'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  userslist:any[];

  ngOnInit() {
    this.userService.is_navbar = true;
  }

  ngAfterViewInit() {
    this.users_sub = this.userService.users.pipe(delay(0),).subscribe(users => {
      this.isLoading = true;
      this.userslist = users;
      this.dataSource = new MatTableDataSource(this.userslist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.users_sub) {
      this.users_sub.unsubscribe();
    }
  }

  activate_user(phone:string){
    if(this.isLoading == false){
      this.isLoading = true;
      this.authService.activate_user(phone).subscribe(
          data =>
          {
            if(data.response == "does_not_exist"){
              this.isLoading = false;
              this.snackBar.open("User does not exist.","",{duration: 2000,});
            }
            else if(data.response == "success"){
              this.isLoading = false;
              this.snackBar.open("Account Activated.","",{duration: 2000,});
            }
          });
    }
  }

  deactivate_user(phone:string){
    if(this.isLoading == false){
      this.isLoading = true;
      this.authService.deactivate_user(phone).subscribe(
          data =>
          {
            if(data.response == "does_not_exist"){
              this.isLoading = false;
              this.snackBar.open("User does not exist.","",{duration: 2000,});
            }
            else if(data.response == "success"){
              this.isLoading = false;
              this.snackBar.open("Account Deactivated.","",{duration: 2000,});
            }
          });
    }
  }

  openDeleteUserDialog(o): void {
     const dialogRef = this.dialog.open(DeleteUserDialog, {
       position: {top:'100px'},
       width: '480px',
       data: o
     });
     dialogRef.afterClosed().subscribe(result => {
     });
   }

}

@Component({
  selector: 'delete-user-dialog',
  templateUrl: 'delete-user-dialog.html',
})
export class DeleteUserDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data,
    private authService: AuthService,
    public snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete_user(phone:string){
    this.authService.delete_user(phone)
    .subscribe(data =>
        {
          if(data.response == "does_not_exist"){
            this.snackBar.open("User does not exist.","",{duration: 2000,});
          }
          else if(data.response == "not_permitted"){
            this.snackBar.open("Loggedin account deletion is not permitted.","",{duration: 2000,});
          }
          else if(data.response == "success"){
            this.snackBar.open("Account Deleted.","",{duration: 2000,});
          }
          this.dialogRef.close();
        }
      );
  }

}
