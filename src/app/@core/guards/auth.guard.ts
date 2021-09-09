import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private readonly authService: AuthService,
                private readonly router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (route.data?.authNeeded && !this.authService.isLoggedIn()) {
            this.router.navigate(['signin']);
            return false;
        } else if (!route.data?.authNeeded && this.authService.isLoggedIn()) {
            this.router.navigate(['dashboard']);
            return false;
        }

        return true;
    }
}
