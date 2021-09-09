import { Component } from '@angular/core';
import { AuthService } from '../@core/services/auth.service';
import { DarkThemeService } from '../@core/services/dark-theme.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    public darkTheme: boolean = this.darkThemeService.isDarkTheme$.getValue();

    constructor(public authService: AuthService,
                private readonly darkThemeService: DarkThemeService) {
    }

    public logout(): void {
        this.authService.logout();
    }

    public onThemeChange(): void {
        this.darkThemeService.setDarkTheme(this.darkTheme);
    }
}
