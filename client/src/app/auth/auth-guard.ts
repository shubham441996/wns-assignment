import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private route:Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let data=localStorage.getItem('userObj');
        if(data){
            return true;
        }
        this.route.navigate(['login']);
        return false;
    }
}