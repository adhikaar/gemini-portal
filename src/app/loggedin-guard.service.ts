import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router , CanActivate, RouterStateSnapshot } from "@angular/router";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(public userService : UserService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot){
    if(this.userService.is_loggedin == true){
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
   }
}
