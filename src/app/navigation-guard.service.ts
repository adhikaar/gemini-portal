import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router , CanActivate, RouterStateSnapshot } from "@angular/router";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NavigationGuard implements CanActivate {

  back_url = '';

  constructor(private authService : AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    if(this.router.navigated){
      return true;}
    this.router.navigate([this.back_url]);
    return false;
  }
}
