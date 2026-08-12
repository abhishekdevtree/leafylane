import { Injectable, effect } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom, filter, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

import { GlobalsService } from './globals.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService  {

  constructor(
    private globals: GlobalsService, 
    private auth: AuthService,
    private router: Router) {
  }

  checkLoggedIn(route: ActivatedRouteSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      
      const roles = route.data && route.data['roles'] ?  route.data['roles'] : [];
      
      if(!roles.length) { 
        return resolve(true);
      }
      
      if(!this.auth.isLoggedIn) {
        if(roles.includes('guest')) {
          return resolve(true);
        }
        this.router.navigate(['/']);
        return resolve(false);
      }

      if(roles.indexOf(this.auth.user.role) === -1) {
        if(this.auth.user.role == 'customer') {
          this.router.navigate(['/']);
        } else if(this.auth.user.role == 'admin') {
          this.router.navigate(['/']);
        }
        return resolve(false);
      }
      
      return resolve(true);  

    });
    
  }

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    
    while(!this.auth.validateTokenCallComplete()) {
      await new Promise(r => setTimeout(r, 50));
    }

    return this.checkLoggedIn(route);
    
  };
   

}