import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable , BehaviorSubject , Subscription , of , empty } from 'rxjs';
import { map , switchMap , take } from 'rxjs/operators';
import { tap, skipWhile } from 'rxjs/operators';

import { UserService } from '@app/user.service';

@Component({
  selector: 'app-readme',
  templateUrl: './app-readme.component.html',
  styleUrls: ['./app-readme.component.scss']
})
export class AppReadmeComponent implements OnInit {

  constructor(
    private router: Router,
    public userService: UserService) { }

  ngOnInit() {
    this.userService.is_navbar = true;
  }

}
